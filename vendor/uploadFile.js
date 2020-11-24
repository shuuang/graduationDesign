//文件上传
var fs = require('fs');
var multer = require('multer');
// var uploadFolder=multer({dest:'public/upload/'});
var path=require('path');

// var uploadFolder = './public/upload/';
var upload = multer({storage:multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/upload/');   // 保存的路径，备注：需要自己创建
        },
        filename: function (req, file, cb) {
            // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
            // console.log('123')
            let fileextname=path.extname(file.originalname);
            cb(null, Date.now()+fileextname);
        }
    })
})
exports.upload = upload