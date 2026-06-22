// theme/dynamic.ts
import { hexFromArgb } from "@material/material-color-utilities";
import type { ColorScheme } from "./monet";
import { COLOR_KEYS } from "./monet";

let dynamicImported: any = null;

async function loadUtils() {
  if (!dynamicImported) {
    dynamicImported = await import("@material/material-color-utilities");
  }
  return dynamicImported;
}

// CSS 变量后缀 → 方案实例属性名（驼峰式）
const SUFFIX_TO_PROP: Record<string, string> = {
  primary: "primary",
  "on-primary": "onPrimary",
  "primary-container": "primaryContainer",
  "on-primary-container": "onPrimaryContainer",
  secondary: "secondary",
  "on-secondary": "onSecondary",
  "secondary-container": "secondaryContainer",
  "on-secondary-container": "onSecondaryContainer",
  tertiary: "tertiary",
  "on-tertiary": "onTertiary",
  "tertiary-container": "tertiaryContainer",
  "on-tertiary-container": "onTertiaryContainer",
  error: "error",
  "on-error": "onError",
  "error-container": "errorContainer",
  "on-error-container": "onErrorContainer",
  background: "background",
  "on-background": "onBackground",
  surface: "surface",
  "on-surface": "onSurface",
  "surface-variant": "surfaceVariant",
  "on-surface-variant": "onSurfaceVariant",
  outline: "outline",
  "outline-variant": "outlineVariant",
  "inverse-surface": "inverseSurface",
  "inverse-on-surface": "inverseOnSurface",
  "inverse-primary": "inversePrimary",
};

/**
 * 从方案实例中提取 CSS 变量映射表
 * 直接读取实例属性，避免依赖 toJSON()
 */
function schemeToVariables(schemeInstance: any): ColorScheme {
  const vars = {} as Record<string, string>;
  for (const cssVar of COLOR_KEYS) {
    const suffix = cssVar.replace("--md-sys-color-", "");
    const prop = SUFFIX_TO_PROP[suffix];
    const argb = schemeInstance[prop]; // ARGB 数值
    if (typeof argb === "number") {
      vars[cssVar] = hexFromArgb(argb);
    } else {
      console.warn(`Missing property: ${prop}`, schemeInstance);
    }
  }
  return vars as ColorScheme;
}

export async function generateDynamicSchemes(seedColorHex: string) {
  const utils = await loadUtils();
  const seedArgb = utils.argbFromHex(seedColorHex);
  const theme = utils.themeFromSourceColor(seedArgb);

  const lightScheme = schemeToVariables(theme.schemes.light);
  const darkScheme = schemeToVariables(theme.schemes.dark);

  // 阅读模式：SchemeContent 实例
  const hct = utils.Hct.fromInt(seedArgb);
  const contentLight = new utils.SchemeContent(hct, false, 0);
  const readScheme = schemeToVariables(contentLight);

  return { light: lightScheme, dark: darkScheme, read: readScheme };
}