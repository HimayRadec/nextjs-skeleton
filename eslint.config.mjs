import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    rules: {
      "no-warning-comments": [
        "warn",
        { terms: ["todo", "fixme"], location: "anywhere" },
      ],

      // Downgrade TS unused vars to warning
      "@typescript-eslint/no-unused-vars": ["warn"],
    },
  },
];


export default eslintConfig;
