<article class="article {{ item.layout }}">
	<header>
	    {% if item.layout != 'page' %}
            <div class="article__header__meta">
                <time class="article__header__meta__time" datetime="{{ item.date.toDate().toISOString() }}">
                    {{item.date.format(config.date_format) }}
                </time>
	        </div>
	    {% endif %}
	    {% include 'post/title.swig' %}
	</header>
    <div class="article__entry">
	    {% if item.excerpt && index %}
	    {{ item.excerpt }}
	    {% elseif index %}
			{{ get_excerpt(item.content) }}
			{% else %}
			{{ item.content }}
	    {% endif %}
	</div>
    <footer class="article__footer">
	    {% include 'post/category.swig' %}
	    {% include 'post/tag.swig' %}
	</footer>
    {% include 'post/pagination.swig' %}
</article>