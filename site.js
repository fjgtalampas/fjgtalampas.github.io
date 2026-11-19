// Shared behaviour for every page. Each feature only runs if its markup is present.
const root = document.documentElement;
const currentYear = document.getElementById("current-year");
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Link hub: keep old bookmarks like /#experience pointing at the profile sections.
if (document.body.classList.contains("links-page")) {
  const profileSections = new Set(["#top", "#work", "#experience", "#capabilities", "#credentials"]);
  const preserveProfileLink = () => {
    if (profileSections.has(window.location.hash)) {
      window.location.replace(`profile.html${window.location.search}${window.location.hash}`);
    }
  };
  preserveProfileLink();
  window.addEventListener("hashchange", preserveProfileLink);
}

// Years of experience: computed from the start date so it never goes stale.
document.querySelectorAll("[data-years-since]").forEach((el) => {
  const [year, month] = el.dataset.yearsSince.split("-").map(Number);
  const now = new Date();
  const years = now.getFullYear() - year - (now.getMonth() + 1 < month ? 1 : 0);
  if (years > 0) el.textContent = `${years}+`;
});

// Profile page: mobile menu.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");

function closeMenu() {
  menuButton?.setAttribute("aria-expanded", "false");
  navigation?.classList.remove("is-open");
}

menuButton?.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!expanded));
  navigation?.classList.toggle("is-open", !expanded);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && menuButton?.getAttribute("aria-expanded") === "true") {
    closeMenu();
    menuButton.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});

window.matchMedia("(max-width: 880px)").addEventListener("change", closeMenu);

// Profile page: highlight the nav link for the section currently in view.
const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
const sections = [...document.querySelectorAll("main section[id]")];

navLinks.forEach((link) => link.addEventListener("click", closeMenu));

if (navLinks.length && "IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      navLinks.forEach((link) => {
        const current = link.getAttribute("href") === `#${visible.target.id}`;
        if (current) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.25, 0.5] }
  );
  sections.forEach((section) => sectionObserver.observe(section));
}

// Printing: expand every collapsed <details>, then restore what the reader had open.
let reopen = [];
window.addEventListener("beforeprint", () => {
  reopen = [...document.querySelectorAll("details:not([open])")];
  reopen.forEach((details) => details.setAttribute("open", ""));
});
window.addEventListener("afterprint", () => {
  reopen.forEach((details) => details.removeAttribute("open"));
  reopen = [];
});

root.classList.add("js");
