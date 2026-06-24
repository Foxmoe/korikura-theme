import { type THEME_MODE } from '@/constants/constants';

const savedHue = localStorage.getItem('theme-hue');
const savedMode = localStorage.getItem('theme-mode') || 'auto';
if (savedHue) {
  document.documentElement.style.setProperty('--hue', savedHue);
}

function setTheme(mode: THEME_MODE) {
  if (mode === 'light') {
    document.documentElement.removeAttribute('data-theme');
  } else if (mode === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
  localStorage.setItem('theme-mode', mode);
}

setTheme(savedMode as THEME_MODE);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
  const currentMode = localStorage.getItem('theme-mode') || 'auto';
  if (currentMode === 'auto') {
    if (e.matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }
});

// --- 主色选择器（假设有一个滑块 id="hue-slider"）---
document.getElementById('hue-slider')?.addEventListener('input', (e) => {
  const hue = e.target.value;
  document.documentElement.style.setProperty('--hue', hue);
  localStorage.setItem('theme-hue', hue);
});

// --- 暴露到全局供按钮调用 ---
window.setTheme = setTheme;