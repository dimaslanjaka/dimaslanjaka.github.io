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

## How to change wordpress table prefix
> NOTE: replace `NEWPREFIX_` and `OLDPREFIX_` with yours

## Step 1
### Change variable value of wp-config.php
1. Login to your control panel or via FTP.
2. Open File Manager under Files & Security.
3. Locate the file wp-config.php and check the box to select it.
4. Edit the wp-config.php.
5. Locate the following entry:
```php
$table_prefix = 'OLDPREFIX_';
```
6. Replace with new entry:
```php
$table_prefix = 'NEWPREFIX_';
```

## Step 2
### Update SQL database to change wordpress table prefix
1.  [Open your database in PhpMyAdmin](/p/search.html?q=access+database+phpmyadmin).
2.  Click on the database name in the menu to the left to unfold all tables.
3.  Select all tables that start with *wp_*; you should have 12 in total.
4.  Click **With selected** to open the drop-down menu and select **Replace table prefix**.
5.  Type in *wp_* in the **From-field**, and the new name in the **To-field**, in this example, *david_*.
6.  Click **Continue** to make the change.

![phpmyadmin](https://help.one.com/hc/article_attachments/360003288777/table-prefix-database.png)

### Rename table
```sql
RENAME table `OLDPREFIX_commentmeta` TO `NEWPREFIX_commentmeta`;
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
```
### Update usermeta
```sql
update NEWPREFIX_usermeta set meta_key = 'NEWPREFIX_capabilities' where meta_key = 'OLDPREFIX_capabilities';
update NEWPREFIX_usermeta set meta_key = 'NEWPREFIX_user_level' where meta_key = 'OLDPREFIX_user_level';
update NEWPREFIX_usermeta set meta_key = 'NEWPREFIX_autosave_draft_ids' where meta_key = 'OLDPREFIX_autosave_draft_ids';
update NEWPREFIX_options set option_name = 'NEWPREFIX_user_roles' where option_name = 'OLDPREFIX_user_roles';
```

