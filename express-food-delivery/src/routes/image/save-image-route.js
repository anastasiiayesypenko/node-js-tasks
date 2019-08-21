const multer = require('multer');
const upload = multer({
    dest: 'upload/'
});
const fs = require('fs');

const type = upload.single('image');

const saveImageMultipart = (req, res) => {

    const tmpPath = req && req.file;

    const target_path = 'uploads/' + req.file.originalname;
    //MulterError: Unexpected field
    res.setHeader('Content-Type', 'multipart/form-data');
    res.status(200);
    res.send('images')

};

module.exports = () => [type, saveImageMultipart];