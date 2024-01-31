import { ThemeColor } from '../types/app.types';

function setThemeColor(themeColor: ThemeColor) {
  const root = document.documentElement;
  root.style.setProperty('--color-faded', themeColor.faded);
  root.style.setProperty('--color-primary', themeColor.primary);
  root.style.setProperty('--color-secondary', themeColor.secondary);
  root.style.setProperty('--color-background', themeColor.background);
  root.style.setProperty('--color-foreground', themeColor.foreground);
  root.style.setProperty('--color-secondary2', themeColor.secondary2);
}

export default setThemeColor;
