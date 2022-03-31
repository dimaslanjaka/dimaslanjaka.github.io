<!DOCTYPE html>
<html amp lang="{% if config.language %}{{ config.language }}{% endif %}">
<head>
    <meta charset="utf-8">

    {% set title = page.title %}
    {% if is_archive() %}
    {% set title = 'Archives' %}
    {% endif %}
    {% if is_category() %}
    {% set title = 'Category: ' + page.category %}
    {% endif %}
    {% if is_tag() %}
    {% set title = 'Tag: ' + page.tag %}
    {% endif %}

    <title>{% if title %}{{ title }}{% if page.current > 1 %}: {{ page.current }}{% endif %} - {% endif %}{{ config.title }}</title>

    {% if page.current > 1 or is_archive() or is_year() or is_month() or is_category() or is_tag() %}
    <meta name="robots" content="noindex">
    {% endif %}

    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1">

    {% if page.description %}
	<meta name="description" content="{{ page.description }}">
    {% elseif page.excerpt %}
    <meta name="description" content="{{ strip_html(page.excerpt) | trim }}">
    {% elseif page.content %}
    <meta name="description" content="{{ strip_html(page.content) | trim | replace('\n', ' ') | truncate(150, '') }}">
    {% elseif config.description and is_home() and page.current == 1 %}
    <meta name="description" content="{{ config.description }}">
    {% endif %}

    {% if config.author %}
    <meta name="author" content="{{ config.author }}">
    {% endif %}

    {% if is_post() %}
    <link rel="canonical" href="{{ url_for(page.permalink) }}">
    {% else %}
    <link rel="canonical" href="{{ url_for(page.current_url) }}">
    {% endif %}

    <style amp-custom>
        {% set styles = inlineCss(style.css) %}
        {{ styles | replace('@charset "UTF-8";', '', 'g') }}
    </style>

    {% if theme.favicon %}
    <link rel="icon" type="image/x-icon" href="{{ theme.favicon }}">
    {% endif %}

    {% if is_post() %}
    {% block jsonld %}{% endblock %}
    {% endif %}

    <style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
    <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
    <script async custom-element="amp-auto-ads" src="https://cdn.ampproject.org/v0/amp-auto-ads-0.1.js"></script>
    <script async src="https://cdn.ampproject.org/v0.js"></script>

    {% if theme.lightbox %}
    <script async custom-element="amp-image-lightbox" src="https://cdn.ampproject.org/v0/amp-image-lightbox-0.1.js"></script>
    {% endif %}
</head>
<body>
<amp-auto-ads
    type="adsense"
    data-ad-client="{{ config.adsense.pub }}">
  </amp-auto-ads>
    {% include '_partial/header.swig' %}

    <main role="main">
        <div id="content">
            {% block primary %}<p>Not Found</p>{% endblock %}
        </div>
    </main>

    {% include '_partial/footer.swig' %}

    {% if theme.lightbox %}
    <amp-image-lightbox id="lightbox1" layout="nodisplay"></amp-image-lightbox>
    {% endif %}

    {% if theme.google_analytics %}
    <amp-analytics type="googleanalytics" id="analytics1">
        <script type="application/json">
            {
                "vars": {
                    "account": "{{ theme.google_analytics }}"
                },
                "triggers": {
                    "trackPageview": {
                        "on": "visible",
                        "request": "pageview"
                    }
                }
            }
        </script>
    </amp-analytics>
    {% endif %}
</body>
</html>