export const ROLES = ["admin", "manager", "viewer"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABEL: Record<Role, string> = {
  admin: "Admin",
  manager: "Manager",
  viewer: "Viewer"
};

/**
 * Optional hierarchy used for UI and future “minimum role” checks.
 * Authorization itself still goes through the explicit permission matrix.
 */
export const ROLE_RANK: Record<Role, number> = {
  admin: 3,
  manager: 2,
  viewer: 1
};

