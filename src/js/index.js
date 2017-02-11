require('../../node_modules/photoswipe/dist/default-skin/default-skin.css');
require('../../node_modules/photoswipe/dist/photoswipe.css');
require('../styl/index.styl');
var masonry = require('masonry-layout');
var classie = require('classie');
require('script-loader!./modernizr');
var imagesLoaded = require('imagesLoaded');
require('script-loader!./animOnScroll');
require('holderjs');
var photoswipe = require('photoswipe');
var photoswipeUIDefault = require('../../node_modules/photoswipe/src/js/ui/photoswipe-ui-default');
var initPhotoSwipeFromDOM = require('./photoswipe-from-dom');

window.Masonry = masonry;
window.classie = classie;
window.imagesLoaded = imagesLoaded;
window.PhotoSwipe = photoswipe;
window['PhotoSwipeUI_Default'] = photoswipeUIDefault;

// execute above function
initPhotoSwipeFromDOM('.my-gallery');

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
  }, 3000);
}

window.addEventListener('unload', function() { window.scrollTo(0,0); });
