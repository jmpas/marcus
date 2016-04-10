'use strict';

const easyimg = require('easyimage');
const fs = require('fs');

fs.readdir('src/assets/images', (err, images) => {
  if (err) throw err;

  images.forEach(image => {
    if (image.search(/\.min/) > -1) return;

    easyimg.info(`src/assets/images/${image}`)
      .then(info => {
        let width, height, max = 450,
            imgArr = image.split('.'),
            ext = imgArr[1],
            imgName = imgArr[0];
        
        if (info.width > info.height) {
          height = 450;
          width = info.width * (450 / info.height);
        } else {
          width = 450;
          height = info.height * (450 / info.width);
        }
        
        return easyimg.resize({
          src: `src/assets/images/${image}`,
          width,
          height,
          dst: `src/assets/images/${imgName}.min.${ext}`
        });
      })
      .then(_ => console.log('Done.'));
  });
});
