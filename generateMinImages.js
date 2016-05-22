'use strict';

const easyimg = require('easyimage');
const fs = require('fs');

fs.readdir('src/assets/images', (err, images) => {
  if (err) throw err;

  images.forEach(image => {
    if (image.search(/\.min/) > -1) return;

    easyimg.info(`src/assets/images/${image}`)
      .then(info => {
        let width, height, max = 350,
            imgArr = image.split('.'),
            ext = imgArr[1],
            imgName = imgArr[0];
        
        if (info.width > info.height) {
          height = max;
          width = info.width * (max / info.height);
        } else {
          width = max;
          height = info.height * (max / info.width);
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
