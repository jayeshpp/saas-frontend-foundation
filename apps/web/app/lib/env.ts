export type AppEnv = "prod" | "staging" | "local";

export function getAppEnv(): AppEnv {
  const raw = process.env.NEXT_PUBLIC_APP_ENV?.toLowerCase();
  if (raw === "prod" || raw === "production") return "prod";
  if (raw === "staging" || raw === "stage") return "staging";
  if (process.env.NODE_ENV === "production") return "prod";
  return "local";
}

