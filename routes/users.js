var express = require('express');
var router = express.Router();
var Users=require('../classes/usersHandler').Users;
var jwt=require('jsonwebtoken');
var rolecheck=require('../vendor/func');
const axios = require('axios')

/* GET users listing. */
router.post('/register', async  (req, res, next) => {
  // console.log(req.body)
  let users= new Users(req.body)
  res.json(await users.register())
});
router.post('/login',async (req,res,next)=>{
  req.body.stuNumber=req.body.username
  let users=new Users(req.body)
  res.json(await users.login())
});
//小程序登录
router.post('/wechat',function (req,res,next) {
  // console.log(req.body)
  let openid = ''
  // let user=new Users(req.body)
  axios({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    method: 'get',
    params: {
      appid: 'wx629778dc0401a4a3',
      secret: '62a42ac6936eef38df5b75d267f1fbbb',
      js_code: req.body.code,
      grant_type: 'authorization_code'
    }
  }).then(async response => {
    // console.log(response.data)
    const body = {
      openid: response.data.openid
    }
    // return openid
    // req.body.openid = openid
    // console.log(openid)
    let user=new Users(body)
    res.json(await user.openId())
  })
  // console.log(req.body)
  // res.json({
  //   code: 20000,
  //   data: openid
  // })
});
router.all('/*',function (req,res,next){
  const token = req.headers['x-token'];
  // res.json(jwtfun.checkToken(token).error)
  // next()
  jwt.verify(token,process.env.PRIVATE_KEY,(error,info)=>{
    if (error) {
      return res.json({code:50000,message:'用户请求超时'})
      // return res.json(error)
    }
    req.userInfo = info;
    next()
    // res.json(req.userInfo)
  });
    // res.json(func.jsonCall(20000,jwtfun.checkToken(token).info))
  // let check=new Users(req.headers)
  // // console.log(req.headers)
  // res.json(check.check())
});
router.get('/userinfo',function (req, res, next) {
  console.log(req.userInfo)
  console.log(rolecheck(req.userInfo.role))
  res.json({
    code: 20000,
    data: {
      roles: [
          rolecheck(req.userInfo.role)
      ],
      introduction: "",
      avatar: "https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
      name: req.userInfo.realname
    }
  })
})
//用户修改自己信息
router.post('/updateuser',async (req,res,next)=>{
  req.body.uid=req.userInfo.uid
  let upUser=new Users(req.body)
  console.log(req.body)
  res.json(await upUser.updateUser())
});
//用户登出
router.get('/logout',function (req,res,next){
  res.json({
    code:20000,//前端释放token
    message:'注销成功'
  })
});
//社联删除用户
router.post('/deluser',async (req,res,next)=>{
  // console.log('router deluser')
  // req.body.role=req.userInfo.role
  // console.log(req.body)
  if (req.userInfo.role!==1){
    return res.json({code:50000,message:'没有权限'})
  }
  console.log(req.body)
  let deluser=new Users(req.body)
  res.json(await deluser.delUser())
});
//社联修改信息
router.post('/rootupdate',async (req,res,next)=>{
  if (req.userInfo.role!==1){
    return res.json({code:50000,message:'没有权限'})
  }
  console.log('rootupuser')
  let users=new Users(req.body)
  res.json(await users.updateUser())
});
//社联添加社联权限
router.post('/addroot',async (req,res,next)=>{
  if (req.userInfo.role!==1){
    return res.json({code:50000,message:'没有权限'})
  }
  let users=new Users(req.body)
  console.log(req.body)
  res.json(await users.addroot())
})
//用户修改自己密码
router.post('/repassword',async (req,res,next)=>{
  console.log('1',req.body)
  req.body.uid=req.userInfo.uid
  // let oldpassword=req.body.oldpassword
  let user=new Users(req.body)
  // req.body.password=req.body.oldpassword
  // console.log(req.body)
  // console.log((await user.verifyPassword()).code)
  // let result=await user.verifyPassword()
  // console.log(result)
  if (!await user.verifyPassword()){
    return  res.json({code:50000,message:'旧密码不正确'})
  }
  user.password=req.body.newpassword
  let rePwd=await user.rePassword()
  res.json(rePwd)
});
//社联修改密码  重点测试是否有权限
router.post('/rootrepwd',async (req,res,next)=>{
  if (req.userInfo.role!==1){
    return res.json({code:50000,message:'没有权限'})
  }
  let rootRe=new Users(req.body)
  res.json(await rootRe.rePassword())
});
//返回用户自身信息
router.get('/usersinfo',async (req,res,next)=>{
  req.body.uid=req.userInfo.uid
  console.log(req.body.uid)
  let userInfo=new Users(req.body)
  res.json(await userInfo.userInfos())
});
//社联查询用户列表
router.get('/userslist', async (req,res,next)=>{
  if (req.userInfo.role!==1){
    return res.json({code:50000,message:'没有权限'})
  }
  let userList=new Users(req.body)
  res.json(await userList.userList())
});
//社联查找某一用户信息
router.post('/rootuser',async (req,res,next)=>{
  if (req.userInfo.role!==1){
    return res.json({code:50000,message:'没有权限'})
  }
  let userinfo=new Users(req.body)
  // let userinfo=await userList.userList()
  // console.log(req.body)
  res.json(await userinfo.userInfos())
})
//社联搜索用户
router.post('/search', async (req,res,next)=>{
  if (req.userInfo.role!==1){
    return res.json({code:50000,message:'没有权限'})
  }
  let list=new Users(req.body)
  res.json(await list.search())
})
//echarts gender
router.post('/egender', async (req,res,next)=>{
  let userList=new Users(req.body)
  res.json(await userList.genderList())
});
module.exports = router;
