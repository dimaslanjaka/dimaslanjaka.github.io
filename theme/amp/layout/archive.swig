{% extends 'base.swig' %}

{% block primary %}

{% set pipe = {pagination: config.archive, index: true} %}
{% include '_partial/archive.swig' with pipe %}

{% include '_partial/pagination.swig' %}

{% if page.archive && !page.year %}
    {% include '_widget/category.swig' %}
    {% include '_widget/tag.swig' %}
{% endif%}

{% endblock %}