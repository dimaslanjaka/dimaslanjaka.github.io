{% extends '_layout.swig' %}

{% block jsonld %}
    <script type="application/ld+json">
        {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "mainEntityOfPage":{
                "@type":"WebPage",
                "@id":"{{ config.url }}"
            },
            "headline": "{{ page.title }}",
            "image": {
                "@type": "ImageObject",
                "url": "{{ page.cover|default(get_setting('default_cover')) }}",
                "width": {{ theme.schema.image.width }},
                "height": {{ theme.schema.image.height }}
            },
            "author": {
                "@type": "Person",
                "name": "{{ config.author.name }}"
            },
            "publisher": {
                "@type": "Organization",
                "name": "{{ theme.schema.publisher.name }}",
                "logo": {
                    "@type": "ImageObject",
                    "url": "{{ theme.schema.publisher.logo.url }}",
                    "width": {{ theme.schema.publisher.logo.width }},
                    "height": {{ theme.schema.publisher.logo.height }}
                }
            },
            "datePublished": "{{ page.date.toDate().toISOString() }}",
            "dateModified": "{{ page.updated.toDate().toISOString() }}"
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