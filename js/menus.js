// Elements
const basicNavButton = document.querySelector("nav button");
const trueNavButton = document.querySelector("[aria-haspopup]");
const trueNavMenu = trueNavButton.nextElementSibling;
const trueNavLevels = trueNavMenu.querySelectorAll("button");
const trueLiveRegion = document.querySelector("[role=alert]");

// Functions
const openBasicMenu = (target) => {
  let expanded = target.getAttribute("aria-expanded");
  expanded === "true"
    ? target.setAttribute("aria-expanded", false)
    : target.setAttribute("aria-expanded", true);

  let menu = target.nextElementSibling;
  menu.hidden = !menu.hidden;
};

const openTrueMenu = (target) => {
  let expanded = target.getAttribute("aria-expanded");
  expanded === "true"
    ? target.setAttribute("aria-expanded", false)
    : target.setAttribute("aria-expanded", true);

  let menu = target.nextElementSibling;
  menu.hidden = !menu.hidden;
  menu.querySelector(":not([disabled]").focus();
};

const closeTrueMenu = (target) => {
  let expanded = target.getAttribute("aria-expanded");
  expanded === "true"
    ? target.setAttribute("aria-expanded", false)
    : target.setAttribute("aria-expanded", true);

  let menu = target.nextElementSibling;
  menu.hidden = !menu.hidden;
  target.focus();
};

const selectTrueLevel = (target) => {
  trueNavLevels.forEach((level) => level.removeAttribute("aria-checked"));
  target.setAttribute("aria-checked", true);
  trueLiveRegion.textContent = `Your difficulty level is ${target.textContent}.`;
  trueNavButton.setAttribute("aria-expanded", false);
  target.parentElement.setAttribute("hidden", "");
  trueNavButton.focus();
};

// Event Listeners
basicNavButton.addEventListener("click", (e) => {
  openBasicMenu(e.target);
});

trueNavButton.addEventListener("click", (e) => {
  openTrueMenu(e.target);
});

trueNavButton.addEventListener("keydown", (e) => {
  if (e.key === "ArrowDown") {
    openTrueMenu(e.target);
  } else if (e.key === "ArrowUp") {
    closeTrueMenu(e.target);
  }
});

trueNavLevels.forEach((level, index) => {
  let totalLevels = trueNavLevels.length;
  level.addEventListener("click", (e) => selectTrueLevel(e.target));

  level.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      if (index + 1 < totalLevels) {
        level.nextElementSibling.focus();
      } else {
        trueNavLevels[0].focus();
      }
    } else if (e.key === "ArrowUp") {
      if (index > 0) {
        level.previousElementSibling.focus();
      } else {
        trueNavLevels[totalLevels - 1].focus();
      }
    } else if (e.key === "Escape") {
      closeTrueMenu(trueNavButton);
    }
  });
});
