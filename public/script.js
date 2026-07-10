(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const languageButton = document.querySelector('[data-language-toggle]');
  const navButton = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        // Storage may be disabled in private/embedded contexts.
      }
    },
  };

  root.dataset.theme = storage.get('yh-theme') === 'dark' ? 'dark' : 'light';
  root.dataset.lang = storage.get('yh-language') === 'en' ? 'en' : 'ja';

  themeButton?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    storage.set('yh-theme', next);
  });

  languageButton?.addEventListener('click', () => {
    const next = root.dataset.lang === 'en' ? 'ja' : 'en';
    root.dataset.lang = next;
    storage.set('yh-language', next);
  });

  navButton?.addEventListener('click', () => {
    const open = nav?.getAttribute('data-open') === 'true';
    nav?.setAttribute('data-open', String(!open));
    navButton.setAttribute('aria-expanded', String(!open));
  });

  nav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.setAttribute('data-open', 'false');
      navButton?.setAttribute('aria-expanded', 'false');
    });
  });

  document.querySelectorAll('[data-current-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
