module.exports = {
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  root: true,
  env: {
    node: true,
    browser: true,
    commonjs: true,
    es6: true,
    jquery: true,
  },
  parserOptions: {
    parser: "babel-eslint",
    ecmaVersion: 6, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      impliedStrict: true,
    },
  },
  plugins: [/*'prettier'*/ "ejs"],
  extends: [
    /*'prettier'*/
  ],
  rules: {
    "require-jsdoc": 0,
    "prefer-rest-params": "off",
    "no-const-assign": 1,
    "no-extra-semi": 0,
    semi: 0,
    "no-fallthrough": 0,
    "no-empty": 0, // no empty statement
    "no-mixed-spaces-and-tabs": 1,
    "no-redeclare": 0, // no redeclare function/const
    "no-this-before-super": 1,
    "no-undef": 0, // fix call function on single browser js without import
    "no-unreachable": 1,
    "no-unused-vars": 1,
    "no-use-before-define": 0,
    "constructor-super": 1,
    curly: 0,
    eqeqeq: 0, // fix disable == and ===
    "func-names": 0, // fix anonymous function warning
    "valid-typeof": 1,
    //'prettier/prettier': 1,
    "import/prefer-default-export": "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off", // fix no console warning
  },
};
