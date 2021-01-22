var express=require('express');
var router = express.Router();
var ActivityLog=require('../classes/activityLogHandler').ActivityLog;
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
//增加社团记录
router.post('/addlog',async (req,res,next)=>{
    req.body.uid=req.userInfo.uid
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
//根据社团去查
router.get('/loglist',async (req,res,next)=>{
    let list=new ActivityLog(req.query)
    res.json(await list.logList())
});
module.exports=router;