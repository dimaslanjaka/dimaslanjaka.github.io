<!-- Small Header -->
<header class="page__small-header page__header--small">
    <nav class="page__navbar">
        <div class="page__container navbar-container">
            <a class="page__logo" href="{{ url_for('/') }}" title="{{ get_setting('title') }}" alt="{{ get_setting('title') }}">
                <img src="{{ get_setting('logo') }}" alt="{{ get_setting('title') }}">
            </a>

        <!--<nav class="page__nav">
                <ul class="nav__list clearfix">
                    {% for item in get_setting('menu') %}
                        {% set name = __('menu.' + loop.key) %}    Was
                        <li class="nav__item">
                            <a href="{{ item|capitalize  }}" alt="{{ name|capitalize  }}" title="{{ name|capitalize  }}">{{ name|capitalize  }}</a>
                        </li>
                    {% endfor %}
                    <li class="nav__item">
                        <a href="{{ item|capitalize  }}" alt="{{ name|capitalize  }}" title="{{ name|capitalize  }}">{{ name|capitalize  }}</a>
                    </li>
                </ul>
            </nav>     --> 

            <nav class="page__nav">
                <ul class="nav__list clearfix">
                    <li class="nav__item">
                        <a href="/" alt="Home" title="Home">Home</a>
                    </li>
                    <li class="nav__item">
                        <a href="/archives" alt="Archives" title="Archives">Archives</a>
                    </li>
                    <li class="nav__item">
                        <a href="/contact" alt="Contact" title="Contact">Contact</a>
                    </li>
                    <li class="nav__item">
                        <a href="/about" alt="About" title="About">About</a>
                    </li>
                </ul>
            </nav>

            <button class="page__menu-btn" type="button">
                <i class="iconfont icon-menu"></i>
            </button>
        </div>
    </nav>
</header>