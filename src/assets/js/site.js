(function() {
  const body = document.body;
  const triggers = Array.from(document.querySelectorAll("[data-site-menu-trigger]"));
  const sidenav = document.querySelector("[data-site-sidenav]");
  const scrim = document.querySelector("[data-site-scrim]");

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

  triggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      sidenav.classList.contains("is-open") ? close() : open();
    });
  });

  scrim.addEventListener("click", close);

  sidenav.addEventListener("click", event => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
})();
