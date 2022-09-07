const collapsibleSections = () => {
  const headings = document.querySelectorAll("h3");
  //   to convert from NodeList to Array
  //   const headingsArray = [...headings];

  headings.forEach((heading) => {
    let btn = heading.querySelector("button");
    let headingId = heading.getAttribute("id");

    if (btn) {
      btn.addEventListener("click", () => {
        let content = heading.nextElementSibling;
        let region = heading.parentNode;
        let open = region.getAttribute("open") === "true";
        let expanded = btn.getAttribute("aria-expanded") === "true";
        let rect = btn.querySelector("svg rect:first-of-type");
        region.setAttribute("open", !open);
        btn.setAttribute("aria-expanded", !expanded);
        content.classList.toggle("hidden");
        rect.classList.toggle("hidden");

        history.pushState(null, null, "#" + headingId);
      });
    }
  });
};

const expandCollapse = () => {
  const sectionTarget = document.querySelector(".expand-collapse");
  const expandBtn = document.querySelector("#expand");
  const collapseBtn = document.querySelector("#collapse");
  const headings = sectionTarget.querySelectorAll("h3");

  expandBtn.addEventListener("click", () => {
    headings.forEach((heading) => {
      let content = heading.nextElementSibling;
      let btn = heading.querySelector("button");
      let rect = btn.querySelector("svg rect:first-of-type");
      btn.setAttribute("aria-expanded", "true");
      content.classList.remove("hidden");
      rect.classList.add("hidden");
    });
  });

  collapseBtn.addEventListener("click", () => {
    headings.forEach((heading) => {
      let content = heading.nextElementSibling;
      let btn = heading.querySelector("button");
      let rect = btn.querySelector("svg rect:first-of-type");
      btn.setAttribute("aria-expanded", "false");
      content.classList.add("hidden");
      rect.classList.remove("hidden");
    });
  });
};

connectedCallback = () => {
  const currentSection = window.location.hash.substring(1);
  if (currentSection) {
    const heading = document.querySelector("#" + currentSection);
    const btn = heading.querySelector("button");
    btn.click();
    btn.focus();
  }
};

window.addEventListener("DOMContentLoaded", () => {
  collapsibleSections();
  expandCollapse();
  connectedCallback();
});
