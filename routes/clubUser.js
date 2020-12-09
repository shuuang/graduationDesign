var express = require('express');
var router = express.Router();
var ClubUser = require('../classes/clubUserHandler').ClubUser;
var jwt = require('jsonwebtoken');

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
//用户申请加入社团
router.post('/addclubuser',async (req,res,next)=>{
    req.body.uid=req.userInfo.uid
    let adduser=new ClubUser(req.body)
    res.json(await adduser.addClubUser())
});
//社长/部长审核
router.get('/checkuser', async (req, res, next) => {
    let checkuser = new ClubUser(req.query);
    console.log(req.query)
    res.json(await checkuser.checkUser())
});
//社长提升普通用户为部长
router.get('/upprivilege',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    let privilege=new ClubUser(req.query)
    console.log(req.query)
    // console.log("query:")
    // console.log(req.query)
    res.json(await privilege.upPrivilege())
});
//社联提升普通用户为社长
router.get('/setpresident',async (req,res,next)=>{
    let prs=new ClubUser(req.query)
    // prs.cuid=req.query.oldcuid
    // let op=await prs.oldCid()
    // console.log(op)
    // prs.cuid=req.query.newcuid
    // let np=await prs.newCid()
    res.json(await prs.setPresident())
});
//用户列出自己所加社团
router.get('/userclublist',async (req,res,next)=>{
    req.query.uid=req.userInfo.uid
    let list=new ClubUser(req.query)
    console.log(req.query)
    res.json(await list.userClubList())
});
//社长列出本社团所有成员
router.get('/prsclubuserlist',async (req,res,next)=>{

    req.query.uid=req.userInfo.uid;
    let list=new ClubUser(req.query)
    console.log(req.userInfo)
    res.json(await list.clubuserList())
});
module.exports = router;