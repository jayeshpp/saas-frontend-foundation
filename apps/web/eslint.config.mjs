import tseslint from "@typescript-eslint/eslint-plugin";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import importPlugin from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

const config = [
  {
    ignores: [
      "next-env.d.ts",
      "postcss.config.cjs",
      ".eslintrc.cjs",
      "**/dist/**",
      "**/.next/**",
      "**/.turbo/**",
      "**/build/**"
    ]
  },
  ...nextCoreWebVitals,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
      "unused-imports": unusedImports
    },
    rules: {
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }
      ],
      "import/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import/order": [
        "error",
        {
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
          groups: ["type", "builtin", "external", "internal", "parent", "sibling", "index"]
        }
      ]
    }
  }
];

export default config;

