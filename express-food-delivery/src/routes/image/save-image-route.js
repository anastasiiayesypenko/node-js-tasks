const multer = require('multer');
const fs = require('fs');
const path = require('path');
const util = require('util');
const upload = multer({
    dest: 'uploads/'
})

const saveImageMultipart = (req, res) => {

    const fileObject = req.file;

    const userId = req.body.userId;
    console.log(fileObject, userId);
    res.end('image')
};

// добавляем промежуточный обработчик для post-multipart запросов
module.exports = () => [upload.single('avatar'), saveImageMultipart];