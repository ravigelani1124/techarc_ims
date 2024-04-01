const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const fileController = require('../controllers/FileController');

// Route for uploading files
router.post('/upload', upload.single('file'), fileController.uploadFile);

// Route for retrieving file URL by ID
router.get('/:id', fileController.getFileUrlById);

module.exports = router;
