const multer = require('multer');
const upload = multer({
    dest: 'upload/'
});

const type = upload.single('image');

const saveImageMultipart = (req, res) => {
    const image = req.file && req.file.pathname;
    const target_path = 'upload/' + image;
    console.log(req.file);
    res.setHeader('Content-Type', 'multipart/form-data');
    res.status(200);
    res.send('images')

};

module.exports = () => (type, saveImageMultipart);