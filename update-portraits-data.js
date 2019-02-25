const path = require('path');
const fs = require('fs');
const imageSize = require('image-size');

const data = JSON.parse(fs.readFileSync('src/_portraits.json'));
const IMGS_PATH = path.resolve(__dirname, 'src/images/portraits');

const promises = data.images.reduce((promises, image) => {
  
  const imgInfo = sizeOf(`${IMGS_PATH}/${image}`)
    .then(info => {
      image.img = Object.assign(
        {},
        image.img,
        info,
        {path: `images/portraits/${img.name}`}
      );
    });

  return promises.concat([imgInfo]);
}, []);

Promise.all(promises)
  .then(() => fs.writeFileSync('src/_portraits.json', JSON.stringify(data, null, 2)))
  .then(() => console.info('Images data updated!'))
  .catch(err => console.error(err));

function sizeOf(img) {
  return new Promise((resolve, reject) => {
    imageSize(
      path.resolve(img),
      (err, dimensions) => err ? reject(err) : resolve(dimensions))
  });
}
