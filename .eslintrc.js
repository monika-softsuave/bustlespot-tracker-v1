module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    "plugin:react/recommended",
    "plugin:flowtype/recommended",
    "eslint:recommended"
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react"],
  settings: {
    react: {
      version: require("./package.json").dependencies.react
    }
  },
  rules: {
    // Javascript
    'arrow-parens': [2, 'always'],
    'class-methods-use-this': [0],
    'consistent-return': [0],
    'curly': ['error', 'all'],
    'id-length': [2, { exceptions: ['i', 'j', 'x', 'y', 'z', '_', 'a', 'b'] }],
    'implicit-arrow-linebreak': [0],
    'object-curly-newline': [2, { 'consistent': true }],
    'space-unary-ops': [2],
    semi: ['error', 'never'],
    'semi-style': ['error', 'first'],
    'no-unexpected-multiline': ['error'],
    'max-len': [2, 240, 4],
    'linebreak-style': [2, 'windows'],
    'indent': [0],
    'comma-style': [2, 'last'],
    'no-negated-condition': [2],
    'no-nested-ternary': [2],
    'new-parens': [2],
    'function-paren-newline': [0],
    'space-before-function-paren': [0],
    'spaced-comment': ['error', 'always', { exceptions: ['::'] }],
    'padding-line-between-statements': [2,
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] }
    ],
    'newline-per-chained-call': [2, { 'ignoreChainWithDepth': 3 }],
    'no-lonely-if': [2],
    'no-mixed-spaces-and-tabs': [2],
    // These are the default groups, but without "+" and "-"
    'no-mixed-operators': [2,
      {
        "groups": [
          ["*", "/", "%", "**"],
          ["&", "|", "^", "~", "<<", ">>", ">>>"],
          ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
          ["&&", "||"],
          ["in", "instanceof"]
        ],
      }
    ],
    'func-call-spacing': [2, 'never'],
    'no-trailing-spaces': [2],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'no-implicit-coercion': [2, { 'allow': ['!!'] }],
    'no-alert': [2],
    // 'no-console': [2],
    'prefer-const': [2],
    'no-const-assign': [2],
    'arrow-spacing': [2, { 'before': true, 'after': true }],
    'no-confusing-arrow': [0],
    'no-restricted-globals': [2],
    'operator-linebreak': [0],
    'template-curly-spacing': [0],
  }
};
