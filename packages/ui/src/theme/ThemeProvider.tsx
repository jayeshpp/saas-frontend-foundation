import type { ThemeTokens } from "./tokens";

import * as React from "react";

import { DEFAULT_TOKENS, toThemeCssVars } from "./tokens";

type ThemeProviderProps = {
  tokens?: ThemeTokens;
  children: React.ReactNode;
};

export function ThemeProvider(props: ThemeProviderProps): React.ReactElement {
  const tokens = props.tokens ?? DEFAULT_TOKENS;

  // Apply tenant theme as CSS vars on a dedicated boundary so the UI package
  // stays tenant-agnostic and composable (multiple shells possible).
  const style = React.useMemo(() => {
    return toThemeCssVars(tokens) as unknown as React.CSSProperties;
  }, [tokens]);

  return (
    <div data-theme="tenant" style={style}>
      {props.children}
    </div>
  );
}

