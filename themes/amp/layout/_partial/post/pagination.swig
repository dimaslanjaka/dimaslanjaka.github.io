{% if !page.posts %}
    {% if page.prev ||  page.next %}
        <nav class="pagination">
            {% if page.prev %}
            <a href="{{ url_for(page.prev.path) }}" class="pagination__prev">{{ __('prev') }}</a>
            {% endif %}
            {% if page.next %}
            <a href="{{ url_for(page.next.path) }}" class="pagination__next">{{ __('next') }}</a>
            {% endif %}
        </nav>
    {% endif %}
{% endif %}
