const multer = require('multer')
const path = require('path');
const uploadPath = 'uploads/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
  });

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// , fileFilter: fileFilter
const upload = multer({ storage: storage, fileFilter: fileFilter });


module.exports.upload = upload;