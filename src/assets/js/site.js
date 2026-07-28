(function() {
  const body = document.body;
  const toggle = document.querySelector("[data-site-menu-toggle]");
  const sidenav = document.querySelector("[data-site-sidenav]");
  const scrim = document.querySelector("[data-site-scrim]");
  const closeButton = document.querySelector("[data-site-menu-close]");

  if (!toggle || !sidenav || !scrim) return;

  function open() {
    body.classList.add("site-menu-open");
    sidenav.classList.add("is-open");
    sidenav.setAttribute("aria-hidden", "false");
    toggle.setAttribute("aria-expanded", "true");
    scrim.hidden = false;
  }

  function close() {
    body.classList.remove("site-menu-open");
    sidenav.classList.remove("is-open");
    sidenav.setAttribute("aria-hidden", "true");
    toggle.setAttribute("aria-expanded", "false");
    scrim.hidden = true;
  }

  toggle.addEventListener("click", () => {
    sidenav.classList.contains("is-open") ? close() : open();
  });

  scrim.addEventListener("click", close);
  if (closeButton) closeButton.addEventListener("click", close);

  sidenav.addEventListener("click", event => {
    if (event.target.closest("a")) close();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape") close();
  });
})();
