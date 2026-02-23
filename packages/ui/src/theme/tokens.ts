export type ThemeTokens = {
  primary: string; // raw HSL like "222 84% 56%"
  secondary: string;
  accent: string;
};

export const DEFAULT_TOKENS: ThemeTokens = {
  primary: "222 84% 56%",
  secondary: "270 80% 60%",
  accent: "160 84% 39%"
};

export type ThemeCssVars = {
  "--brand-primary": string;
  "--brand-secondary": string;
  "--brand-accent": string;
};

export function toThemeCssVars(tokens: ThemeTokens): ThemeCssVars {
  return {
    "--brand-primary": tokens.primary,
    "--brand-secondary": tokens.secondary,
    "--brand-accent": tokens.accent
  };
}

