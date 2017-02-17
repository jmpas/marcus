const path = require('path');
const fs = require('fs');
const imageSize = require('image-size');

const data = JSON.parse(fs.readFileSync('src/_images.json'));
const IMGS_PATH = path.resolve(__dirname, 'dist/images');

const promises = data.images.reduce((promises, image) => {
  const pImg = sizeOf(`${IMGS_PATH}/${image.img.name}`)
    .then(info => {
      image.img = Object.assign(
        {},
        image.img,
        info,
        {path: `images/${image.img.name}`}
      );
    });

  const pMinImg = sizeOf(`${IMGS_PATH}/${image.minImg.name}`)
    .then(info => {
      image.minImg = Object.assign(
        {},
        image.minImg,
        info,
        {path: `images/${image.minImg.name}`}
      );
    });

  return promises.concat([pImg, pMinImg]);
}, []);

Promise.all(promises)
  .then(() => fs.writeFileSync('src/_images.json', JSON.stringify(data, null, 2)))
  .then(() => console.info('Images data updated!'))
  .catch(err => console.error(err));

function sizeOf(img) {
  return new Promise((resolve, reject) => {
    imageSize(
      path.resolve(img),
      (err, dimensions) => err ? reject(err) : resolve(dimensions))
  });
}
