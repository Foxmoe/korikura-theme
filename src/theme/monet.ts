// monet color scheme engine

import { argbFromHex, themeFromSourceColor } from "@material/material-color-utilities";

export function generateTheme(hex: string, mode: "light" | "dark") {
  const theme = themeFromSourceColor(argbFromHex(hex));

  const scheme = mode === "dark"
    ? theme.schemes.dark.toJSON()
    : theme.schemes.light.toJSON();

  return scheme;
}

export function applyThemeVariables(theme: Record<string, string>) {
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme)) {
    root.style.setProperty(`--${key}`, value);
  }
}

export function getSystemMode(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function resolveMode(mode: "auto" | "light" | "dark") {
  if (mode === "auto") return getSystemMode();
  return mode;
}