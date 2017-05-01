window.Masonry = require('masonry-layout');
window.classie = require('classie');
require('script-loader!./modernizr');
window.imagesLoaded = require('imagesLoaded');
require('./animOnScroll');
require('holderjs');
window.PhotoSwipe = require('photoswipe');
window['PhotoSwipeUI_Default'] = require('../../node_modules/photoswipe/src/js/ui/photoswipe-ui-default');

require('./photoswipe-from-dom')('.my-gallery');

var grid = document.querySelector('#grid');

imagesLoaded(grid, init);

function init() {
  var header = document.querySelector('header');

  header.classList.add('top');

  var animHandler = new AnimOnScroll(grid, {
    minDuration: 0.4,
    maxDuration: 0.7,
    viewportFactor: 0.2
  });

  setTimeout(function() { animHandler._onScrollFn(); }, 2000);

  setTimeout(function() {
    animHandler._onScrollFn();
    document.body.classList.remove('loading');

    setTimeout(function() {
      document.querySelector('.navigation-container.delay').classList.remove('delay');
    }, 1000);
  }, 3000);
}

window.addEventListener('unload', function() { window.scrollTo(0,0); });
