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

})
module.exports = router;