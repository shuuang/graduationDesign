var express=require('express');
var router = express.Router();
var clubmember=require('../classes/clubMemberHandler').ClubMember;
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
//增加人员记录验证，是否同一社团，社长
router.get('/addmember',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    const time = new Date()
    req.query.year=time.getFullYear()
    let member=new clubmember(req.query)
    let userinfo=await member.clubUser()
    // console.log(userinfo)
    console.log('1', req.query)
    if (!userinfo) {
        return res.json({code: 50000, message: '不能执行'})
    }
    if (userinfo.privilege > 1) {

        // console.log('2', req.query)
        let num=await member.numValue()
        console.log(num)
        req.query.num=num
        let nummember=new clubmember(req.query)
        return res.json(await nummember.addMember())
    }
    return res.json({code:50000,message:'没权限'})
});
//查询数据
router.get('/memberlist',async (req,res,next)=>{
    let list=new clubmember(req.query)
    res.json(await list.memberList())
})

module.exports=router;