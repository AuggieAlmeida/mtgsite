(function () {
  'use strict';
  
  const html = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  
  if (!toggle) return;

  const STORAGE_KEY = 'mtg_theme';
  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialDark = (saved === 'dark') || (!saved && prefersDark);

  function updateIcon(dark) {
    if (!themeIcon) return;
    
    // Sun icon for light mode, Moon icon for dark mode
    if (dark) {
      themeIcon.innerHTML = '<path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />';
    } else {
      themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />';
    }
    
    // Add rotation animation
    themeIcon.style.transform = 'rotate(360deg)';
    setTimeout(() => {
      themeIcon.style.transform = 'rotate(0deg)';
    }, 300);
  }

  function applyTheme(dark) {
    html.classList.toggle('dark', dark);
    
    if (dark) {
      html.setAttribute('data-theme', 'dark');
      toggle.setAttribute('aria-pressed', 'true');
      toggle.title = 'Alternar para tema claro';
    } else {
      html.removeAttribute('data-theme');
      toggle.setAttribute('aria-pressed', 'false');
      toggle.title = 'Alternar para tema escuro';
    }
    
    updateIcon(dark);
    
    // Dispatch custom event for other components
    html.dispatchEvent(new CustomEvent('theme-change', { 
      detail: { dark, theme: dark ? 'dark' : 'light' } 
    }));
  }

  // Initialize theme
  applyTheme(initialDark);

  // Toggle theme on click
  toggle.addEventListener('click', () => {
    const isDark = html.classList.contains('dark');
    const newTheme = !isDark;
    
    applyTheme(newTheme);
    localStorage.setItem(STORAGE_KEY, newTheme ? 'dark' : 'light');
    
    // Add visual feedback
    toggle.style.transform = 'scale(0.95)';
    setTimeout(() => {
      toggle.style.transform = 'scale(1)';
    }, 150);
  });

  // Listen for system theme changes
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', (e) => {
      if (!saved) { // Only auto-switch if user hasn't set a preference
        applyTheme(e.matches);
      }
    });
  }
})();
