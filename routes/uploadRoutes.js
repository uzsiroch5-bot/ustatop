const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, '..', 'uploads/'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Single file (for avatar)
router.post('/single', upload.single('image'), (req, res) => {
  res.send({
    url: `/${req.file.path.replace(/\\/g, '/')}`,
  });
});

// Multiple files (for portfolio)
router.post('/multiple', upload.array('images', 10), (req, res) => {
  const urls = req.files.map((file) => `/${file.path.replace(/\\/g, '/')}`);
  res.send({ urls });
});

module.exports = router;
