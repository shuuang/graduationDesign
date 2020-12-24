var express = require('express');
var router = express.Router();
var Club = require('../classes/clubHandler').Club;
var Users = require('../classes/usersHandler').Users;
var jwt = require('jsonwebtoken');
var uploadFile=require('../vendor/uploadFile').upload;

//文件上传
var fs = require('fs');
var multer = require('multer');
// // var uploadFolder=multer({dest:'public/upload/'});
// var path=require('path');
//
// var uploadFolder = './public/upload/';
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, uploadFolder);   // 保存的路径，备注：需要自己创建
//     },
//     filename: function (req, file, cb) {
//         // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
//         let fileextname=path.extname(file.originalname);
//         cb(null, Date.now()+fileextname);
//     }
// });
// var upload = multer({storage: storage})

// router.post('/login',async (req,res,next)=>{
//     let users=new Users(req.body)
//     res.json(await users.login())
// });
router.all('/*',function (req,res,next) {
    const token = req.headers['x-token'];
    // res.json(jwtfun.checkToken(token).error)
    // next()
    jwt.verify(token, process.env.PRIVATE_KEY, (error, info) => {
        if (error) {
            return res.json({code: 50000, message: '用户请求超时'})
            // return res.json(error)
        }
        req.userInfo = info;
        next()
        // res.json(req.userInfo)
    });
});
//增加社团申请
router.post('/appClub',uploadFile.single('appImage'),  async (req, res, next) => {
    // console.log('appclub start')
    var file = req.file;
    // req.body.appImage=req.file.path
    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);
    // console.log(req.body)
    req.body.appImage=file.path;
    // console.log('2')
    // console.log(req.body)
    let appclub = new Club(req.body);
    appclub.appStatus=0;
    console.log(req.body)
    // console.log('3')
    res.json(await appclub.appClub())
    // res.json({ret_code: '0'})
});
//社联审核增加社团
router.get('/checkappclub', async (req, res, next) => {
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    req.query.uid=req.userInfo.uid
    let checkapp = new Club(req.query);
    res.json(await checkapp.checkAppClub())
});
//社联添加社团
router.post('/rootaddclub',async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    let rootAppClub=new Club(req.body)
    res.json(await rootAppClub.appClub())
});
//社联更改社团信息
router.post('/rootupdateclub',async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    let update=new Club(req.body)
    console.log(req.body)
    res.json(await update.updateClub())
});
//社联删除社团
router.get('/delclub',async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    let del=new Club(req.query);
    res.json(await del.delClub());
});
//社联查找社团
router.post('/clublist',async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    // req.body.appStatus=req.body.checkStatus
    let clubList=new Club(req.body)
    // console.log(req.query,res.params)
    res.json(await clubList.clubList())
});
//社联搜索社团
router.post('/search', async (req,res,next)=>{
    if (req.userInfo.role!==1){
        return res.json({code:50000,message:'没有权限'})
    }
    let list=new Club(req.body)
    res.json(await list.search())
});
//社联搜索社团信息
router.post('/clubinfo', async (req,res,next)=>{
    if (req.userInfo.role!==1){
        return res.json({code:50000,message:'没有权限'})
    }
    let list=new Club(req.body)
    res.json(await list.clubInfo())
});
//  上传文件
router.post('/upload',uploadFile.single('file'),  function (req, res, next) {
    var file = req.file;
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    console.log(req.file)
    console.log(file)
    res.json({
        code: 20000,
        data: file
    })
});
// //社联审核社团列表
// router.get('/checkclublist',async (req,res,next)=>{
//     if (req.userInfo.role !== 1) {
//         return res.json({code: 50000, message: '没有权限'})
//     }
//     let clubList=new Club(req.body)
//     res.json(await clubList.checkClubList())
// });
// //社联审核社团列表
// router.get('/nopassclublist',async (req,res,next)=>{
//     if (req.userInfo.role !== 1) {
//         return res.json({code: 50000, message: '没有权限'})
//     }
//     let clubList=new Club(req.body)
//     res.json(await clubList.noPass())
// });

//上传图片测试
// router.post('/upload', uploadFile.single('logo'),function (req, res, next) {
//     var file = req.file;
//     req.body.appImage=req.file.path
//     console.log(req.body)
//     // uploadFile.single('logo')
//     // var uploadFolder = './public/upload/';
//     console.log('文件类型：%s', file.mimetype);
//     console.log('原始文件名：%s', file.originalname);
//     console.log('文件大小：%s', file.size);
//     console.log('文件保存路径：%s', file.path);
//     let upload=new Club(req.body)
//     res.json(upload.appClub())
//     // res.send({ret_code: '0'});
// });
//
// router.get('/form', function (req, res, next) {
//     var form = fs.readFileSync('./test.html', {encoding: 'utf8'});
//     res.send(form);
// });
module.exports = router;