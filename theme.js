// DailyBrief — Theme management
// Runs before body renders to prevent flash of wrong theme.
// Default: dark. Toggle persists across pages via localStorage.

(function() {
  const saved = localStorage.getItem('db_theme');
  // If user has explicitly chosen, apply it. Otherwise respect system.
  if (saved === 'light' || saved === 'dark') {
    document.documentElement.setAttribute('data-theme', saved);
  }
})();

function dbToggleTheme() {
  const html    = document.documentElement;
  const current = html.getAttribute('data-theme');
  // Determine effective current theme
  let effective;
  if (current === 'light')       effective = 'light';
  else if (current === 'dark')   effective = 'dark';
  else effective = window.matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';

  const next = effective === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('db_theme', next);

  // Update all toggle buttons on the page
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-label', next === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    btn.querySelector('.theme-icon').textContent = next === 'dark' ? '☀' : '☽';
    btn.title = next === 'dark' ? 'Light mode' : 'Dark mode';
  });
}

// Call after DOM ready to sync button state
function dbInitThemeBtn() {
  const html      = document.documentElement;
  const current   = html.getAttribute('data-theme');
  const isDark    = current === 'dark' || (!current && window.matchMedia('(prefers-color-scheme:dark)').matches);
  document.querySelectorAll('.theme-toggle').forEach(btn => {
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    btn.querySelector('.theme-icon').textContent = isDark ? '☀' : '☽';
    btn.title = isDark ? 'Light mode' : 'Dark mode';
  });
}
