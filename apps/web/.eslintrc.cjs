module.exports = {
  extends: [require.resolve("@saas/config/eslint/next.cjs")],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  ignorePatterns: ["next-env.d.ts", "postcss.config.cjs"]
};

