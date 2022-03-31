<header class="header{% if is_home() %} isHome{% endif %}" role="banner">
    <div class="header__logo">
		{% if is_home() %}
			<h1 class="header__logo__mainHeadline">
				<a href="{{ config.root }}">{{ config.title }}</a>
			</h1>
			{% if config.subtitle %}
				<h2 class="header__logo__subHeadline">
					{{ config.subtitle }}
				</h2>
			{% endif %}
		{% else %}
			<div class="header__logo__mainHeadline">
				<a href="{{ config.root }}">{{ config.title }}</a>
			</div>
		{% endif %}
	</div>
    <nav class="header__menu">
        <ul class="header__menu__list">
	        {% for menu in theme.menu %}
				<li class="header__menu__list__item">
					<a href="{{ menu }}">{{ __(loop.key) }}</a>
				</li>
	        {% endfor %}
	    </ul>
	</nav>
</header>