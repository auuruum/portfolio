(() => {
  "use strict";
  const assetRoot = new URL("./", document.currentScript.src);
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  let stage, video, player;
  let expanded = false;
  let scheduled = false;
  let started = false;

  function target() {
    const regions = [...document.querySelectorAll("[data-cosmic-region]")];
    const visibleHeight = (rect) => Math.max(0, Math.min(innerHeight, rect.bottom) - Math.max(0, rect.top));
    const region = regions.sort((a, b) => visibleHeight(b.getBoundingClientRect()) - visibleHeight(a.getBoundingClientRect()))[0];
    if (!region) return { top: 0, height: innerHeight, visible: false };
    const rect = region.getBoundingClientRect();
    const height = rect.height + Number(region.dataset.cosmicBleed || 0);
    return { top: rect.top, height, visible: rect.top < innerHeight && rect.top + height > 0 };
  }
  function playback() {
    if (!video) return;
    const outsideScene = !expanded && !document.documentElement.dataset.pageTransition && stage.dataset.visible === "false";
    if (motion.matches || document.hidden || outsideScene) video.pause();
    else video.play().catch(() => {});
  }
  function sync() {
    scheduled = false;
    if (!stage || expanded) return;
    const rect = target();
    stage.style.top = `${rect.top}px`;
    stage.style.height = `${rect.height}px`;
    stage.dataset.visible = String(rect.visible);
    playback();
  }
  function schedule() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(sync);
  }
  async function start() {
    if (started || motion.matches) return;
    started = true;
    const source = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";
    if (!window.Hls) {
      await new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/hls.js@latest";
        script.onload = resolve;
        script.onerror = resolve;
        document.head.append(script);
      });
    }
    if (window.Hls?.isSupported()) {
      player = new window.Hls({ capLevelToPlayerSize: true, maxBufferLength: 16, maxMaxBufferLength: 24 });
      player.on(window.Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) {
          stage.classList.remove("is-playing");
          stage.dataset.mediaError = data.details;
          player.destroy();
        }
      });
      player.loadSource(source);
      player.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = source;
    }
    playback();
  }
  function mount() {
    if (!stage) {
      stage = document.createElement("div");
      stage.id = "cosmic-stage";
      stage.dataset.sceneId = Date.now().toString(36);
      stage.setAttribute("aria-hidden", "true");
      video = document.createElement("video");
      video.id = "continuous-cosmos";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "auto";
      video.poster = new URL("cosmos-poster.webp", assetRoot).href;
      video.tabIndex = -1;
      stage.append(video);
      document.body.append(stage);
      video.addEventListener("loadeddata", playback);
      video.addEventListener("playing", () => stage.classList.add("is-playing"));
      video.addEventListener("timeupdate", () => { stage.dataset.playhead = video.currentTime.toFixed(3); });
      video.addEventListener("error", () => {
        stage.classList.remove("is-playing");
        stage.dataset.mediaError = video.error?.message || "Playback unavailable";
      });
      document.addEventListener("visibilitychange", playback);
      window.addEventListener("scroll", schedule, { passive: true });
      window.addEventListener("resize", schedule, { passive: true });
      motion.addEventListener("change", () => { start(); playback(); });
    }
    document.documentElement.dataset.cosmicScene = "continuous";
    sync();
    start();
    return stage;
  }
  window.CosmicScene = {
    mount, sync,
    expand() {
      mount();
      expanded = true;
      stage.dataset.visible = "true";
      stage.style.top = "0px";
      stage.style.height = `${innerHeight}px`;
      playback();
    },
    settle() { expanded = false; sync(); },
  };
})();
