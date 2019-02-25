const path = require('path');
const fs = require('fs');
const imageSize = require('image-size');

const IMGS_PATH = path.resolve(__dirname, 'src/images');
const { images: imagesInfo } = require(path.resolve(__dirname, 'src/_images.json'));

const images = fs.readdirSync(IMGS_PATH);

const promises = images.filter(name => /\.(.+)$/.test(name)).reduce((promises, image) => {
  const imgInfo = imagesInfo.find(({ img: { name } }) => name === image) || { title: '', desc: '', type: ''}
  
  return [
    ...promises,
    sizeOf(path.join(IMGS_PATH, image))
      .then(sizeInfo => ({
        ...imgInfo,
        img: { 
          ...imagesInfo.img,
          ...sizeInfo,
          path: `images/${image}`
        }
      }))
  ]
}, []);

Promise.all(promises)
  .then(data => fs.writeFileSync('src/_images.json', JSON.stringify({ images: data }, null, 2)))
  .then(() => console.info('Images data updated!'))
  .catch(err => console.error(err));

function sizeOf(img) {
  console.log(img)
  return new Promise((resolve, reject) => {
    imageSize(
      img,
      (err, dimensions) => err ? reject(err) : resolve(dimensions))
  });
}
