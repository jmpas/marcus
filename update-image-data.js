const path = require('path');
const fs = require('fs');
const easyimg = require('easyimage');

const data = JSON.parse(fs.readFileSync('src/_images.json'));
const IMGS_PATH = path.resolve(__dirname, 'dist/images');

fs.readdir(IMGS_PATH, (err, images) => {
  if (err) {
    throw err;
  }

  const promises = images.map(image => {
    return easyimg.info(`${IMGS_PATH}/${image}`)
      .then(info => {
        for (let i = 0, n = data.images.length; i < n; i++) {
          const obj = data.images[i];
          const newInfo = Object.assign({}, info, {path: `images/${info.path.split('/').pop()}`});

          if (obj.img.name === image) {
            obj.img = newInfo;
            break;
          } else if (obj.minImg.name === image) {
            obj.minImg = newInfo;
            break;
          }
        }
      });
  });

  Promise.all(promises)
    .then(() => fs.writeFileSync('src/_images.json', JSON.stringify(data, null, 2)))
    .then(() => console.info('Images data updated!'))
    .catch(err => console.error(err));
});
