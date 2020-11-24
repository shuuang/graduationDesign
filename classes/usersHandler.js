var db = require('../dbutil/db').db;
var users = require('../models/users')(db);
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class Users {   //只处理用户表
    constructor(body) {
        this.uid = body.uid;
        this.stuNumber = body.stuNumber;
        this.password = body.password;
        this.realname = body.realname;
        this.email = body.email;
        this.wechat = body.wechat;
        this.qq = body.qq;
        this.phone = body.phone;
        this.home = body.home;
        this.birthday = body.birthday;
        this.uclass = body.uclass;
        this.nation = body.nation;
        this.gender = body.gender;
        this.role = body.role;
    }

    async register() {
        if (await users.count({
            where: {
                stuNumber: this.stuNumber
            }
        }) > 0) {
            return {'code': 50000, 'message': '已存在该用户'}
        }
        const encodePassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
        console.log(encodePassword)
        try {
            users.create({
                stuNumber: this.stuNumber,
                password: encodePassword,
                realname: this.realname,
                email: this.email,
                wechat: this.wechat,
                qq: this.qq,
                phone: this.phone,
                home: this.home,
                birthday: this.birthday,
                class: this.uclass,
                nation: this.nation,
                gender: this.gender,
                role: this.role
            })
            console.log(this.password)
            return {'code': 20000, 'message': '注册成功'}
        } catch (e) {
            console.log(e)
            return {code: 50000, message: '注册失败'}
        }
    }

    async login() {
        let userList = await users.findOne({
            where: {
                stuNumber: this.stuNumber
            }
        })
        // console.log(userList)
        if (userList == 0) {
            return {code: 50000, message: '用户名或者密码错误'}
        }
        if (!bcrypt.compareSync(this.password, userList.password)) {
            return {code: 50000, message: '登陆失败'}
        }
        // return {code:20000,'token':this.getToken(userList.uid,userList.realname,userList.role)}
        return {
            code: 20000,
            message: '登录成功',
            token: jwt.sign({
                uid: userList.uid,
                realname: userList.realname,
                role: userList.role
            }, process.env.PRIVATE_KEY, {expiresIn: process.env.EXPIRED})
        }
        // console.log(userList)
        // return userList
    }

    // getToken(uid,realname,role){
    //     return jwt.sign({uid,realname,role},process.env.PRIVATE_KEY,{expiresIn: process.env.EXPIRED})
    // }
    async updateUser() {
        console.log(this.uid)
        try{
            await users.update({
                realname:this.realname,
                email:this.email,
                wechat:this.wechat,
                qq: this.qq,
                phone: this.phone,
                home: this.home,
                birthday: this.birthday,
                class: this.uclass,
                nation: this.nation,
                gender: this.gender
            }, {
                where: {
                    uid: this.uid
                }
            })
            return {code:20000,messgae:'更新成功'};
        }catch (e){
            console.log(e)
            return {code:50000,messgae:'更新失败'};
        }
    }
    async delUser(){
        // let userList=
        try{
            await users.destroy({
                where:{
                    uid:this.uid
                }
            })
            return {code:20000,meaasge:'已删除用户'}
        }catch (e){
            console.log(e)
            return {code:50000,messgae:'删除失败'};
        }
        // console.log('delUser')
    }
    async addroot(){
        if (this.role!=0&&this.role!=1){
            return {code:50000,message:'请传入正确的数据'}
        }
        try{
            await users.update({
                role:this.role
            },{
                where:{
                    uid:this.uid
                }
            })
            return {code:20000,message:'修改权限成功'}
        }catch (e){
            console.log(e)
            return {code:50000,messgae:'修改权限失败'};
        }
    }
    async verifyPassword(){
        let userList = await users.findOne({
            where: {
                uid:this.uid
            }
        })
        // if (!bcrypt.compareSync(this.password, userList.password)){
        //     return {code:50000,messgae:'旧密码不正确'};
        // }
        return bcrypt.compareSync(this.password, userList.password);
    }
    async rePassword(){
        const encodePassword = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
        try{
            await users.update({
                password:encodePassword
            },{
                where:{
                    uid:this.uid
                }
            })
            return {code:20000,message:'修改密码成功'}
        }catch (e){
            console.log(e)
            return {code:50000,messgae:'修改密码失败'};
        }
    }
    async userInfo(){
        try{
            let userinfo=await users.findOne({
                attributes: { exclude: ['password'] },
                where:{
                    uid:this.uid
                }
            })
            return userinfo
        }catch (e){
            console.log(e)
            return {code:50000,messgae:'失败'};
        }
    }
    async userList(){
        try{
            let userList=await users.findAll({
                attributes: { exclude: ['password'] }
            })
            return userList
        }catch (e){
            console.log(e)
            return {code:50000,messgae:'失败'};
        }
    }
}

exports.Users = Users;