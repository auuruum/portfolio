(() => {
  "use strict";

  const root = document.documentElement;
  const siteRoot = new URL("../", document.currentScript.src);
  const storageKey = "auuruum-page-transition";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const prefetched = new Set();
  let navigating = false;
  let navigationTimer;
  let resetTimer;

  function pageOf(url) {
    if (url.origin !== siteRoot.origin) return null;
    const path = url.pathname.replace(/\/index\.html$/, "/");
    if (path === siteRoot.pathname) return "home";
    if (path === `${siteRoot.pathname}work-with-me/`) return "work";
    return null;
  }

  const currentPage = pageOf(new URL(window.location.href));

  function reset() {
    window.clearTimeout(navigationTimer);
    window.clearTimeout(resetTimer);
    delete root.dataset.pageTransition;
    root.style.removeProperty("--transition-x");
    root.style.removeProperty("--transition-y");
    navigating = false;
  }

  function setOrigin(x = 50, y = 45) {
    root.style.setProperty("--transition-x", `${x}%`);
    root.style.setProperty("--transition-y", `${y}%`);
  }

  function arrive() {
    if (reducedMotion.matches) {
      reset();
      return;
    }
    window.clearTimeout(resetTimer);
    root.dataset.pageTransition = "arriving";
    resetTimer = window.setTimeout(reset, 1000);
  }

  function prepareArrival(x, y) {
    root.classList.add("intro-seen");
    try { sessionStorage.setItem("auuruum-portfolio-intro-seen", "1"); } catch { /* The transition also works without storage. */ }
    if (reducedMotion.matches) return;
    setOrigin(x, y);
    root.dataset.pageTransition = "pending";
    document.addEventListener("DOMContentLoaded", () => {
      if (root.dataset.pageTransition === "pending") arrive();
    }, { once: true });
    // A slow third-party script must never hold the page behind the veil.
    resetTimer = window.setTimeout(arrive, 900);
  }

  // This runs in the head, so the destination is covered before its first paint.
  try {
    const pending = JSON.parse(sessionStorage.getItem(storageKey));
    sessionStorage.removeItem(storageKey);
    if (pending && pending.to === currentPage && Date.now() - pending.at < 10000 && Date.now() >= pending.at) {
      prepareArrival(pending.x, pending.y);
    }
  } catch { /* Ordinary navigation still works when browser storage is disabled. */ }

  if (currentPage && !root.dataset.pageTransition && window.performance?.getEntriesByType("navigation")[0]?.type === "back_forward") {
    prepareArrival();
  }

  function destinationFor(target) {
    const link = target instanceof Element ? target.closest("a[href]") : null;
    if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self")) return null;
    const url = new URL(link.href, window.location.href);
    const page = pageOf(url);
    if (!currentPage || !page || page === currentPage) return null;
    return { url, page };
  }

  function prefetch(event) {
    if (navigator.connection?.saveData) return;
    const destination = destinationFor(event.target);
    if (!destination) return;
    const url = new URL(destination.url);
    url.hash = "";
    if (prefetched.has(url.href)) return;
    prefetched.add(url.href);
    const hint = document.createElement("link");
    hint.rel = "prefetch";
    hint.href = url.href;
    document.head.append(hint);
  }

  document.addEventListener("pointerover", prefetch, { passive: true });
  document.addEventListener("focusin", prefetch);
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || reducedMotion.matches) return;
    const destination = destinationFor(event.target);
    if (!destination) return;
    if (navigating) {
      event.preventDefault();
      return;
    }

    const x = event.detail ? Math.max(0, Math.min(100, event.clientX / window.innerWidth * 100)) : 50;
    const y = event.detail ? Math.max(0, Math.min(100, event.clientY / window.innerHeight * 100)) : 45;
    try {
      sessionStorage.setItem(storageKey, JSON.stringify({ to: destination.page, at: Date.now(), x, y }));
    } catch { return; }

    event.preventDefault();
    navigating = true;
    window.clearTimeout(resetTimer);
    setOrigin(x, y);
    root.dataset.pageTransition = "leaving";
    navigationTimer = window.setTimeout(() => {
      window.location.assign(destination.url.href);
      resetTimer = window.setTimeout(reset, 1800);
    }, 560);
  });

  // Restoring a document from history also restores its previous animation state.
  window.addEventListener("pageshow", (event) => {
    if (!event.persisted) return;
    reset();
    if (!reducedMotion.matches) {
      setOrigin();
      arrive();
    }
  });
  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches && !navigating) reset();
  });
})();
