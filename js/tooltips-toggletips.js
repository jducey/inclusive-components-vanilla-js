const toggleTips = document.querySelectorAll("[data-toggletip-content]");

const toggleTipFunction = () => {
  toggleTips.forEach((toggleTip) => {
    // ! I prefer a CSS approach to show a dev that the incorrect element has been used.
    // if (toggleTip.nodeName !== "BUTTON") {
    //   console.error("Toggletip buttons need to be a <button> element");
    //   return;
    // }
    const tipMessage = toggleTip.getAttribute("data-toggletip-content");
    const liveRegion = toggleTip.nextElementSibling;

    toggleTip.addEventListener("click", () => {
      liveRegion.textContent = "";
      window.setTimeout(() => {
        const liveContent = document.createElement("span");
        liveContent.setAttribute("class", "toggletip-bubble");
        liveContent.textContent = tipMessage;
        liveRegion.appendChild(liveContent);
      }, 100);
    });

    document.addEventListener("click", (e) => {
      if (toggleTip !== e.target) {
        liveRegion.textContent = "";
      }
    });

    toggleTip.addEventListener("blur", (e) => {
      liveRegion.textContent = "";
    });

    toggleTip.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        liveRegion.textContent = "";
      }
    });
  });
};

window.addEventListener("DOMContentLoaded", () => {
  toggleTipFunction();
});
