"use client";

import * as React from "react";

export const FEATURE_FLAGS = ["crossTenantAudit", "impersonation", "planLocks"] as const;

export type FeatureFlag = (typeof FEATURE_FLAGS)[number];

export type FeatureFlagState = Record<FeatureFlag, boolean>;

const DEFAULTS: FeatureFlagState = {
  crossTenantAudit: true,
  impersonation: true,
  planLocks: true
};

const STORAGE_KEY = "saas.foundation.flags.v1";

function loadFlags(): FeatureFlagState {
  if (typeof window === "undefined") return DEFAULTS;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return DEFAULTS;
  try {
    const parsed = JSON.parse(raw) as Partial<FeatureFlagState>;
    return { ...DEFAULTS, ...parsed };
  } catch {
    return DEFAULTS;
  }
}

function saveFlags(next: FeatureFlagState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

type FeatureFlagsValue = {
  flags: FeatureFlagState;
  setFlag(flag: FeatureFlag, enabled: boolean): void;
  reset(): void;
};

const FeatureFlagsContext = React.createContext<FeatureFlagsValue | null>(null);

export function FeatureFlagsProvider(props: { children: React.ReactNode }) {
  const [flags, setFlags] = React.useState<FeatureFlagState>(() => loadFlags());

  React.useEffect(() => {
    saveFlags(flags);
  }, [flags]);

  const value = React.useMemo<FeatureFlagsValue>(() => {
    return {
      flags,
      setFlag: (flag, enabled) => setFlags((s) => ({ ...s, [flag]: enabled })),
      reset: () => setFlags(DEFAULTS)
    };
  }, [flags]);

  return (
    <FeatureFlagsContext.Provider value={value}>{props.children}</FeatureFlagsContext.Provider>
  );
}

export function useFeatureFlags(): FeatureFlagsValue {
  const ctx = React.useContext(FeatureFlagsContext);
  if (!ctx) throw new Error("useFeatureFlags must be used within FeatureFlagsProvider.");
  return ctx;
}

