{% extends 'base.swig' %}

{% block primary %}

{% set pipe = {pagination: config.tag} %}
{% include '_partial/archive.swig' with pipe %}

{% include '_partial/pagination.swig' %}

{% include '_widget/category.swig' %}
{% include '_widget/tag.swig' %}

{% endblock %}