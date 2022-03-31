---
cover: https://i3.ytimg.com/vi/FgG5nYW5EUA/maxresdefault.jpg
date: 2022-03-27T03:02:25+0000
tags:
  - Wordpress
  - MySQL
title: Change wordpress table prefix updated 2022
updated: 2022-03-27T03:02:25+0000
uuid: a69fa1b4-3f2c-4888-8757-27179d208826
category:
  - Programming
  - MYSQL
lang: en
description: Change wordpress table prefix updated 2022
subtitle: Change wordpress table prefix updated 2022
excerpt: Change wordpress table prefix updated 2022
thumbnail: https://i3.ytimg.com/vi/FgG5nYW5EUA/maxresdefault.jpg
photos:
  - https://i3.ytimg.com/vi/FgG5nYW5EUA/maxresdefault.jpg
wordcount: 340
---

<h2 id="how-to-change-wordpress-table-prefix" tabindex="-1"><a class="header-anchor" href="#how-to-change-wordpress-table-prefix">How to change wordpress table prefix</a></h2>
<blockquote>
<p>NOTE: replace <code>NEWPREFIX_</code> and <code>OLDPREFIX_</code> with yours</p>
</blockquote>
<h2 id="step-1" tabindex="-1"><a class="header-anchor" href="#step-1">Step 1</a></h2>
<h3 id="change-variable-value-of-wp-config-php" tabindex="-1"><a class="header-anchor" href="#change-variable-value-of-wp-config-php">Change variable value of wp-config.php</a></h3>
<ol>
<li>Login to your control panel or via FTP.</li>
<li>Open File Manager under Files &amp; Security.</li>
<li>Locate the file wp-config.php and check the box to select it.</li>
<li>Edit the wp-config.php.</li>
<li>Locate the following entry:</li>
</ol>
<pre><code class="language-php">$table_prefix = 'OLDPREFIX_';
</code></pre>
<ol start="6">
<li>Replace with new entry:</li>
</ol>
<pre><code class="language-php">$table_prefix = 'NEWPREFIX_';
</code></pre>
<h2 id="step-2" tabindex="-1"><a class="header-anchor" href="#step-2">Step 2</a></h2>
<h3 id="update-sql-database-to-change-wordpress-table-prefix" tabindex="-1"><a class="header-anchor" href="#update-sql-database-to-change-wordpress-table-prefix">Update SQL database to change wordpress table prefix</a></h3>
<ol>
<li><a href="/p/search.html?q=access+database+phpmyadmin">Open your database in PhpMyAdmin</a>.</li>
<li>Click on the database name in the menu to the left to unfold all tables.</li>
<li>Select all tables that start with <em>wp_</em>; you should have 12 in total.</li>
<li>Click <strong>With selected</strong> to open the drop-down menu and select <strong>Replace table prefix</strong>.</li>
<li>Type in <em>wp_</em> in the <strong>From-field</strong>, and the new name in the <strong>To-field</strong>, in this example, <em>david_</em>.</li>
<li>Click <strong>Continue</strong> to make the change.</li>
</ol>
<p><img src="https://help.one.com/hc/article_attachments/360003288777/table-prefix-database.png" alt="phpmyadmin"></p>
<h3 id="rename-table" tabindex="-1"><a class="header-anchor" href="#rename-table">Rename table</a></h3>
<pre><code class="language-sql">RENAME table `OLDPREFIX_commentmeta` TO `NEWPREFIX_commentmeta`;
RENAME table `OLDPREFIX_comments` TO `NEWPREFIX_comments`;
RENAME table `OLDPREFIX_links` TO `NEWPREFIX_links`;
RENAME table `OLDPREFIX_options` TO `NEWPREFIX_options`;
RENAME table `OLDPREFIX_postmeta` TO `NEWPREFIX_postmeta`;
RENAME table `OLDPREFIX_posts` TO `NEWPREFIX_posts`;
RENAME table `OLDPREFIX_terms` TO `NEWPREFIX_terms`;
RENAME table `OLDPREFIX_termmeta` TO `NEWPREFIX_termmeta`;
RENAME table `OLDPREFIX_term_relationships` TO `NEWPREFIX_term_relationships`;
RENAME table `OLDPREFIX_term_taxonomy` TO `NEWPREFIX_term_taxonomy`;
RENAME table `OLDPREFIX_usermeta` TO `NEWPREFIX_usermeta`;
RENAME table `OLDPREFIX_users` TO `NEWPREFIX_users`;
</code></pre>
<h3 id="update-usermeta" tabindex="-1"><a class="header-anchor" href="#update-usermeta">Update usermeta</a></h3>
<pre><code class="language-sql">update NEWPREFIX_usermeta set meta_key = 'NEWPREFIX_capabilities' where meta_key = 'OLDPREFIX_capabilities';
update NEWPREFIX_usermeta set meta_key = 'NEWPREFIX_user_level' where meta_key = 'OLDPREFIX_user_level';
update NEWPREFIX_usermeta set meta_key = 'NEWPREFIX_autosave_draft_ids' where meta_key = 'OLDPREFIX_autosave_draft_ids';
update NEWPREFIX_options set option_name = 'NEWPREFIX_user_roles' where option_name = 'OLDPREFIX_user_roles';
</code></pre>
