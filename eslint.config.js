// @ts-check
import oxlint from "eslint-plugin-oxlint";
import tseslint from "typescript-eslint";
import vue from "eslint-plugin-vue";

const config = tseslint.config(
  tseslint.configs.strict,
  ...vue.configs["flat/vue2-recommended"],
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["**/*.ts", "**/*.js", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        tsconfigBaseDir: import.meta.dirname,
        extraFileExtensions: [".vue"],
      },
    },
  },
  ...oxlint.buildFromOxlintConfigFile("./.oxlintrc.json"),
);

export default config;
