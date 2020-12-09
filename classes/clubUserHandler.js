var db = require('../dbutil/db').db;
var club=require('../models/club')(db);
var users=require('../models/users')(db);
var clubuser=require('../models/clubuser')(db);
const { Op } = require("sequelize");

class ClubUser{
    constructor(body) {
        this.cuid = body.cuid;
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
            //要查询用户的cid
            let findusercid=await clubuser.findOne({
                where:{
                    cuid:this.cuid
                }
            })
            // console.log(findusercid)
            //当前用户的cid
            let usercid = await clubuser.findAll({
                where:{
                    uid:this.uid
                }
            })
            for (let i=0;i<usercid.length;i++){
                // console.log(usercid[i])
                // return usercid[i]
                // console.log(usercid[i].cid==findusercid.cid)
                if (usercid[i].cid==findusercid.cid){
                    console.log('1')
                    await clubuser.update({
                        privilege:this.privilege
                    },{
                        where:{
                            cuid:findusercid.cuid
                        }
                    })
                    return {code:20000,message:'修改成功'}
                }
            }
            return {code:50000,message:'没有权限'}
            // console.log(usercid)
            // usercid.forEach(value=>{
            //     console.log(value)
            // })

            // if (usercid.cid==findusercid.cid){
            //     return '是本社团社长'
            // }
            // return usercid
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    // async oldCid(){
    //     let oldPrs=await clubuser.findOne({
    //         where:{
    //             cuid:this.cuid
    //         }
    //     });
    //     return oldPrs
    // }
    // async newCid(){
    //     let newPrs=await clubuser.findOne({
    //         where:{
    //             cuid:this.cuid
    //         }
    //     })
    //     return newPrs
    // }
    // async setOldPrs(){
    //     try{
    //         //更新老部长权限
    //         await clubuser.update({
    //             privilege:this.privilege
    //         },{
    //             where:{
    //                 cuid:this.cuid
    //             }
    //         })
    //         //设置新部长权限
    //     }catch (e){
    //     console.log(e)
    //     return {code: 50000, message: '失败'}
    //     }
    // }
    async setPresident(){
        try{
            //cuid的社团
            let cuidclub=await clubuser.findOne({
                where:{
                    cuid:this.cuid
                }
            })
            console.log(cuidclub.cid)
            //改老部长权限
            await  clubuser.update({
                privilege:0
            },{
                where:{
                    [Op.and]: [{ privilege: 2 }, { cid: cuidclub.cid }],
                }
            })
            //改新部长权限
            await clubuser.update({
                privilege:2
            },{
                where:{
                    cuid:this.cuid
                }
            })
            return {code:20000,message:'修改成功'}
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    //用户列出自己所加社团
    async userClubList(){
        try{
            return await clubuser.findAll({
                where:{
                    [Op.and]:[{uid:this.uid},{status:1}]
                }
            })
        }catch (e){
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
    //列出社团成员
    async clubuserList(){
        try{
            //得到社长cid
            let prscid=await clubuser.findOne({
                where:{
                    [Op.and]:[{cid:this.cid},{uid:this.uid},{privilege:2}]
                }
            })
            if (prscid==0){
                return {code:50000,message:'获取列表失败'}
            }

            return await clubuser.findAll({
                where:{
                    [Op.and]:[{cid:this.cid},{status:1}]
                }
            })
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '失败'}
        }
    }
}
exports.ClubUser=ClubUser;
