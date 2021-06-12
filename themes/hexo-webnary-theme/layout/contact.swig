{% extends '_layout.swig' %}

{% block pageCss %}
    {{ css('scss/views/page/contact') }}
{% endblock %}

{% block main %}
    {% include './_partial/contact/main.swig' %}
{% endblock %}
