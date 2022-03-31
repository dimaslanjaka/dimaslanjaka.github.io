---
author:
  nick: Dimas Lanjaka
  link: https://github.com/dimaslanjaka
  image: https://i.pinimg.com/564x/32/bc/65/32bc65e19220728fb290249059a7242a.jpg
category:
  - Programming
  - JS
comments: true
cover: https://i.ytimg.com/vi/lHAeK8t94as/maxresdefault.jpg
date: 2021-11-28T07:00:00+07:00
keywords:
  - nodejs
  - eslint
  - prettier
  - vscode
  - auto
  - format
  - lint
lang: en
location: Indonesia
subtitle: How to configure eslint with prettier to automated lint and format
  codes in typescript project using vscode
tags:
  - JS
  - NodeJS
title: Eslint Prettier In Typescript Project Using Vscode
type: post
uuid: 3f6ada3c-0ed8-4888-87c8-3371f8927a2c
webtitle: NodeJS
updated: 2022-03-19T19:53:25+07:00
excerpt: How to configure eslint with prettier to automated lint and format
  codes in typescript project using vscode
description: How to configure eslint with prettier to automated lint and format
  codes in typescript project using vscode
thumbnail: https://i.ytimg.com/vi/lHAeK8t94as/maxresdefault.jpg
photos:
  - https://i.ytimg.com/vi/lHAeK8t94as/maxresdefault.jpg
wordcount: 584
---

