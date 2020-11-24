var db = require('../dbutil/db').db;
var club=require('../models/club')(db);
var users=require('../models/users')(db);
var clubuser=require('../models/clubuser')(db);

class ClubUser{
    constructor(body) {
        this.cuid=body.cuid;
        this.uid=body.uid;
        this.cid=body.cid;
        this.privilege=body.privilege;
        this.status=body.status;
        this.uappyear=body.uappyear;
    }
    async addClubUser(){
        // clubuser.hasOne(users)
        // users.belongsTo(clubuser)
        var data=new Date()
        try{
            await clubuser.create({
                uid:this.uid,
                cid:this.cid,
                privilege:0,
                status:0,
                uappyear:data.getFullYear()
            })
            return {code:20000,message:'成功'}
        }catch (e){
            console.log(e)
            return {code:50000,messgae:'失败'};
        }
    }
    async checkUser(){
        // 1 申请加入社团通过  2 未通过
        if (this.status!=1&&this.status!=2){
            return {code: 50000, message: '错误'}
        }
        try{
            await clubuser.update({
                status:this.status
            },{
                where:{
                    uid:this.uid
                }
            })
            return {code: 20000, message: '成功'}
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    async upPrivilege(){
        try{
            await clubuser.update({
                privilege:this.privilege
            },{
                where:{
                    uid:this.uid,
                    cid:this.cid
                }
            })
            return {code: 20000, message: '成功'}
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
}
exports.ClubUser=ClubUser;
