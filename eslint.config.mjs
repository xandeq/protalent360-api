import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "script" } }, // Força o CommonJS em arquivos .js
  { languageOptions: { globals: globals.node } }, // Define ambiente node
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "import/no-commonjs": "off",
      "no-undef": "off",
      "import/extensions": "off", // Para evitar erros com extensões
    },
  },
];
