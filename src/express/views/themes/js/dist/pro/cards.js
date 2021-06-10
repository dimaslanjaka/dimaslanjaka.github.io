jQuery(function ($) {
  $(document).on('click.card', '.card', function (e) {
    var $this = $(this);
    var $reveal = $this.find('.card-reveal');

    if ($reveal.length) {
      var $clickedElem = $(e.target);
      var isTitleClicked = $clickedElem.is('.card-reveal .card-title');
      var isTitleIconClicked = $clickedElem.is('.card-reveal .card-title i');
      var isActivatorClicked = $clickedElem.is('.card .activator');
      var isActivatorIconClicked = $clickedElem.is('.card .activator i');

      if (isTitleClicked || isTitleIconClicked) {
        takeRevealDown($reveal);
      } else if (isActivatorClicked || isActivatorIconClicked) {
        takeRevealUp($reveal);
      }
    }
  });

  var takeRevealUp = function takeRevealUp(revealElem) {
    revealElem.css({
      display: 'block'
    }).velocity({
      translateY: '-100%'
    }, {
      duration: 300,
      queue: false,
      easing: 'easeInOutQuad'
    });
  };

  var takeRevealDown = function takeRevealDown(revealElem) {
    revealElem.velocity({
      translateY: 0
    }, {
      duration: 225,
      queue: false,
      easing: 'easeInOutQuad',
      complete: function complete() {
        revealElem.css({
          display: 'none'
        });
      }
    });
  };

  $('.rotate-btn').on('click', function () {
    $(this).closest('.card').toggleClass('flipped');
  });
  $(window).on('load', function () {
    var $rotatingCards = $('.card-rotating');
    $rotatingCards.each(function () {
      var $this = $(this);
      var $cardWrapper = $this.parent();
      var $front = $this.find('.front');
      var $back = $this.find('.back');
      var $frontHeight = $this.find('.front').outerHeight();
      var $backHeight = $this.find('.back').outerHeight();
      if ($frontHeight > $backHeight) $($cardWrapper, $back).height($frontHeight);else if ($frontHeight < $backHeight) $($cardWrapper, $front).height($backHeight);else $($cardWrapper).height($backHeight);
    });
  });
  $('.card-share > a').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('share-expanded').parent().find('div').toggleClass('social-reveal-active');
  });
  $('.map-card').on('click', function () {
    $(this).find('.card-body').toggleClass('closed');
  });
});