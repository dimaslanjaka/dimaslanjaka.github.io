## `hexo.extend.helper.register`
alias this in `hexo.extend.helper.register`
```jsonc
[
  'page',               'path',          'url',
  'config',             'theme',         'layout',
  'env',                'view_dir',      'site',
  '__',                 '_p',            'next_version',
  'title',              'subtitle',      'author',
  'description',        'languages',     'ccURL',
  'pjax',               'cache',         'filename',
  'date',               'date_xml',      'time',
  'full_date',          'relative_date', 'time_tag',
  'moment',             'search_form',   'strip_html',
  'trim',               'titlecase',     'word_wrap',
  'truncate',           'escape_html',   'fragment_cache',
  'gravatar',           'is_current',    'is_home',
  'is_home_first_page', 'is_post',       'is_page',
  'is_archive',         'is_year',       'is_month',
  'is_category',        'is_tag',        'list_archives',
  'list_categories',    'list_tags',     'list_posts',
  'meta_generator',     'open_graph',    'number_format',
  'paginator',          'partial',       'markdown',
  'render',             'css',           'js',
  'link_to',            'mail_to',       'image_tag',
  'favicon_tag',        'feed_tag',      'tagcloud',
  'tag_cloud',          'toc',           'relative_url',
  'url_for',            'full_url_for',  'inspect',
  'log',                'injector',      'i18n_post_meta',
  'i18n_path',          'getPosts',      'getAuthor',
  'getPost',            'next_font',     'next_url',
  'next_inject',        'next_js',       'next_vendors',
  'next_data',          'next_pre',      'post_gallery',
  'post_edit',          'gitalk_md5',    'language_name',
  'next_menu',          'next_config',   'next_config_unique',
  'js_vendors'
]
```

`this.site` keys
```jsonc
[ 'posts', 'pages', 'categories', 'tags', 'data' ]
```

`this.site.tags` keys
```jsonc
[ 'data', 'length' ]
```
