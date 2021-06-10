{% if page.archive && !page.year && page.prev === 0 %}
	{% include '../_widget/search.swig' %}
{% endif%}

<div class="archive">
	{% if page.category %}
		<h2 class="archive-title category">{{ page.category }}</h2>
	{% elseif page.tag %}
		<h2 class="archive-title tag">{{ page.tag }}</h2>
	{% elseif page.archive && page.month %}
		<h2 class="archive-title">{{ page.year + '-' + page.month}}</h2>
	{% elseif page.archive && page.year%}
		<h2 class="archive-title">{{ page.year }}</h2>
	{% else %}
		<h2 class="archive-title">{{ __('archive') }}</h2>
	{% endif %}

	{% for item in page.posts %}
	<article class="{{ item.layout }}">
		<div class="post-content">
			<header>
                <div class="article__header__meta">
                    <time class="article__header__meta__time" datetime="{{ item.date.toDate().toISOString() }}">
                        {{ item.date.format(config.date_format) }}
                    </time>
				</div>
				{% if item.link %}
				{% if item.title %}
                <h1 class="article__header__title link"><a href="{{ url_for(item.link) }}" target="_blank">{{ item.title }}</a></h1>
				{% else %}
                <h1 class="article__header__title link"><a href="{{ url_for(item.link) }}" target="_blank">{{ item.link }}</a></h1>
				{% endif %}
				{% else %}
                <h1 class="article__header__title"><a href="{{ url_for(item.path) }}">{{ item.title }}</a></h1>
				{% endif %}
			</header>
		</div>
	</article>
	{% endfor %}
</div>
