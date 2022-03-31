---
cover: https://res.cloudinary.com/practicaldev/image/fetch/https://opengraph.githubassets.com/51ab140e160882668aa0f466b095b5bb634739d04b8095f768d1741def9280f2/inmanta/vscode-inmanta/issues/314
date: 2022-03-30T06:57:37+0000
title: VSCode Migrate Typescript CommonJS to ESM
updated: 2022-03-30T06:57:37+0000
uuid: 0d62f3d2-19c9-4888-8674-ddff779112e4
category:
  - Uncategorized
tags: []
subtitle: null
excerpt: null
description: null
lang: en
thumbnail: https://res.cloudinary.com/practicaldev/image/fetch/https://opengraph.githubassets.com/51ab140e160882668aa0f466b095b5bb634739d04b8095f768d1741def9280f2/inmanta/vscode-inmanta/issues/314
photos:
  - https://res.cloudinary.com/practicaldev/image/fetch/https://opengraph.githubassets.com/51ab140e160882668aa0f466b095b5bb634739d04b8095f768d1741def9280f2/inmanta/vscode-inmanta/issues/314
wordcount: 420
---

<h2 id="how-to-migrate-typescript-commonjs-to-esm-with-vscode" tabindex="-1"><a class="header-anchor" href="#how-to-migrate-typescript-commonjs-to-esm-with-vscode">How to migrate typescript commonjs to esm with vscode</a></h2>
<h2 id="package-json" tabindex="-1"><a class="header-anchor" href="#package-json">package.json</a></h2>
<p>add following key to package.json</p>
<pre><code class="language-jsonc">{
  &quot;type&quot;: &quot;module&quot;,
  &quot;main&quot;: &quot;./dist/src/main.js&quot;,
  &quot;exports&quot;: {
    &quot;.&quot;: &quot;./dist/src/main.js&quot;
  },
  &quot;typesVersions&quot;: {
    &quot;*&quot;: {
      &quot;main.d.ts&quot;: [&quot;dist/src/main.d.ts&quot;]
    }
  }
}
</code></pre>
<p>Nicer module specifiers for a subtree:</p>
<pre><code class="language-jsonc">{
  &quot;type&quot;: &quot;module&quot;,
  &quot;main&quot;: &quot;./dist/src/main.js&quot;,
  &quot;exports&quot;: {
    &quot;./*&quot;: &quot;./dist/src/*&quot;
  },
  &quot;typesVersions&quot;: {
    &quot;*&quot;: {
      &quot;*&quot;: [&quot;dist/src/*&quot;]
    }
  }
}
</code></pre>
<p>Default <a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svZXNtLW5vZGUuaHRtbA==" target="_blank" rel="nofollow noopener">typescript documentation</a></p>
<pre><code class="language-jsonc">{
    &quot;name&quot;: &quot;my-package&quot;,
    &quot;type&quot;: &quot;module&quot;,
    &quot;exports&quot;: {
        &quot;.&quot;: {
            // Entry-point for `import &quot;my-package&quot;` in ESM
            &quot;import&quot;: &quot;./esm/index.js&quot;,
            // Entry-point for `require(&quot;my-package&quot;) in CJS
            &quot;require&quot;: &quot;./commonjs/index.cjs&quot;,
        },
    },
    // CJS fall-back for older versions of Node.js
    &quot;main&quot;: &quot;./commonjs/index.cjs&quot;,
}
</code></pre>
<ul>
<li><a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svZGVjbGFyYXRpb24tZmlsZXMvcHVibGlzaGluZy5odG1sI3ZlcnNpb24tc2VsZWN0aW9uLXdpdGgtdHlwZXN2ZXJzaW9ucw==" target="_blank" rel="nofollow noopener"><code>&quot;typesVersions&quot;</code></a> performs the same mapping as <code>&quot;exports&quot;</code>, but for TypeScript’s type definitions.</li>
</ul>
<h2 id="tsconfig-json" tabindex="-1"><a class="header-anchor" href="#tsconfig-json">tsconfig.json</a></h2>
<p>match your configuration (points A, B, C)</p>
<pre><code class="language-jsonc">{
  &quot;compilerOptions&quot;: {
    &quot;rootDir&quot;: &quot;./&quot;,
    &quot;outDir&quot;: &quot;./dist&quot;,
    &quot;target&quot;: &quot;ES2020&quot;,
    &quot;lib&quot;: [
      &quot;ES2020&quot;, &quot;DOM&quot;
    ],
    &quot;module&quot;: &quot;ES2020&quot;, // (A)
    &quot;moduleResolution&quot;: &quot;Node&quot;, // (B)
    &quot;strict&quot;: true,
    &quot;sourceMap&quot;: true,
    // Needed for importing CommonJS modules
    &quot;allowSyntheticDefaultImports&quot;: true, // (C)
    // Compile d.ts
    &quot;declaration&quot;: true,
  }
}
</code></pre>
<ul>
<li>Line A (<a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL3RzY29uZmlnI21vZHVsZQ==" target="_blank" rel="nofollow noopener"><code>&quot;module&quot;</code></a>): We are telling TypeScript to generate ECMAScript modules.
<ul>
<li><code>&quot;ES6&quot;</code>, <code>&quot;ES2015&quot;</code>: support for basic ESM features</li>
<li><code>&quot;2020&quot;</code>: additionally, support for dynamic imports and <code>import.meta</code>.</li>
</ul>
</li>
<li>Line B (<a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL3RzY29uZmlnI21vZHVsZVJlc29sdXRpb24=" target="_blank" rel="nofollow noopener"><code>&quot;moduleResolution&quot;</code></a>): This value is needed for Node.js.</li>
<li>Line C (<a href="//webmanajemen.com/page/safelink.html?url=aHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL3RzY29uZmlnI2FsbG93U3ludGhldGljRGVmYXVsdEltcG9ydHM=" target="_blank" rel="nofollow noopener"><code>&quot;allowSyntheticDefaultImports&quot;</code></a>): I needed this setting in order to import a legacy CommonJS module. The <code>module.exports</code> were the default export in that case.</li>
</ul>
<h2 id="vs-code-settings-json" tabindex="-1"><a class="header-anchor" href="#vs-code-settings-json">VSCode settings.json</a></h2>
<p>open your <code>settings.json</code> or <code>.vscode/settings.json</code>, add following keys</p>
<pre><code class="language-jsonc">{
  //...
  &quot;javascript.preferences.importModuleSpecifierEnding&quot;: &quot;js&quot;,
  &quot;typescript.preferences.importModuleSpecifierEnding&quot;: &quot;js&quot;
  //...
}
</code></pre>
<h2 id="replace-non-extension-of-imports" tabindex="-1"><a class="header-anchor" href="#replace-non-extension-of-imports">Replace non extension of imports</a></h2>
<p>add filename extensions to existing local imports (within a package):</p>
<h3 id="method-1" tabindex="-1"><a class="header-anchor" href="#method-1">Method 1</a></h3>
<ul>
<li>Open Search And Replace VSCode</li>
<li>Insert below pattern to search input and check Regex Search Flag</li>
</ul>
<pre><code class="language-regexp">(^import.*\/((?!.js).)*)(['&quot;];)$
</code></pre>
<ul>
<li>Insert below replacement pattern to replacement input</li>
</ul>
<pre><code class="language-regexp">$1.js$3
</code></pre>
<ul>
<li>Insert folder to <code>files to input</code> bar for example <code>src/</code></li>
<li>Replace all
<img src="https://user-images.githubusercontent.com/12471057/160769725-41b16e7d-ef33-4886-8113-d59a30a63482.png" alt="image"></li>
</ul>
<h3 id="method-2" tabindex="-1"><a class="header-anchor" href="#method-2">Method 2</a></h3>
<ul>
<li>Search: <code>^(import [^';]* from '(\./|(\.\./)+)[^';.]*)';</code></li>
<li>Replace: <code>$1.js';</code></li>
</ul>
