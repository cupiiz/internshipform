const path = require('path');
const fs = require('fs');

const clearFile = filePath => {
  filePath = path.join(__dirname, `uploads/${filePath}` );
  fs.unlink(filePath, err => console.log(err));
};

exports.clearFile = clearFile;