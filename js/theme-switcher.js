const htmlElement = document.querySelector("html");
const toggleOsTheme = document.querySelector(".toggleTheme");
const toggleOsSpan = document.querySelector(".toggleTheme span");
var themeDark = false;

const checkOsTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    themeDark = true;
    toggleOsSpan.textContent = "on";
    toggleOsTheme.setAttribute("aria-pressed", true);
  }
};

toggleOsTheme.addEventListener("click", () => {
  if (themeDark === true) {
    htmlElement.setAttribute("data-theme", "light");
    toggleOsSpan.textContent = "off";
    themeDark = false;
    toggleOsTheme.setAttribute("aria-pressed", false);
  } else {
    htmlElement.setAttribute("data-theme", "dark");
    toggleOsSpan.textContent = "on";
    themeDark = true;
    toggleOsTheme.setAttribute("aria-pressed", true);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  checkOsTheme();
});
