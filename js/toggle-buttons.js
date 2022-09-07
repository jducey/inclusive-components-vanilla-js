const toggles = document.querySelectorAll("[aria-pressed]");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const pressed = toggle.getAttribute("aria-pressed") === "true";
    toggle.setAttribute("aria-pressed", !pressed);
  });
});

const showCheck = document.querySelector(".show-check");

showCheck.addEventListener("click", (event) => {
  const iconValue = event.target.querySelector("span");
  iconValue.textContent === "✓"
    ? (iconValue.textContent = "✗")
    : (iconValue.textContent = "✓");
  return iconValue;
});

const playPause = document.querySelector(".play-pause");

playPause.addEventListener("click", (event) => {
  const iconValue = event.target.querySelector("[aria-hidden='true']");
  iconValue.textContent === "▶"
    ? (iconValue.textContent = "⏸")
    : (iconValue.textContent = "▶");
  return iconValue;
});

const switchToggles = document.querySelectorAll(".switch-toggles button");

switchToggles.forEach((switchToggle) => {
  switchToggle.addEventListener("click", () => {
    const checked = switchToggle.getAttribute("aria-checked") === "true";
    switchToggle.setAttribute("aria-checked", !checked);
  });
});
