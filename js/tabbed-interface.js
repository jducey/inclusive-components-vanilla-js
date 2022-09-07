const tabController = () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab, index) => {
    tab.addEventListener("keydown", (e) => {
      let currentIndex = index;
      var dir;

      //   ? Focus styles do not seem to be working
      if (e.key === "ArrowDown") {
        panels[index].focus();
      }

      if (e.key === "ArrowRight") {
        dir = currentIndex + 1;
      } else if (e.key === "ArrowLeft") {
        dir = currentIndex - 1;
      } else {
        dir = null;
      }

      if (dir !== null) {
        e.preventDefault();
        let newIndex;

        if (tabs[dir]) {
          newIndex = dir;
        } else {
          newIndex = dir === index - 1 ? tabs.length - 1 : 0;
        }

        switchTab(e.currentTarget, tabs[newIndex]);
        tabs[newIndex].focus();
      }
    });

    tab.addEventListener("click", (e) => {
      const lastActiveTab = document.querySelector("[aria-selected='true']");
      switchTab(lastActiveTab, e.currentTarget);
    });
  });
};

const switchTab = (currentTab, nextTab) => {
  const currentTabId = currentTab.getAttribute("href");
  const currentPanel = document.querySelector(
    "section[id=" + currentTabId.substring(1) + "]"
  );
  const nextTabId = nextTab.getAttribute("href");
  const nextPanel = document.querySelector(
    "section[id=" + nextTabId.substring(1) + "]"
  );
  currentTab.setAttribute("tabindex", "-1");
  currentTab.removeAttribute("aria-selected");
  nextTab.setAttribute("aria-selected", "true");
  nextTab.removeAttribute("tabindex");
  currentPanel.setAttribute("hidden", "");
  nextPanel.removeAttribute("hidden");
};

const tabCleanup = () => {
  const tabs = document.querySelectorAll('[role="tab"]');
  const panels = document.querySelectorAll('[role="tabpanel"]');

  tabs.forEach((tab) => {
    tab.removeAttribute("aria-selected");
    tab.removeAttribute("tabindex");
  });

  panels.forEach((panel) => {
    panel.removeAttribute("hidden");
  });
};

window.addEventListener("DOMContentLoaded", () => {
  if (typeof window.matchMedia !== undefined) {
    if (window.matchMedia("(min-width: 400px)").matches) {
      tabController();
    } else {
      tabCleanup();
    }
  }
});
