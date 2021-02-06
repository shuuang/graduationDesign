var express = require('express');
var router = express.Router();
var Activity = require('../classes/activityHandler').Activity;
var jwt = require('jsonwebtoken');


router.get('/useractivitylist',async (req,res,next)=>{
    // console.log(req.query)
    let list=new Activity(req.query)
    res.json(await list.rootActivityList())
});
router.get('/userdetailactivity',async (req,res,next)=>{
    console.log(req.query)
    let info=new Activity(req.query)
    res.json({
        code: 20000,
        data: await info.activityInfo()
    })
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
//社联发布活动
router.post('/addactivity', async (req, res, next) => {
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    // var file=req.file
    // req.body.aafile=req.file.path
    // console.log('文件类型：%s', file.mimetype);
    // console.log('原始文件名：%s', file.originalname);
    // console.log('文件大小：%s', file.size);
    // console.log('文件保存路径：%s', file.path);
    req.body.department = 1
    req.body.review = 0
    req.body.astatus = 1
    req.body.cid = 33
    let activity = new Activity(req.body)
    res.json(await activity.addActivity())
});
//社团申请活动
router.post('/appactivity',async (req, res, next) => {
    // let userinfo=new UserInfo(req.userInfo.uid)
    // console.log(req.body.cid,req.userInfo.uid)
    // let cur=await userinfo.userInfo()
    // res.json(cur)
    // console.log(cur)
    req.body.uid = req.userInfo.uid
    req.body.department = 0
    req.body.astatus = 0
    req.body.review = 0
    let activity = new Activity(req.body)
    let userinfo = await activity.userInfos()
    if (!userinfo) {
        return res.json({code: 50000, message: '不能申请'})
    }
    if (userinfo.privilege >= 1) {
        // var file=req.file
        // req.body.aafile=req.file.path
        // console.log('文件类型：%s', file.mimetype);
        // console.log('原始文件名：%s', file.originalname);
        // console.log('文件大小：%s', file.size);
        // console.log('文件保存路径：%s', file.path);
        return res.json(await activity.addActivity())
    }
    res.json({code: 5000, message: '没权限'})
    // res.json(await activity.addActivity())
});
//社联审核活动
router.post('/checkactivity', async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    let activity=new Activity(req.body)
    res.json(await activity.checkAct())
});
//社联查询所有活动
router.get('/rootactivitylist',async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    let list=new Activity(req.query)
    res.json(await list.rootActivityList())
})
//社团成员查询本社团的
router.get('/clubactivitylist',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    let activity = new Activity(req.query)
    let userinfo = await activity.userInfos()
    if (!userinfo) {
        return res.json({code: 50000, message: '不能查询'})
    }
    // if (userinfo.status >= 1) {
    //     return res.json(await activity.clubActivityList())
    // }
    // res.json({code: 5000, message: '不能查询'})
    res.json(await activity.clubActivityList())
});
//查询社联发布的
router.get('/activitylist',async(req,res,next)=>{
    // req.query.uid=req.userInfo.uid
    let list=new Activity(req.query)
    // let userinfo=await list.userInfo()
    // console.log(userinfo)
    //cid和uid
    // if (!userinfo) {
    //     return res.json({code: 50000, message: '不能报名'})
    // }
    // if (userinfo.privilege > 1) {
    //     return res.json(await list.activityList())
    // }
    res.json(await list.activityList())
    // res.json({code: 5000, message: '不能查询'})
});
//社联查询活动信息
router.get('/detailactivity',async (req,res,next)=>{
    // if (req.userInfo.role !== 1) {
    //     return res.json({code: 50000, message: '没有权限'})
    // }
    let info=new Activity(req.query)
    res.json({
        code: 20000,
        data: await info.activityInfo()
    })
});
//修改活动信息
router.post('/updateactivity',async (req,res,next)=>{
    // if (req.userInfo.role !== 1) {
    //     return res.json({code: 50000, message: '没有权限'})
    // }
    let update=new Activity(req.body)
    res.json(await update.updateInfo())
});
//删除活动
router.get('/delactivity',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    let del=new Activity(req.query)
    let acitivityinfo=await del.activityInfo()
    if (acitivityinfo == null){
        return res.json({code: 50000, message: '没有这个活动'})
    }
    // console.log('1')
    req.query.cid=acitivityinfo.cid
    // console.log('2')
    console.log(req.query)
    // console.log('3')
    let useri=new Activity(req.query)
    let userinfo=await useri.userInfos()
    // console.log('4')
    // console.log(userinfo)
    if (req.userInfo.role == 1) {
        return res.json(await useri.delActivity())
    }
    if (userinfo.privilege==2){
        return res.json(await useri.delActivity())
    }
    return res.json({code: 50000, message: '不是社长没有权限'})
});

module.exports = router;