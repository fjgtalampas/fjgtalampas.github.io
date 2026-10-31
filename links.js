// Keep existing bookmarks to profile sections working after introducing the hub.
const profileSections = new Set(["#top", "#work", "#experience", "#capabilities", "#credentials"]);

function preserveProfileLink() {
  if (profileSections.has(window.location.hash)) {
    window.location.replace(`profile.html${window.location.search}${window.location.hash}`);
  }
}

preserveProfileLink();
window.addEventListener("hashchange", preserveProfileLink);
document.getElementById("current-year").textContent = new Date().getFullYear();
