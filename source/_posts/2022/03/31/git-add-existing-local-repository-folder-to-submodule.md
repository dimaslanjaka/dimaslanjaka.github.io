---
date: 2022-03-31T15:38:52+0000
subtitle: how to add existing local repository folder to submodule
tags:
  - GitHub
title: git add existing local repository folder to submodule
updated: 2022-03-31T16:51:59+0000
uuid: df364b7a-2f1e-4888-8f8f-2a34a28ccdce
category:
  - Uncategorized
excerpt: how to add existing local repository folder to submodule
description: how to add existing local repository folder to submodule
lang: en
wordcount: 267
---

<h2 id="from-repository-subdirectory-to-git-submodule" tabindex="-1"><a class="header-anchor" href="#from-repository-subdirectory-to-git-submodule">From repository subdirectory to git submodule</a></h2>
<p>The following steps are based on the repository introduced in the previous section. They will explain how to turn a subdirectory of a project into an independent git repository and how to use this new repository as submodule, a foreign repository embedded within a dedicated subdirectory of the source tree of a project.</p>
<h2 id="folder-structure-example" tabindex="-1"><a class="header-anchor" href="#folder-structure-example">Folder structure example</a></h2>
<pre><code class="language-bash"># this is parent repository
~/master/.git
# this is another local repository
~/other/.git
</code></pre>
<h2 id="make-a-backup" tabindex="-1"><a class="header-anchor" href="#make-a-backup">Make a backup</a></h2>
<p><strong>IMPORTANT</strong> to make a backup both of folders. compress zip them (master and other).</p>
<h2 id="copy-git-folder" tabindex="-1"><a class="header-anchor" href="#copy-git-folder">Copy .git folder</a></h2>
<p>Copy the <strong>.git</strong> folder from the local folder repository to the parent repository. <code>.git/modules</code>.</p>
<p>example:</p>
<pre><code class="language-bash"># copy ~/other/.git to ~/master/.git/modules/other/.git
cp ~/other/.git ~/master/.git/modules/other/
</code></pre>
<h2 id="copy-repository-folder" tabindex="-1"><a class="header-anchor" href="#copy-repository-folder">Copy repository folder</a></h2>
<p>Copy the other local repository to the parent repository.</p>
<p>example:</p>
<pre><code class="language-bash"># copy ~/other to ~/master/other
cp ~/other ~/master/
</code></pre>
<h2 id="create-git-file" tabindex="-1"><a class="header-anchor" href="#create-git-file">Create .git file</a></h2>
<p>Create <strong>.git</strong> file instead of folder. input following codes:</p>
<pre><code>gitdir: ../.git/modules/other
</code></pre>
<p>make sure <code>../.git/modules/other</code> is located to <code>~/master/.git/modules/other/.git/modules/other</code>.</p>
<h2 id="add-gitmodules" tabindex="-1"><a class="header-anchor" href="#add-gitmodules">Add .gitmodules</a></h2>
<p>add <code>.gitmodules</code> to the parent repository</p>
<pre><code class="language-bash">touch ~/master/.gitmodules
</code></pre>
<p>put following codes to .gitmodules</p>
<pre><code class="language-profile">[submodule &quot;&lt;path subfolder&gt;&quot;]
	path = &lt;path subfolder&gt;
	url = &lt;url github repository&gt;
	branch = &lt;branch name of other local repository&gt;
</code></pre>
<p>example:</p>
<pre><code class="language-profile">[submodule &quot;other&quot;]
	path = other
	url = https://github.com/dimaslanjaka/dimaslanjaka.github.io
	branch = posts
</code></pre>
<h2 id="execute-command-line" tabindex="-1"><a class="header-anchor" href="#execute-command-line">Execute command line</a></h2>
<pre><code class="language-bash">git submodule absorbgitdirs
git submodule update --remote
</code></pre>
<p>incoming terms:</p>
<ul>
<li>git add subfolder repository to submodule</li>
<li>git add submodule from subfolder
<ul>
<li>git add other subfolder git to submodule</li>
<li>git move other repository as submodule</li>
</ul>
</li>
</ul>
