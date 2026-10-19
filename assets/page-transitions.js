(() => {
  "use strict";
  const root = document.documentElement;
  const siteRoot = new URL("../", document.currentScript.src);
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  const initializers = new Map();
  const documents = new Map();
  const assets = new Map();
  const positions = new Map();
  const drafts = new Map();
  let currentURL = new URL(location.href);
  let currentPage = pageOf(currentURL);
  let shell, lifecycle;
  let cleanups = [];
  let navigating = false;
  let entry = history.state?.portfolioEntry || 1;
  let nextEntry = entry;

  function pageOf(url) {
    if (url.origin !== siteRoot.origin) return null;
    const path = url.pathname.replace(/\/index\.html$/, "/");
    if (path === siteRoot.pathname) return "home";
    if (path === `${siteRoot.pathname}work-with-me/`) return "work";
    return null;
  }
  function destinationFor(target) {
    const link = target instanceof Element ? target.closest("a[href]") : null;
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return null;
    const url = new URL(link.href, location.href);
    const page = pageOf(url);
    return page && page !== currentPage ? { url, page } : null;
  }
  function initialize(page) {
    lifecycle = new AbortController();
    cleanups = [];
    initializers.get(page)({ signal: lifecycle.signal, onCleanup: (fn) => cleanups.push(fn) });
  }
  function rememberDraft() {
    drafts.set(currentPage, [...shell.querySelectorAll("input[id], textarea[id], select[id]")].map((field) => ({
      id: field.id, value: field.value, checked: field.checked,
    })));
    drafts.set(`${currentPage}-types`, [...shell.querySelectorAll("input[name='type']")].map((input) => input.checked));
  }
  function restoreDraft(page) {
    for (const saved of drafts.get(page) || []) {
      const field = document.getElementById(saved.id);
      if (field) { field.value = saved.value; field.checked = saved.checked; }
    }
    [...shell.querySelectorAll("input[name='type']")].forEach((input, index) => {
      input.checked = drafts.get(`${page}-types`)?.[index] || false;
    });
  }
  function loadAsset(link, enabled = false) {
    const href = link.href;
    if (assets.has(href)) return assets.get(href);
    const existing = [...document.querySelectorAll("link[rel='stylesheet']")].find((item) => item.href === href);
    if (existing) return Promise.resolve(existing);
    const promise = new Promise((resolve, reject) => {
      const node = document.createElement("link");
      node.rel = "stylesheet";
      node.href = href;
      if (link.hasAttribute("data-page-style")) node.dataset.pageStyle = "";
      node.media = enabled ? "all" : "not all";
      const timeout = setTimeout(() => reject(new Error("Stylesheet timeout")), 10000);
      node.onload = () => { clearTimeout(timeout); resolve(node); };
      node.onerror = () => { clearTimeout(timeout); reject(new Error("Stylesheet unavailable")); };
      document.head.append(node);
    });
    assets.set(href, promise);
    promise.catch(() => assets.delete(href));
    return promise;
  }
  function loadInitializer(page, doc, url) {
    if (initializers.has(page)) return Promise.resolve();
    const source = doc.querySelector("script[data-page-script]");
    if (!source) return Promise.reject(new Error("Missing page initializer"));
    const href = new URL(source.getAttribute("src"), url).href;
    if (assets.has(href)) return assets.get(href);
    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = href;
      const timeout = setTimeout(() => reject(new Error("Script timeout")), 10000);
      script.onload = () => {
        clearTimeout(timeout);
        if (initializers.has(page)) resolve();
        else reject(new Error("Page initializer unavailable"));
      };
      script.onerror = () => { clearTimeout(timeout); reject(new Error("Script unavailable")); };
      document.head.append(script);
    });
    assets.set(href, promise);
    promise.catch(() => assets.delete(href));
    return promise;
  }
  async function prepare(url, page) {
    const key = `${url.pathname}${url.search}`;
    if (!documents.has(key)) {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const request = fetch(url.href, { signal: controller.signal, credentials: "same-origin" })
        .then((response) => {
          if (!response.ok || !response.headers.get("content-type")?.includes("text/html")) throw new Error("Page unavailable");
          if (pageOf(new URL(response.url)) !== page) throw new Error("Unexpected redirect");
          return response.text();
        }).finally(() => clearTimeout(timeout));
      documents.set(key, request);
      request.catch(() => documents.delete(key));
    }
    const doc = new DOMParser().parseFromString(await documents.get(key), "text/html");
    const styles = [...doc.querySelectorAll("link[data-page-style], link[data-page-font]")];
    for (const link of styles) link.href = new URL(link.getAttribute("href"), url).href;
    const loaded = await Promise.all([
      Promise.all(styles.map((link) => loadAsset(link, link.hasAttribute("data-page-font")))),
      loadInitializer(page, doc, url),
    ]);
    for (const node of doc.body.querySelectorAll("[href], [src], [poster], [action]")) {
      for (const name of ["href", "src", "poster", "action"]) {
        if (!node.hasAttribute(name)) continue;
        const value = node.getAttribute(name);
        if (name === "href" && value.startsWith("#")) continue;
        node.setAttribute(name, new URL(value, url).href);
      }
    }
    doc.body.querySelectorAll("script").forEach((script) => script.remove());
    return { doc, styles: loaded[0].filter((link) => link.hasAttribute("data-page-style")) };
  }
  function scrollToDestination(url, position, behavior = "instant") {
    let id = "";
    try { id = decodeURIComponent(url.hash.slice(1)); } catch { /* Invalid fragments behave like an ordinary link. */ }
    const target = id && document.getElementById(id);
    if (target) target.scrollIntoView({ behavior, block: "start" });
    else window.scrollTo({ left: position?.[0] || 0, top: position?.[1] || 0, behavior });
  }
  function reset() {
    delete root.dataset.pageTransition;
    root.style.removeProperty("--transition-x");
    root.style.removeProperty("--transition-y");
    shell.inert = false;
    shell.removeAttribute("aria-busy");
    navigating = false;
    window.CosmicScene?.settle();
  }
  async function navigate(url, page, { pop = false, x = 50, y = 45, position } = {}) {
    if (navigating) { if (pop) location.replace(url.href); return; }
    navigating = true;
    positions.set(entry, [scrollX, scrollY]);
    rememberDraft();
    shell.inert = true;
    shell.setAttribute("aria-busy", "true");
    root.style.setProperty("--transition-x", `${x}%`);
    root.style.setProperty("--transition-y", `${y}%`);
    if (!motion.matches) root.dataset.pageTransition = "leaving";
    window.CosmicScene?.expand();
    try {
      const [{ doc, styles }] = await Promise.all([
        prepare(url, page), new Promise((resolve) => setTimeout(resolve, motion.matches ? 0 : 560)),
      ]);
      lifecycle?.abort();
      cleanups.forEach((cleanup) => cleanup());
      for (const link of document.querySelectorAll("link[data-page-style]")) link.media = styles.includes(link) ? "all" : "not all";
      root.className = "intro-seen";
      root.lang = doc.documentElement.lang || "en";
      document.body.className = doc.body.className;
      document.title = doc.title;
      const description = doc.querySelector("meta[name='description']");
      if (description) document.querySelector("meta[name='description']")?.setAttribute("content", description.content);
      if (!pop) {
        entry = ++nextEntry;
        history.pushState({ portfolioEntry: entry }, "", url.href);
      } else {
        entry = history.state?.portfolioEntry || ++nextEntry;
        history.replaceState({ ...history.state, portfolioEntry: entry }, "", url.href);
      }
      currentURL = new URL(url);
      currentPage = page;
      // The foreground changes; the video and its media source stay connected and playing.
      shell.replaceChildren(...doc.body.childNodes);
      restoreDraft(page);
      initialize(page);
      scrollToDestination(url, position);
      await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
      if (!motion.matches) root.dataset.pageTransition = "arriving";
      window.CosmicScene?.settle();
      shell.inert = false;
      await new Promise((resolve) => setTimeout(resolve, motion.matches ? 0 : 1000));
      reset();
      const heading = document.getElementById(url.hash.slice(1)) || document.querySelector("main h1");
      if (heading) {
        heading.setAttribute("tabindex", "-1");
        heading.focus({ preventScroll: true });
        heading.addEventListener("blur", () => heading.removeAttribute("tabindex"), { once: true });
      }
    } catch {
      reset();
      if (pop) location.replace(url.href); else location.assign(url.href);
    }
  }
  function prefetch(event) {
    if (navigator.connection?.saveData || navigating) return;
    const destination = destinationFor(event.target);
    if (destination && ["http:", "https:"].includes(destination.url.protocol)) prepare(destination.url, destination.page).catch(() => {});
  }
  window.PortfolioTransitions = {
    register(page, initializer) {
      initializers.set(page, initializer);
      if (page !== currentPage || lifecycle) return;
      // Keep head assets stable when pushState changes the document's base URL.
      for (const link of document.head.querySelectorAll("link[href]")) {
        link.href = new URL(link.getAttribute("href"), location.href).href;
      }
      const stage = window.CosmicScene?.mount();
      shell = document.createElement("div");
      shell.id = "page-shell";
      shell.append(...[...document.body.childNodes].filter((node) => node !== stage));
      document.body.append(shell);
      try {
        history.replaceState({ ...history.state, portfolioEntry: entry }, "");
        history.scrollRestoration = "manual";
      } catch { /* Direct file previews still initialize their controls. */ }
      initialize(page);
      window.CosmicScene?.sync();
    },
  };
  document.addEventListener("pointerover", prefetch, { passive: true });
  document.addEventListener("focusin", prefetch);
  document.addEventListener("click", (event) => {
    if (!shell || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
    if (anchor && new URL(anchor.href).pathname === location.pathname && anchor.hash) positions.set(entry, [scrollX, scrollY]);
    const destination = destinationFor(event.target);
    if (!destination || !["http:", "https:"].includes(destination.url.protocol)) return;
    event.preventDefault();
    navigate(destination.url, destination.page, {
      x: event.detail ? Math.max(0, Math.min(100, event.clientX / innerWidth * 100)) : 50,
      y: event.detail ? Math.max(0, Math.min(100, event.clientY / innerHeight * 100)) : 45,
    });
  });
  window.addEventListener("popstate", () => {
    if (!shell) return;
    positions.set(entry, [scrollX, scrollY]);
    const url = new URL(location.href);
    const page = pageOf(url);
    if (!page) { location.reload(); return; }
    const position = positions.get(history.state?.portfolioEntry);
    if (page === currentPage && url.pathname === currentURL.pathname) {
      entry = history.state?.portfolioEntry || ++nextEntry;
      history.replaceState({ ...history.state, portfolioEntry: entry }, "");
      currentURL = url;
      // Fragment navigation also fires popstate; keep its scroll animation intact.
      scrollToDestination(url, position, motion.matches ? "instant" : "smooth");
      return;
    }
    navigate(url, page, { pop: true, position });
  });
  window.addEventListener("hashchange", () => {
    if (!shell || navigating || pageOf(new URL(location.href)) !== currentPage) return;
    entry = history.state?.portfolioEntry || ++nextEntry;
    history.replaceState({ ...history.state, portfolioEntry: entry }, "");
    currentURL = new URL(location.href);
  });
})();
