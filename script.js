(() => {
  function initializeHome({ signal, onCleanup }) {
    const loader = document.querySelector("#loader");
    const loaderCount = document.querySelector("#loader-count");
    const loaderProgress = document.querySelector("#loader-progress");
    const loaderWord = document.querySelector("#loader-word");
    const words = ["Design", "Create", "Ship"];
    const loaderStarted = performance.now();
    let loaderFrame = 0;
    let loaderDelay = 0;
    onCleanup(() => { cancelAnimationFrame(loaderFrame); clearTimeout(loaderDelay); });

    function dismissLoader() {
      cancelAnimationFrame(loaderFrame);
      window.clearTimeout(loaderDelay);
      loader.classList.add("done");
      document.body.classList.remove("loading");
    }

    function animateLoader(now) {
      const elapsed = now - loaderStarted;
      const progress = Math.min(elapsed / 1900, 1);
      const count = Math.round(progress * 100);

      loaderCount.textContent = String(count).padStart(3, "0");
      loaderProgress.style.transform = `scaleX(${progress})`;
      loaderWord.textContent = words[Math.min(words.length - 1, Math.floor(progress * words.length))];

      if (progress < 1) {
        loaderFrame = requestAnimationFrame(animateLoader);
        return;
      }

      loaderDelay = window.setTimeout(dismissLoader, 320);
    }

    if (document.documentElement.classList.contains("intro-seen")) {
      dismissLoader();
    } else {
      document.body.classList.add("loading");
      loaderFrame = requestAnimationFrame(animateLoader);
    }

    window.addEventListener("pageshow", (event) => {
      if (event.persisted) {
        document.documentElement.classList.add("intro-seen");
        dismissLoader();
      }
    }, { signal });

    const header = document.querySelector("#site-header");
    window.addEventListener("scroll", () => {
      header.classList.toggle("scrolled", window.scrollY > 100);
    }, { passive: true, signal });

    const roleWord = document.querySelector("#role-word");
    const roles = ["builder", "modder", "hardware maker", "toolsmith", "visual creator"];
    let roleIndex = 0;

    const roleTimer = window.setInterval(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      roleWord.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 380, easing: "ease-out" },
      );
      roleWord.textContent = roles[roleIndex];
    }, 2000);
    onCleanup(() => clearInterval(roleTimer));

    async function loadDownloadStats() {
      const endpoints = [
        ["#total-downloads", "https://aurumoracle.duckdns.org/api/downloads"],
        ["#modrinth-downloads", "https://aurumoracle.duckdns.org/api/modrinth/"],
        ["#curseforge-downloads", "https://aurumoracle.duckdns.org/api/curseforge/"],
      ];

      await Promise.all(
        endpoints.map(async ([selector, url]) => {
          const target = document.querySelector(selector);
          if (!target) return;

          try {
            const response = await fetch(url, { signal });
            if (!response.ok) return;
            const data = await response.json();
            if (data.downloads) target.textContent = data.downloads;
          } catch {
            // Static fallback values stay visible when stats API is unreachable.
          }
        }),
      );
    }

    loadDownloadStats();

    const copyEmailButton = document.querySelector("#copy-email");
    const copyStatus = document.querySelector("#copy-status");
    const emailAddress = "aurimasdovgialo@gmail.com";

    copyEmailButton?.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(emailAddress);
        copyStatus.textContent = "Copied";
      } catch {
        copyStatus.textContent = "Select the email above to copy it";
      }

      window.setTimeout(() => {
        copyStatus.textContent = "";
      }, 2400);
    });

    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = document.querySelector("#lightbox-image");
    const lightboxCaption = document.querySelector("#lightbox-caption");
    const lightboxCounter = document.querySelector("#lightbox-counter");
    const lightboxClose = document.querySelector("#lightbox-close");
    const lightboxPrev = document.querySelector("#lightbox-prev");
    const lightboxNext = document.querySelector("#lightbox-next");
    const lightboxItems = [...document.querySelectorAll("[data-lightbox='bebraland']")];
    let lightboxIndex = 0;

    function showLightbox(index) {
      if (!lightbox || !lightboxItems.length) return;

      lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
      const item = lightboxItems[lightboxIndex];
      const image = item.querySelector("img");

      lightboxImage.src = image.getAttribute("src");
      lightboxImage.alt = image.alt;
      lightboxCaption.textContent = item.querySelector("span")?.textContent || "";
      lightboxCounter.textContent = (lightboxIndex + 1) + " / " + lightboxItems.length;

      if (!lightbox.open) {
        if (typeof lightbox.showModal === "function") {
          lightbox.showModal();
        } else {
          lightbox.setAttribute("open", "");
        }
      }

      lightboxClose.focus();
    }

    lightboxItems.forEach((item, index) => {
      item.addEventListener("click", (event) => {
        event.preventDefault();
        showLightbox(index);
      });
    });

    lightboxClose?.addEventListener("click", () => lightbox.close());
    lightboxPrev?.addEventListener("click", () => showLightbox(lightboxIndex - 1));
    lightboxNext?.addEventListener("click", () => showLightbox(lightboxIndex + 1));

    lightbox?.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox?.open) return;
      if (event.key === "ArrowLeft") showLightbox(lightboxIndex - 1);
      if (event.key === "ArrowRight") showLightbox(lightboxIndex + 1);
    }, { signal });
  }
  if (window.PortfolioTransitions) window.PortfolioTransitions.register("home", initializeHome);
  else initializeHome({ signal: new AbortController().signal, onCleanup() {} });
})();
