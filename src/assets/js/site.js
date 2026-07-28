(function() {
  const body = document.body;
  const triggers = Array.from(document.querySelectorAll("[data-site-menu-trigger]"));
  const sidenav = document.querySelector("[data-site-sidenav]");
  const scrim = document.querySelector("[data-site-scrim]");
  let audioCtx = null;
  let noiseBuffer = null;
  let lastUiTick = 0;

  function getAudioContext() {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return null;
    if (!audioCtx) audioCtx = new AudioCtor();
    return audioCtx;
  }

  function unlockAudio() {
    const ctx = getAudioContext();
    if (ctx && ctx.state === "suspended") ctx.resume().catch(() => {});
  }

  function getNoiseBuffer(ctx) {
    if (noiseBuffer) return noiseBuffer;
    const len = Math.floor(ctx.sampleRate * 0.08);
    const buffer = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
    noiseBuffer = buffer;
    return noiseBuffer;
  }

  function playUiTick() {
    const now = Date.now();
    if (now - lastUiTick < 45) return;
    lastUiTick = now;

    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      unlockAudio();

      const t = ctx.currentTime;
      const source = ctx.createBufferSource();
      const highpass = ctx.createBiquadFilter();
      const bandpass = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      source.buffer = getNoiseBuffer(ctx);
      highpass.type = "highpass";
      highpass.frequency.value = 1800;
      bandpass.type = "bandpass";
      bandpass.frequency.value = 3200;
      bandpass.Q.value = 0.9;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.028, t + 0.003);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.034);

      source.connect(highpass);
      highpass.connect(bandpass);
      bandpass.connect(gain);
      gain.connect(ctx.destination);
      source.start(t);
      source.stop(t + 0.045);
    } catch (error) {}
  }

  ["pointerdown", "touchstart", "keydown"].forEach(type => {
    window.addEventListener(type, unlockAudio, { once: true, passive: true });
  });

  document.addEventListener("click", event => {
    const control = event.target.closest("button, a, [role='button'], .clickable, .vector-btn, .era-btn");
    if (!control || control.matches("[disabled], [aria-disabled='true']")) return;
    playUiTick();
  }, true);

  if (!triggers.length || !sidenav || !scrim) return;

  function setExpanded(value) {
    triggers.forEach(trigger => trigger.setAttribute("aria-expanded", String(value)));
  }

  function open() {
    body.classList.add("site-menu-open");
    sidenav.classList.add("is-open");
    sidenav.setAttribute("aria-hidden", "false");
    setExpanded(true);
    scrim.hidden = false;
  }

  function close() {
    body.classList.remove("site-menu-open");
    sidenav.classList.remove("is-open");
    sidenav.setAttribute("aria-hidden", "true");
    setExpanded(false);
    scrim.hidden = true;
  }

  const desktopNav = window.matchMedia("(min-width: 1180px)");

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      // On desktop the expanded nav is visible and the drawer is disregarded —
      // the logo just returns home instead of toggling the menu.
      if (desktopNav.matches && trigger.classList.contains("site-brand")) {
        window.location.href = "/";
        return;
      }
      sidenav.classList.contains("is-open") ? close() : open();
    });
  });

  // If the viewport grows to desktop while the drawer is open, close it cleanly.
  desktopNav.addEventListener("change", e => { if (e.matches) close(); });

  scrim.addEventListener("click", close);

  sidenav.addEventListener("click", event => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
})();
