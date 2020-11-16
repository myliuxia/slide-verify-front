module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-irregular-whitespace": "off",
    "no-async-promise-executor": "off",
    "no-unused-vars": "off",
    "vue/no-reserved-keys": "off",
    "require-atomic-updates": "off",
    "semi": ["error", "never"],
    "quotes": ["error", "single"],
    // "no-trailing-spaces": ["error", { "skipBlankLines": true }],
    // "no-whitespace-before-property": "error"
    "no-extra-semi": "off"
  }
};
