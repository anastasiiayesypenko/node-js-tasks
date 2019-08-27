const multer = require('multer');
// const upload = multer({
//     dest: 'upload/'
// });

// const type = upload.single('image');

const saveImageMultipart = (req, res) => {
    // const image = req && req.file;
    // const target_path = 'upload/' + req.file;
    // console.log(target_path);
    res.setHeader('Content-Type', 'multipart/form-data');
    res.status(200);
    res.send('images')

};

module.exports = () => [type, saveImageMultipart];