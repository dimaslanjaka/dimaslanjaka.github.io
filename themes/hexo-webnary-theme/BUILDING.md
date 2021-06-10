### How to use
1. Follow the [hexo official document](https://hexo.io/) to build the basic blog.
>  the default path of the following operations is your hexo blog project directory, please enter the project.

**note**：**We recommend use node LTS version like node 8.9.3 because nodejieba 2.2.5 dependency has a build error in node 10 version** 

2. use `git` to clone `hexo-webnary-theme` into the theme folder under your blog project directory.
```shell
cd themes
git clone https://github.com/BRAVO68WEB/hexo-webnary-theme.git
```

3. To modify the root `_config.yml` and install node dependencies.
```shell
npm install --save hexo-autoprefixer hexo-filter-cleanup hexo-generator-feed hexo-generator-sitemap hexo-renderer-sass hexo-renderer-swig mamboer/lunr.js moment node-sass object-assign
```
**note**: If your OS is Windows, you may meet some problems when install the `mamboer/lunr.js`(because of the package`nodejieba`). To fix this problem, you should install `node-gyp`.
```shell
npm install -g windows-build-tools
npm install -g node-gyp
```

After finishing the install, you can preview your blog: `hexo server`(If you meet the style problem, you can use the command `hexo clean` first).

**note**: If you face the problem that lacking some js files(404 error), you should use `hexo server` instead of `hexo server -l`