!function ($) {
  'use strict';

  $(function () {
    function hackDOM(path) {
      $('#main-wrapper .toolbar').remove();
      $('#main-wrapper .toc').remove();
      $('#main-wrapper .content-body').removeClass('content-body').addClass('content-single').addClass(function() {
      return 'content-' + (path.length > 1 ? path.split('/')[1] : 'home');
      });
    }

    var path = document.location.pathname;
    if(path === '/' || path.indexOf('download') >= 0) {
      hackDOM(path);
    }

    prettyPrint();

    /* Scrollspy */
    var navHeight = $('.navbar').outerHeight(true) + 10;
    $('body').scrollspy({
      target: '.bs-sidebar',
      offset: navHeight
    });

    /* Prevent disabled links from causing a page reload */
    $("li.disabled a").click(function() {
      event.preventDefault();
    });

    /* Adjust the scroll height of anchors to compensate for the fixed navbar */
    window.disableShift = false;
    var shiftWindow = function() {
      if (window.disableShift) {
        window.disableShift = false;
      } else {
        /* If we're at the bottom of the page, don't erronously scroll up */
        var scrolledToBottomOfPage = (
          (window.innerHeight + window.scrollY) >= document.body.offsetHeight);
        if (!scrolledToBottomOfPage) {
          scrollBy(0, -60);
        }
      }
    };

    if (location.hash) {
      shiftWindow();
    }
    window.addEventListener("hashchange", shiftWindow);

    /* Deal with clicks on nav links that do not change the current anchor link. */
    $("ul.nav a").click(function() {
      var href = this.href;
      var suffix = location.hash;
      var matchesCurrentHash = (href.indexOf(suffix, href.length - suffix.length) !== -1);
      if (location.hash && matchesCurrentHash) {
        /* Force a single 'hashchange' event to occur after the click event */
        window.disableShift = true;
        location.hash = '';
      }
    });

    console.log('UPYUN loves you！ :)');
  });

}(jQuery);