const expandableCards = document.querySelectorAll("[data-expandable]");
const menuButton = document.querySelector(".menu-button");
const navGrid = document.querySelector(".nav-grid");

menuButton.addEventListener("click", () => {
  navGrid.scrollIntoView({ behavior: "smooth", block: "start" });
  menuButton.setAttribute("aria-expanded", "true");
});

expandableCards.forEach((card) => {
  const button = card.querySelector(".card-main");
  button.addEventListener("click", () => {
    const isOpen = card.classList.toggle("open");
    button.setAttribute("aria-expanded", String(isOpen));
  });
});

const toast = document.querySelector(".toast");
let toastTimer;

document.querySelectorAll(".nav-card a[href^='#'], a.nav-card[href^='#']").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const label = link.querySelector(".nav-label")?.textContent
      || link.querySelector("span")?.textContent
      || link.textContent.trim();
    toast.textContent = `${label} is coming soon ♡`;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
  });
});

