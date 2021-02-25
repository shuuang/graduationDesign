var express=require('express');
var router = express.Router();
var ActivityComment=require('../classes/activityCommentHandler').ActivityComment;
var jwt = require('jsonwebtoken');

router.get('/commentlist',async (req,res,next)=>{
    let list=new ActivityComment(req.query)
    // console.log(req.query)
    let alist=await list.commentList()
    // console.log(alist)
    // res.json(alist)
    res.json(alist)
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
//增加评论
router.post('/addcomment',async (req,res,next)=>{
    req.body.uid=req.userInfo.uid
    const num = new ActivityComment(req.body)
    const result = await num.commentList()
    // console.log(result.data.length)
    req.body.alcounts = result.data.length
    let com=new ActivityComment(req.body)
    res.json(await com.addComment())
});
//删除评论
router.get('/delcomment',async (req,res,next)=>{
    if (req.userInfo.role !== 1) {
        return res.json({code: 50000, message: '没有权限'})
    }
    let del=new ActivityComment(req.query)
    res.json(await del.delComment())
});
//总评论数量
router.get('/allcomment',async (req,res,next)=>{
    let list=new ActivityComment(req.query)
    let alist=await list.allComment()
    res.json(alist)
});
module.exports=router;