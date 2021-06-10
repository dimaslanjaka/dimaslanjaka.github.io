{% extends 'base.swig' %}

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
                "url": "{{ theme.schema.image.url }}",
                "width": {{ theme.schema.image.width }},
                "height": {{ theme.schema.image.height }}
            },
            "author": {
                "@type": "Person",
                "name": "{{ config.author }}"
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


{% block primary %}
    {% set pipe = {item: page, index: false} %}
    {% include '_partial/article.swig' with pipe %}
{% endblock %}