<h1 id="auto-lint-and-format-typescript-using-vs-code-with-eslint-and-prettier" tabindex="-1"><a class="header-anchor" href="#auto-lint-and-format-typescript-using-vs-code-with-eslint-and-prettier">Auto Lint And Format Typescript Using VSCode With Eslint And Prettier</a></h1>
<p>Linter becomes 2 types:</p>
<ul>
<li><a href="https://palantir.github.io/tslint/">TSLint</a> is a linter that must be utilized for TypeScript.</li>
<li><a href="https://eslint.org/">ESLint</a> is a linter supports both JavaScript and TypeScript.
<strong>ESLint has a more performant architecture than TSLint</strong> and that they will <strong>only be focusing on ESLint</strong> when providing editor linting integration for TypeScript. Now how to automated these linter in vscode without <strong><a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">prettier plugin</a></strong></li>
</ul>
<h2 id="install-dependencies" tabindex="-1"><a class="header-anchor" href="#install-dependencies">Install dependencies</a></h2>
<p>install using npm:</p>
<pre><code class="language-shell">npm i -D prettier eslint-config-prettier eslint-plugin-prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
</code></pre>
<p>install using yarn:</p>
<pre><code class="language-shell">yarn add prettier eslint-config-prettier eslint-plugin-prettier eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
</code></pre>
<h2 id="install-and-activate-vs-code-es-lint-extension-for-auto-linter-and-formatter" tabindex="-1"><a class="header-anchor" href="#install-and-activate-vs-code-es-lint-extension-for-auto-linter-and-formatter">install and activate VSCode ESLint extension for auto Linter And Formatter</a></h2>
<p><a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">Download Here</a></p>
<h2 id="create-eslintrc-js" tabindex="-1"><a class="header-anchor" href="#create-eslintrc-js">Create .eslintrc.js</a></h2>
<pre><code class="language-js">module.exports = {
  root: true, // Specifies your current project has own eslint rules without extends parent folder eslint rules
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  env: {
    browser: true, // add support for browser js (window,document,location,etc)
    amd: true, // add amd support
    node: true, // add node support (module.export,etc)
  },
  parserOptions: {
    ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  extends: [
    'eslint:recommended', // uses eslint default recommended
    'plugin:@typescript-eslint/eslint-recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:prettier/recommended', // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  // override rules for js files
  &quot;overrides&quot;: [
    {
      &quot;files&quot;: [
        &quot;*.js&quot;
      ],
      &quot;rules&quot;: {
        &quot;@typescript-eslint/no-var-requires&quot;: &quot;off&quot; // disable require warning on js files
      }
    }
  ],
  // specify your desired rules for eslint
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off', // disable function without return type
    &quot;no-unused-vars&quot;: &quot;off&quot;, // disable original eslint unused-vars
    &quot;@typescript-eslint/no-unused-vars&quot;: [&quot;error&quot;, { argsIgnorePattern: &quot;^_&quot; }], // enable typescript-eslint unused-vars and allow unused vars start with underscore (_)
    &quot;@typescript-eslint/no-explicit-any&quot;: &quot;off&quot;, // allow any types
    &quot;@typescript-eslint/no-this-alias&quot;: [ // rules for this binding
      &quot;error&quot;,
      {
        allowDestructuring: false, // Disallow `const { props, state } = this`; true by default
        allowedNames: [&quot;self&quot;], // Allow `const self = this`; `[]` by default
      },
    ],
    // &quot;arrow-body-style&quot; and &quot;prefer-arrow-callback&quot; are two ESLint core rules that can cause issues with prettier/prettier plugin, so turn them off.
    &quot;arrow-body-style&quot;: &quot;off&quot;,
    &quot;prefer-arrow-callback&quot;: &quot;off&quot;,
  },
};
</code></pre>
<h2 id="create-prettier-config" tabindex="-1"><a class="header-anchor" href="#create-prettier-config">Create Prettier Config</a></h2>
<p>specify your desired config for prettier</p>
<h3 id="using-prettierrc-js" tabindex="-1"><a class="header-anchor" href="#using-prettierrc-js">Using .prettierrc.js</a></h3>
<pre><code class="language-js">module.exports = {
  semi: true,
  trailingComma: &quot;all&quot;,
  singleQuote: true,
  printWidth: 120,
  tabWidth: 2
};
</code></pre>
<h3 id="using-prettierc" tabindex="-1"><a class="header-anchor" href="#using-prettierc">Using .prettierc</a></h3>
<pre><code class="language-json">{
  &quot;$schema&quot;: &quot;https://json.schemastore.org/prettierrc&quot;,
  &quot;semi&quot;: true,
  &quot;printWidth&quot;: 120,
  &quot;singleQuote&quot;: true,
  &quot;trailingComma&quot;: &quot;none&quot;,
  &quot;tabWidth&quot;: 2
}
</code></pre>
<h2 id="create-vscode-settings-json" tabindex="-1"><a class="header-anchor" href="#create-vscode-settings-json">Create .vscode/settings.json</a></h2>
<p>this will automate lint and format your codes when saving.</p>
<pre><code class="language-json">{
  &quot;editor.codeActionsOnSave&quot;: {
    &quot;source.fixAll.eslint&quot;: true // let ESLint take formating and linting
  },
  &quot;[json]&quot;: {
    &quot;editor.formatOnSave&quot;: true // enable json formating with default vscode formatter
  },
  &quot;editor.formatOnSave&quot;: false, // disable default vscode formatter
}
</code></pre>
<h1 id="create-tsconfig-json-if-not-created-yet" tabindex="-1"><a class="header-anchor" href="#create-tsconfig-json-if-not-created-yet">create tsconfig.json (if not created yet)</a></h1>
<p>for example tsconfig.json for node 12</p>
<pre><code class="language-json">{
  &quot;$schema&quot;: &quot;https://json.schemastore.org/tsconfig&quot;,
  &quot;display&quot;: &quot;Node 12&quot;,
  &quot;extends&quot;: &quot;@tsconfig/node12/tsconfig.json&quot;,
  &quot;compilerOptions&quot;: {
    &quot;preserveConstEnums&quot;: true,
    &quot;allowJs&quot;: true,
    &quot;outDir&quot;: &quot;./dist&quot;
  },
  &quot;include&quot;: [
    &quot;src/**/*&quot;
  ],
  &quot;exclude&quot;: [
    &quot;**/node_modules/**&quot;,
    &quot;**/*.spec.ts&quot;,
    &quot;**/*.test.ts&quot;,
    &quot;**/__tests__/**&quot;
  ]
}
</code></pre>
<h2 id="finish" tabindex="-1"><a class="header-anchor" href="#finish">Finish</a></h2>
<p>now your vscode format and lint your codes automatically.</p>
