'use strict';

var bjson = require('bjson');
var fs = require('fs');
var sizeOf = require('image-size');

var data = bjson('src/_harp.json');

fs.readdir('src/assets/images', function (err, images) {
  
  if (err) {
    throw err;
  }

  images.forEach(function (image) {
    var info = sizeOf('src/assets/images/' + image),
        i, n, job;
    
    for (i = 0, n = data.globals.jobs.length; i < n; i++) {
      job = data.globals.jobs[i];
      
      if (job.img.path === 'assets/images/' + image) {
        job.img.info = info;
      } else if (job.minImg.path === 'assets/images/' + image) {
        job.minImg.info = info;
      }
    }
  });

  console.info('Images data updated!');
});
