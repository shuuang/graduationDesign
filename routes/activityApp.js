var express=require('express');
var router = express.Router();
var ActivityApp=require('../classes/activityappHandler').ActivityApp;
var jwt = require('jsonwebtoken');

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
//社长报名活动
router.post('/signactivity', async (req,res,next)=>{
    req.body.uid=req.userInfo.uid
    let actapp=new ActivityApp(req.body)
    let userinfo=await actapp.clubUser()
    // console.log(userinfo)
    //cid和uid
    if (!userinfo) {
        return res.json({code: 50000, message: '不能报名'})
    }
    //cid和aid
    let queryList=await actapp.queryList()
    if (queryList){
        return res.json({code: 50000, message: '不能重新报名'})
    }
    if (userinfo.privilege > 1) {
        return res.json(await actapp.addActApp())
    }
    res.json({code: 5000, message: '没权限'})
});
//社联获取列表
router.get('/rootsignlist',async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    let list=new ActivityApp(req.query)
    res.json(await list.signList())
});
//社长取消报名
router.get('/delsign',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    let actapp=new ActivityApp(req.query)
    let userinfo=await actapp.clubUser()
    // console.log(userinfo)
    if (userinfo.privilege > 1) {
        return res.json(await actapp.delSign())
    }
    res.json({code: 5000, message: '没权限'})
});
//社长获取某一社团的报名状态
router.get('/prsclubsign',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    let actapp=new ActivityApp(req.query)
    let userinfo=await actapp.clubUser()
    // console.log(userinfo)
    if (userinfo.privilege > 1) {
        return res.json(await actapp.prsclubSign())
    }
    res.json({code: 5000, message: '没权限'})
})
module.exports=router;