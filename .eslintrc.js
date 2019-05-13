module.exports = {
  env: {
    es6: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'no-console': 'off',
    'no-undef': 'off',
    'prefer-destructuring': 'off',
    'no-plusplus': 'off',
    'no-loop-func': 'off'
  },
};
