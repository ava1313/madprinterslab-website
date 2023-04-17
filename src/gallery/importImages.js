/* node importImages.js*/


const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const galleryPath = './gallery.js';

const askQuestion = (question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const appendToGallery = (data) => {
  const fileData = fs.readFileSync(galleryPath, 'utf8');
  const startIdx = fileData.indexOf('[');
  const endIdx = fileData.indexOf('];') + 1;
  const existingData = fileData.substring(startIdx, endIdx);

  const newData = existingData.slice(0, -1) + ',\n' + JSON.stringify(data, null, 2) + existingData.slice(-1);

  const updatedFileData = fileData.replace(existingData, newData);
  fs.writeFileSync(galleryPath, updatedFileData, 'utf8');
};

(async () => {
  const urls = (await askQuestion('Enter image URLs (separated by commas): ')).split(',').map(url => url.trim());
  const category = await askQuestion('Enter category: ');
  const name = await askQuestion('Enter name: ');
  const tags = (await askQuestion('Enter tags (separated by commas): ')).split(',').map(tag => tag.trim());

  const newItem = {
    urls,
    category,
    name,
    tags
  };

  appendToGallery(newItem);
  console.log('Item added to gallery.js.');

  rl.close();
})();
