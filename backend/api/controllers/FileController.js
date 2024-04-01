const File = require('../models/File');
const aws = require('aws-sdk');
const config = require('../utils/config');
const multer = require('multer');
const s3 = new aws.S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
    region: config.AWS_REGION
});

const uploadFile = (req, res) => {
    const file = req.file;

    // Upload file to S3 bucket
    const params = {
        Bucket: config.AWS_BUCKET_NAME,
        Key: file.filename,
        Body: file.buffer
    };
    s3.upload(params, (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Error uploading file to S3' });
        }

        // Save file metadata to MongoDB
        const fileMetadata = {
            filename: file.originalname,
            path: file.path,
            url: data.Location // S3 object URL
        };
        File.create(fileMetadata)
            .then((file) => {
                res.json({ success: true, file });
            })
            .catch((err) => {
                res.status(500).json({ error: 'Error saving file metadata' });
            });
    });
};

const getFileUrlById = (req, res) => {
    const fileId = req.params.id;

    File.findById(fileId)
        .then((file) => {
            if (!file) {
                return res.status(404).json({ error: 'File not found' });
            }
            res.json({ success: true, fileUrl: file.url });
        })
        .catch((err) => {
            res.status(500).json({ error: 'Error retrieving file URL' });
        });
};

module.exports = {
    uploadFile,
    getFileUrlById
};
