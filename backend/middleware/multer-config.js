const multer = require('multer');

//Bibliothèque de mimy types
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    //supprime les eespaces dans le nom et les remplaces par des underscores
    const name = file.originalname.split(' ').join('_');
    
    const extension = MIME_TYPES[file.mimetype];

    //Callback name + la date en milisecondes points extension via bibliothèque mime types
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');