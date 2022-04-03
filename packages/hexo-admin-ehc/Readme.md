![logo](docs/logo.png?raw=true)

https://github.com/lwz7512/hexo-admin-ehc

An admin UI for the [Hexo blog engine](http://hexo.io). Based on the [Ghost](http://ghost.org) interface, with inspiration from [svbtle](http://svbtle.com) and [prose.io](http://prose.io).

## Enhanced Version For hexo-admin plugin on:

- dependencies fix for hexo-fs;
- editor enhancement for image upload and select;
- use deploy button to generate static files locally;
- fix preview link opening;
- multi language support
- todos...

## Plugin Code Structure

```

|- client : front end code for this admin UI and content manage
|    |- run.js : build bundle.js entrance
|    |- api folder  : front router mapping principles with baseUrl config
|    |- less folder : each component style included by less/index.less
|    |- app.js : menu bar
|    |- index.js : root component inited by run.js, admin(node)
|    |- router.js : each admin module navigation corresponding component
|    |- ... :
|- index.js : plugin load entry by hexo blog
|- api.js   : blog related data processing, save/read...
|- upload.js: handle multi image file upload

```

## Local client Development Workflow

- start your local hexo blog
- run 'gulp build' in the plugin root directory for client source change
- made some changes in client source
- cp www/bundle.js www/bundle.css into your local hexo blog/node_modules/hexo-admin-ehc/www
- refresh http://localhost:4000/admin

## Local api Development Workflow

- cd plugin root directory
- change api.js logic
- cp api.js into your local hexo blog/node_modules/hexo-admin-ehc/
- restart hexo blog to reload plugin service

## Running hexo blog in Daemon

- create a shell script, start.sh:

```
#!/bin/bash

hexo server --silent
```

- run the script in the blog root directory

```
$ nohup ./start.sh &
$ exit
```


## Hexo Version

For 2.x, use version `0.3.0` of this plugin. Version `1.x` and beyond only
support Hexo v3.x.


## Screenshots
![posts view](docs/pasted-0.png?raw=true)

![editor view](docs/Snip20180305_4.png?raw=true)

## Quickstart

### 1. Setup hexo & create a blog
```sh
npm install -g hexo
cd ~/
hexo init my-blog
cd my-blog
npm install
```
### 2. Install the admin & start things up
```sh
npm install --save hexo-admin-ehc
hexo server -d
open http://localhost:4000/admin/
```
### 3. Profit!
The UI should be pretty discoverable -- let me know if you can't find something.

### 4. Password protection
If you're using Hexo admin on your live server, you want some password
protection. To enable this, you just add a few config variables to your hexo
`_config.yml`:

```
admin:
  username: myfavoritename
  password_hash: be121740bf988b2225a313fa1f107ca1
  secret: a secret something
```

The `password_hash` is the bcrypt hash of your password. The `secret` is used
to make the cookies secure, so it's a good idea to have it be long and
complicated.

A utility in Hexo admin's Settings can hash your password and generate the `admin`
section for you. Start Hexo and go to `Settings > Setup authentification`
and fill out your information. Copy the generated YAML into your `_config.yml`.

Once that's in place, start up your hexo server and going to `/admin/` will
require you to enter your password.

### 5. Custom post metadata
To add and edit your own post metadata with the admin interface, add the
metadata variable and your custom variables to your hexo `_config.yml`:
```
metadata:
  author_id: defaultAuthorId
  language:
```
You can provide default values that will be used to initialize the metadata
of a new post. These can be either primitives or arrays.
