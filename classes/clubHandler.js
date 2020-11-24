var db = require('../dbutil/db').db;
var club = require('../models/club')(db);

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
    }
    async appClub(){
        try{
            await club.create({
                // cid:this.cid,
                cname:this.cname,
                teacher:this.teacher,
                creatAt:this.creatAt,
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
        try{
            await club.update({
                appStatus:this.appStatus
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
    async updateClub(){
        try{
            console.log(this.cname)
            await club.update({
                cname:this.cname,
                teacher:this.teacher,
                introduction:this.introduction
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
                }
            })
            return clubList
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
}

exports.Club=Club;