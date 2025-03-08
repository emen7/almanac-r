/**
 * Master Universe Almanac - Main JavaScript
 * Handles theme toggling, settings menu, and accessibility features
 */

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const body = document.body;
  const settingsToggle = document.getElementById('settings-toggle');
  const settingsDropdown = document.getElementById('settings-dropdown');
  const themeToggle = document.getElementById('theme-toggle');
  const fontDecrease = document.getElementById('font-decrease');
  const fontReset = document.getElementById('font-reset');
  const fontIncrease = document.getElementById('font-increase');

  // Initialize settings
  initTheme();
  initFontSize();

  // Toggle settings dropdown
  settingsToggle.addEventListener('click', function() {
    const expanded = this.getAttribute('aria-expanded') === 'true' || false;
    this.setAttribute('aria-expanded', !expanded);
    settingsDropdown.hidden = expanded;
  });

  // Toggle theme
  themeToggle.addEventListener('click', function() {
    const currentTheme = localStorage.getItem('theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
  });

  // Font size controls
  fontDecrease.addEventListener('click', function() {
    changeFontSize(-1);
  });

  fontReset.addEventListener('click', function() {
    resetFontSize();
  });

  fontIncrease.addEventListener('click', function() {
    changeFontSize(1);
  });

  // Initialize theme
  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('dark');
    }
  }

  // Set theme
  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-theme');
      themeToggle.querySelector('.theme-text').textContent = 'Dark Mode';
    } else {
      body.classList.remove('light-theme');
      themeToggle.querySelector('.theme-text').textContent = 'Light Mode';
    }
    
    localStorage.setItem('theme', theme);
  }

  // Initialize font size
  function initFontSize() {
    const fontSize = localStorage.getItem('fontSize');
    if (fontSize) {
      document.documentElement.style.fontSize = fontSize;
    }
  }

  // Change font size
  function changeFontSize(delta) {
    const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const newSize = currentSize + (delta * 1);
    
    if (newSize >= 12 && newSize <= 24) {
      document.documentElement.style.fontSize = newSize + 'px';
      localStorage.setItem('fontSize', newSize + 'px');
    }
  }

  // Reset font size
  function resetFontSize() {
    document.documentElement.style.fontSize = '16px';
    localStorage.setItem('fontSize', '16px');
  }

  // Keyboard navigation enhancement
  document.addEventListener('keydown', function(e) {
    // Close settings dropdown when pressing Escape
    if (e.key === 'Escape' && settingsDropdown.hidden === false) {
      settingsToggle.setAttribute('aria-expanded', 'false');
      settingsDropdown.hidden = true;
      settingsToggle.focus();
    }
  });
});
