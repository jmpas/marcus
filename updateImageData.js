'use strict';

const bjson = require('bjson');
const fs = require('fs');
const easyimg = require('easyimage');

const data = JSON.parse(fs.readFileSync('src/_harp.json'));

fs.readdir('src/assets/images', (err, images) => {
  const promises = [];

  if (err) {
    throw err;
  }

  images.forEach((image) => {
    let promise = easyimg.info(`src/assets/images/${image}`)
      .then(info => {
        let i, n, job;
        
        for (i = 0, n = data.globals.jobs.length; i < n; i++) {
          job = data.globals.jobs[i];
          
          if (job.img.path === 'assets/images/' + image) {
            job.img.info = info;
          } else if (job.minImg.path === 'assets/images/' + image) {
            job.minImg.info = info;
          }
        }
      });

    promises.push(promise);
  });
  
  Promise.all(promises)
    .then(() => fs.writeFileSync('src/_harp.json', JSON.stringify(data, null, 2)))
    .then(() => console.info('Images data updated!'));
});
