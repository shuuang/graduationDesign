var express=require('express');
var router = express.Router();
var ActivityLog=require('../classes/activityLogHandler').ActivityLog;
var jwt = require('jsonwebtoken');
var uploadFile=require('../vendor/uploadFile').upload;

//  多文件上传
router.post('/logupload',uploadFile.array('img',10),  function (req, res, next) {
    const token = req.headers['x-token'];
    // console.log(req.body)
    // req.body.img = req.body.formData.img
    var file = req.files;
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    // console.log(req.files)
    // console.log(file)
    res.json({
        code: 20000,
        file:token,
        data: file
    })
});
//根据社团去查
router.get('/loglist',async (req,res,next)=>{
    let list=new ActivityLog(req.query)
    res.json(await list.logList())
});
//根据活动去查
router.get('/loglistforactivity',async (req,res,next)=>{
    let list=new ActivityLog(req.query)
    res.json(await list.logListforactivity())
});
//查询活动记录
router.get('/searchlog',async (req,res,next)=>{
    let list=new ActivityLog(req.query)
    res.json(await list.searchLog())
});
router.all('/*', function (req, res, next) {
    const token = req.headers['x-token'];
    // res.json(jwtfun.checkToken(token).error)
    // next()
    jwt.verify(token, process.env.PRIVATE_KEY, (error, info) => {
        if (error) {
            return res.json({code: 50000, message: '用户请求超时'})
            // return res.json(error)
        }
        req.userInfo = info;
        console.log(req.userInfo)
        next()
        // res.json(req.userInfo)
    });
});
//增加社团记录
router.post('/addlog',async (req,res,next)=>{
    req.body.uid=req.userInfo.uid
    // console.log(req.body.img)
    req.body.img = JSON.stringify(req.body.img)
    req.body.video = JSON.stringify(req.body.video)
    console.log(req.body)
    let addlog=new ActivityLog(req.body)
    let user=await addlog.clubUser()
    if (!user){
        return res.json({code: 50000, message: '不能记录'})
    }
    res.json(await addlog.addLog())
});
//编辑活动记录
router.post('/editlog',async (req,res,next)=>{
    req.body.uid=req.userInfo.uid
    let editlog=new ActivityLog(req.body)
    let user=await editlog.clubUser()
    if (!user){
        return res.json({code: 50000, message: '不能修改'})
    }
    res.json(await editlog.editLog())
});
//社长删除活动
router.get('/dellog',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    let dellog=new ActivityLog(req.query)
    let userinfo=await dellog.clubUser()
    // console.log(userinfo)
    if (userinfo.privilege > 1) {
        return res.json(await dellog.delLog())
    }
    res.json({code: 5000, message: '没权限'})
});
module.exports=router;