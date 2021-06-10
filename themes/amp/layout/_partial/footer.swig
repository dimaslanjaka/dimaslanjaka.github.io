<footer class="footer" role="contentinfo">
    © {{ moment(Date.now()).format('YYYY') }}
    {% if config.author %}
    {{ config.author }}
    {% else %}
    {{ config.title }}
    {% endif %}.
    <small>Powered by <a href="http://hexo.io" target="_blank">Hexo</a>. Theme by <a href="https://github.com/hirofumii/hexo-theme-amp" target="_blank">Amp</a>.</small>
</footer>