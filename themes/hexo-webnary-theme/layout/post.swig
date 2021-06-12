{% extends '_layout.swig' %}

{% block jsonld %}
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage":{
                "@type":"WebPage",
                "@id":"{{ config.url }}{{ url_for(page.path) }}"
            },
            "headline": "{{ page.title }}",
            "image": {
                "@type": "ImageObject",
                "url": "{{ page.cover|default(get_setting('default_cover')) }}",
                "width": {{ config.schema.image.width|"140" }},
                "height": {{ config.schema.image.height|"140" }}
            },
            "author": {
                "@type": "Person",
                "name": "{{ config.author.name|"Admin" }}"
            },
            "publisher": {
                "@type": "Organization",
                "name": "{{ config.schema.publisher.name|"WMI" }}",
                "logo": {
                    "@type": "ImageObject",
                    "url": "{{ config.logo }}",
                    "width": {{ config.schema.publisher.logo.width|"700" }},
                    "height": {{ config.schema.publisher.logo.height|"628" }}
                }
            },
            "datePublished": "{{ page.date.toDate().toISOString() }}",
            "dateModified": "{{ page.updated.toDate().toISOString() }}",
            "description": "{{ get_text_html(page.excerpt) }}",
            "articleBody": {{ escape_with_json(trim_whitespace(get_text_html(page.more), " ")) }}
        }
    </script>
{% endblock %}

{% block pageCss %}
    {{ css('scss/views/page/post') }}
{% endblock %}

{% block header %}
    {% include './_partial/common/small-header.swig' %}
{% endblock %}

{% block main %}
    {% include './_partial/post/main.swig' %}
{% endblock %}

{% block pagejs %}
    {{ js('js/page/post.js') }}
{% endblock %}

{% block other %}
    {% include './_partial/common/comment.swig' %}
    {% include './_partial/post/post-statistical.swig' %}
{% endblock %}
