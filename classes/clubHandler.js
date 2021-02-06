var db = require('../dbutil/db').db;
var club = require('../models/club')(db);
var users = require('../models/users')(db);
var clubuser=require('../models/clubuser')(db);
const {Op} = require("sequelize");

class Club {
    constructor(body) {
        this.cid=body.cid;
        this.cname=body.cname;
        this.teacher=body.teacher;
        this.creatAt=body.creatAt;
        this.introduction=body.introduction;
        this.file=body.file;
        this.uid=body.uid;
        this.img=body.img;
        this.appImage=body.appImage;
        this.appStatus=body.appStatus;
        this.duty=body.duty
        try{
            club.belongsTo(users,{
                foreignKey: 'uid',
                as: 'users'
            })
        }catch (e) {

        }
    }
    async appClub(){
        try{
            let data=new Date()
            await club.create({
                // cid:this.cid,
                cname:this.cname,
                teacher:this.teacher,
                creatAt:data.toLocaleDateString(),
                introduction:this.introduction,
                file:this.file,
                uid:this.uid,
                img:this.img,
                appImage:this.appImage,
                appStatus:this.appStatus,
                duty:this.duty
            })
            return {code: 20000, message: '成功'}
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    async checkAppClub(){
        // 1 申请社团通过  2 未通过
        if (this.appStatus!=2&&this.appStatus!=1){
            return {code: 50000, message: '错误'}
        }
        var data=new Date()
        try{
            await club.update({
                appStatus:this.appStatus
            },{
                where:{
                    cid:this.cid
                }
            }),
            await clubuser.create({
                uid:this.uid,
                cid:this.cid,
                privilege:2,
                status:2,
                uappyear:data.getFullYear()
            })
            return {code: 20000, message: '成功'}
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    async updateClub(){
        try{
            console.log(this.cname)
            await club.update({
                cname:this.cname,
                teacher:this.teacher,
                introduction:this.introduction,
                appImage:this.appImage
            },{
                where:{
                    cid:this.cid
                }
            })
            return {code: 20000, message: '成功'}
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    async delClub(){
        try{
            await club.destroy({
                where:{
                    cid:this.cid
                }
            })
            return {code: 20000, message: '成功'}
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    async clubList(){
        try{
            let clubList=await club.findAll({
                where:{
                    appStatus:this.appStatus
                },
                include:[{
                    model: users,
                    as: 'users'
                }]
            })
            return {
                code: 20000,
                data: clubList
            }
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    // 搜索社团
    async search(){
        try{
            let list = await club.findAll({
                where:{
                    cname: {[Op.like]: '%'+ this.cname + '%'}
                }
            })
            return {
                code: 20000,
                data: list
            }
        }catch (e){
            console.log(e)
            return {code:50000,message:'失败'};
        }
    }
    //查找单个社团信息
    async clubInfo(){
        try{
            let list = await club.findOne({
                where:{
                    cid: this.cid
                },
                include:[{
                    model: users,
                    as: 'users'
                }]
            })
            return {
                code: 20000,
                data: list
            }
        }catch (e){
            console.log(e)
            return {code:50000,message:'失败'};
        }
    }
}

exports.Club=Club;