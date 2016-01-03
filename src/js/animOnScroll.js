/**
 * animOnScroll.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2013, Codrops
 * http://www.codrops.com
 */
;(function (window) {
  'use strict';

  var docElem = window.document.documentElement;

  function getViewportH () {
    var client = docElem['clientHeight'],
        inner = window['innerHeight'];
    
    if (client < inner)
      return inner;
    else
      return client;
  }

  function scrollY () {
    return window.pageYOffset || docElem.scrollTop;
  }

  // http://stackoverflow.com/a/5598797/989439
  function getOffset (el) {
    var offsetTop = 0, offsetLeft = 0;

    do {
      if (!isNaN(el.offsetTop)) {
        offsetTop += el.offsetTop;
      }
      if (!isNaN(el.offsetLeft)) {
        offsetLeft += el.offsetLeft;
      }
    } while(el = el.offsetParent)

    return {
      top : offsetTop,
      left : offsetLeft
    }
  }

  function inViewport( el, h ) {
    var elH = el.offsetHeight,
      scrolled = scrollY(),
      viewed = scrolled + getViewportH(),
      elTop = getOffset(el).top,
      elBottom = elTop + elH,
      // if 0, the element is considered in the viewport as soon as it enters.
      // if 1, the element is considered in the viewport only when it's fully inside
      // value in percentage (1 >= h >= 0)
      h = h || 0;

    return (elTop + elH * h) <= viewed && (elBottom - elH * h) >= scrolled;
  }

  function extend (a, b) {
    for (var key in b) { 
      if (b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    
    return a;
  }

  function onScrollHandler () {
    if (!this.didScroll) {
      this.didScroll = true;

      setTimeout(function () {
        this._scrollPage();
      }.bind(this), 60);
    }
  }

  function AnimOnScroll (el, options) {  
    this.el = el;
    this.options = extend(this.defaults, options);

    this._onScrollFn = onScrollHandler.bind(this);
    this._init();
  }

  // IE Fallback for array prototype slice
  if (navigator.appVersion.indexOf('MSIE 8') > 0) {
    var _slice = Array.prototype.slice;

    Array.prototype.slice = function () {
      var result, start, end, i;

      if (this instanceof Array) {
        return _slice.apply(this, arguments);
      } else {
        result = [];
        start = ( arguments.length >= 1 ) ? arguments[0] : 0;
        end = ( arguments.length >= 2 ) ? arguments[1] : this.length;

        for (i=start; i<end; i++) {
          result.push(this[i]);
        }

        return result;
      }
    };
  }

  AnimOnScroll.prototype = {
    defaults: {
      // Minimum and a maximum duration of the animation (random value is chosen)
      minDuration: 0,
      maxDuration: 0,
      // The viewportFactor defines how much of the appearing item has to be visible in order to trigger the animation
      // if we'd use a value of 0, this would mean that it would add the animation class as soon as the item is in the viewport. 
      // If we were to use the value of 1, the animation would only be triggered when we see all of the item in the viewport (100% of it)
      viewportFactor: 0
    },
    _init: function () {
      this.items = Array.prototype.slice.call(document.querySelectorAll('#' + this.el.id + ' > .grid-item'));
      this.itemsCount = this.items.length;
      this.itemsRenderedCount = 0;
      this.didScroll = false;

      var self = this;

      imagesLoaded(this.el, function () {
        // initialize masonry
        self.msnry = new Masonry(self.el, {
          itemSelector: '.grid-item',
          transitionDuration: 0
        });
        
        if (Modernizr.cssanimations) {
          // animate on scroll the items inside the viewport
          window.addEventListener('scroll', self._onScrollFn, false);
          window.addEventListener('resize', function () {
            self._resizeHandler();
          }, false);
        }

      });
    },
    _scrollPage: function () {
      var self = this;

      this.items.forEach(function (el, i) {
        var img, imgDesk, imgMobile;

        if (!classie.has(el, 'shown') && !classie.has(el,'animate') && inViewport(el, self.options.viewportFactor)) {
          img = el.querySelector('img');

          if (classie.has(img, 'lazy-load')) {
            imgDesk = img.getAttribute('data-src');
            imgMobile = img.getAttribute('data-src-mobile');

            if (imgMobile && screen.width <= 500) {
              img.src = imgMobile;
            } else {
              img.src = imgDesk;
            }
          }

          imagesLoaded(el, function () {
            var perspY = scrollY() + getViewportH() / 2;
            
            self.msnry.layout();

            self.el.style.WebkitPerspectiveOrigin = '50% ' + perspY + 'px';
            self.el.style.MozPerspectiveOrigin = '50% ' + perspY + 'px';
            self.el.style.perspectiveOrigin = '50% ' + perspY + 'px';

            self._checkTotalRendered();

            if (self.options.minDuration && self.options.maxDuration) {
              var randDuration = ( Math.random() * ( self.options.maxDuration - self.options.minDuration ) + self.options.minDuration ) + 's';

              el.style.WebkitAnimationDuration = randDuration;
              el.style.MozAnimationDuration = randDuration;
              el.style.animationDuration = randDuration;
            }
            
            classie.add(el, 'animate');
          });
        }

      });

      this.didScroll = false;
    },
    _resizeHandler: function () {
      var self = this;
      
      function delayed () {
        self._scrollPage();
        self.resizeTimeout = null;
      }

      if (this.resizeTimeout) {
        clearTimeout(this.resizeTimeout);
      }

      this.resizeTimeout = setTimeout(delayed, 1000);
    },
    _checkTotalRendered: function () {
      ++this.itemsRenderedCount;
      if (this.itemsRenderedCount === this.itemsCount) {
        window.removeEventListener('scroll', this._onScrollFn);
      }
    }
  }

  // add to global namespace
  window.AnimOnScroll = AnimOnScroll;

})(window);
