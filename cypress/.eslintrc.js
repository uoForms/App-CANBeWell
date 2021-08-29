module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    'cypress/globals': true,
  },
  extends: [
    'airbnb-base',
    'plugin:cypress/recommended',
    'plugin:chai-friendly/recommended',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'import/no-extraneous-dependencies': 'off',
    'class-methods-use-this': 'off',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 1 }],
  },
};
