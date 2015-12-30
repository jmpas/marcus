(function () {
  var grid = document.querySelector('#grid');

  imagesLoaded(grid, init);

  function init () {
    var animHandler = new AnimOnScroll(document.getElementById( 'grid' ), {
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
