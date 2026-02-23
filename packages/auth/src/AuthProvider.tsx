import type { AuthState, AuthUser } from "./auth-types";
import type { UserId } from "@saas/types";

import * as React from "react";

import { mockAuthProvider } from "./mock-auth";
import { loadAuthState, saveAuthState } from "./storage";

type AuthContextValue = {
  state: AuthState;
  signIn(userId: UserId): void;
  signOut(): void;
  setUser(patch: Partial<AuthUser>): void;
  listMockUsers(): AuthUser[];
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider(props: { children: React.ReactNode }): React.ReactElement {
  const [state, setState] = React.useState<AuthState>(() => loadAuthState());

  React.useEffect(() => {
    saveAuthState(state);
  }, [state]);

  const value = React.useMemo<AuthContextValue>(() => {
    return {
      state,
      listMockUsers: () => mockAuthProvider.listUsers(),
      signIn: (userId) => {
        const user = mockAuthProvider.signIn(userId);
        setState({ status: "authenticated", user });
      },
      signOut: () => setState({ status: "anonymous", user: null }),
      setUser: (patch) => {
        setState((prev) => {
          if (prev.status !== "authenticated") return prev;
          return { status: "authenticated", user: { ...prev.user, ...patch } };
        });
      }
    };
  }, [state]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider.");
  return ctx;
}

