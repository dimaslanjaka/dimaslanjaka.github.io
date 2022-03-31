{% extends 'base.swig' %}

{% block primary %}
{% for post in page.posts %}
{% set pipe = {item: post, index: true, get_excerpt: excerpt} %}
{% include '_partial/article.swig' with pipe %}
{% endfor %}

{% include '_partial/pagination.swig' %}

{% endblock %}