// Mapagino demo shell v1. Theme button: System -> Light -> Dark -> System (copy of mapagino.com theme.js).
// "System" follows prefers-color-scheme (no data-theme, nothing saved).
// The <head> script applies a saved light/dark choice before the first paint;
// this file only wires the button.

const THEME_ORDER = ["system", "light", "dark"];

// Pure: the state after `mode`. Tested in tests/theme.test.js.
function nextTheme(mode) {
  const i = THEME_ORDER.indexOf(mode);
  return THEME_ORDER[(i + 1) % THEME_ORDER.length];
}

if (typeof document !== "undefined") {
  (function () {
    const KEY = "mapagino.theme";
    const root = document.documentElement;
    const button = document.querySelector(".theme-toggle");
    if (!button) return;

    function mode() {
      const t = root.dataset.theme;
      return t === "light" || t === "dark" ? t : "system";
    }

    function apply(next) {
      try {
        if (next === "system") localStorage.removeItem(KEY);
        else localStorage.setItem(KEY, next);
      } catch (_) {
        // Storage blocked: the choice lasts for this page view only.
      }
      if (next === "system") delete root.dataset.theme;
      else root.dataset.theme = next;
      render();
    }

    function render() {
      const m = mode();
      button.dataset.mode = m;
      const label = button.dataset[`label${m[0].toUpperCase()}${m.slice(1)}`];
      button.setAttribute("aria-label", label);
      button.title = label;
    }

    button.addEventListener("click", () => apply(nextTheme(mode())));
    render();
  })();
}

if (typeof module !== "undefined") {
  module.exports = { nextTheme, THEME_ORDER };
}
