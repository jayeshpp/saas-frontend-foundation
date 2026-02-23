/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  ignorePatterns: ["**/dist/**", "**/.next/**", "**/.turbo/**", "**/build/**"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["@typescript-eslint", "import", "unused-imports"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  rules: {
    "@typescript-eslint/consistent-type-imports": ["error", { "prefer": "type-imports" }],
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ],
    "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
    "import/order": [
      "error",
      {
        "alphabetize": { "order": "asc", "caseInsensitive": true },
        "newlines-between": "always",
        "groups": ["type", "builtin", "external", "internal", "parent", "sibling", "index"]
      }
    ]
  }
};

