<footer class="footer" role="contentinfo">
    © {{ moment(Date.now()).format('YYYY') }}
    {% if config.author %}
    {{ author(post) || author(config) }}
    {% else %}
    {{ config.title }}
    {% endif %}.
    <small>Powered by <a href="http://hexo.io" target="_blank" rel="nofollow">Hexo</a>. Theme by <a href="https://github.com/hirofumii/hexo-theme-amp" target="_blank" rel="nofollow">Amp</a>.</small>
</footer>