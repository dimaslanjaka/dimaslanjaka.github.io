# bootstrap-hexo-theme

A Hexo theme based around Bootstrap. Mobile-friendly and very customizable.

## Install
1. Setup Hexo site
```
# Create hexo site
$ mkdir $working_directory$
$ cd $working_directory$
$ hexo init
$ npm install
# Install theme
$ git clone https://github.com/bendotbike/bootstrap-hexo-theme.git themes/bootstrap-hexo-theme
```
2. Remove ```themes/landscape```
3. Open ```_config.yml``` and change ```theme``` from ```landscape``` to ```bootstrap-hexo-theme```
4. Generate site ```hexo generate && hexo serve```
5. View your site at [localhost:4000](http://localhost:4000)

## Todo
- Pagination
- Icons
- Grunt integration
- Custom ```category.ejs``` and ```tag.ejs```
- Better document ```styles.css```
- Tweak and document ```_config.yml```
- Add more documentation to this README
- ```bs_theme``` in ```_config.yml``` does nothing, currently Bootstrap theme is set through a local file specified in ```partials/head.ejs``` - fix this
- Nested items in footer
- Footer CSS (center, font sizing)
- Clean up ```main.js```
- Remove ```project_page.js```
- Make posts displayed on ```index.ejs``` have more detail
