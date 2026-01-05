(function () {
  const menu = document.getElementById("mobile-menu");
  const button = document.querySelector(`[aria-controls="mobile-menu"]`);

  button.addEventListener("click", () => {
    if (menu.hasAttribute("aria-expanded")) {
      menu.removeAttribute("aria-expanded");
      delete menu.dataset.open;
    } else {
      menu.setAttribute("aria-expanded", "true");
      menu.dataset.open = "true";
    }
  });
})();
