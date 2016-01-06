(function () {
  var grid = document.querySelector('#grid');

  imagesLoaded(grid, init);

  function init () {
    var header = document.querySelector('header');
    header.classList.add('top');

    var animHandler = new AnimOnScroll(grid, {
      minDuration: 0.4,
      maxDuration: 0.7,
      viewportFactor: 0.2
    });

    setTimeout(function () {
      animHandler._onScrollFn();
    }, 2000);
    setTimeout(function () {
      animHandler._onScrollFn();
    }, 2600);
  }

})();
