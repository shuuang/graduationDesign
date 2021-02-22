var db = require('../dbutil/db').db;
var activity = require('../models/activity')(db);
var clubuser = require('../models/clubuser')(db);
var club = require('../models/club')(db);
// var clubuserhandler = require('../classes/clubUserHandler').ClubUser;
const {Op} = require("sequelize");

class Activity{
    constructor(body) {
        // super(uid)
        this.aid = body.aid;
        this.uid=body.uid;
        this.aName = body.aName;
        this.startDate = body.startDate;
        this.endDate = body.endDate;
        this.aIntroduction = body.aIntroduction;
        this.cid = body.cid;
        this.location = body.location;
        this.department = body.department;
        this.aafile = body.aafile;
        this.review = body.review;
        this.astatus = body.astatus;
        try{
            activity.belongsTo(club,{
                foreignKey: 'cid',
                as: 'club'
            })
        }catch (e) {

        }
    }

    async addActivity() {
        try {
            await activity.create({
                aName: this.aName,
                startDate: this.startDate,
                endDate: this.endDate,
                aIntroduction: this.aIntroduction,
                cid: this.cid,
                location: this.location,
                department: this.department,
                aafile: this.aafile||'public\\upload\\1612861150731.jpg',
                review: this.review,
                astatus: this.astatus
            })
            return {code: 20000, message: '成功'};
        } catch (e) {
            console.log(e)
            return {code: 50000, message: '失败'};
        }
    }
    //查询当前用户是不是本社团的
    async userInfos() {
        try {
            // console.log(this.aid)
            return await clubuser.findOne({
                where: {
                    [Op.and]: [{uid: this.uid}, {cid: this.cid},{status:1}]
                }
            })
        } catch (e) {
            console.log(e)
            // return {code: 50000, message: '错误'};
            return false;
        }
    }

    //社联审核活动
    async checkAct(){
        try{
            await activity.update({
                astatus:this.astatus
            },{
                where:{
                    aid:this.aid
                }
            })
            return {code:20000,message:'审核完成'}
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    //社联查询所有活动
    async rootActivityList(){
        try{
            return {
                code: 20000,
                data: await activity.findAll({
                    where:{
                        astatus: this.astatus
                    },
                    include:[{
                        model: club,
                        as: 'club'
                    }]
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    //社团成员查询本社团的
    async clubActivityList(){
        try{
            return {
                code: 20000,
                data: await activity.findAll({
                    where:{
                        cid:this.cid
                    }
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    // 查询社联发布的
    async activityList(){
        try{
            return {
                code: 20000,
                data: await activity.findAll({
                    where:{
                        [Op.and]:[{department: 1},{astatus: 1}]
                    }
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    //社联查询所有活动
    // async rootActivityList(){
    //     try{
    //         return  await activity.findOne({
    //             where: {
    //                 aid: this.aid
    //             }
    //         })
    //     }catch (e) {
    //         console.log(e)
    //         return {code: 50000, messgae: '错误'};
    //     }
    // }
    //修改活动信息
    async updateInfo(){
        try{
            await activity.update({
                aName:this.aName,
                startDate:this.startDate,
                endDate:this.endDate,
                aIntroduction:this.aIntroduction,
                location:this.location
            },{
                where:{
                    aid:this.aid
                }
            })
            return {code: 20000, message: '修改成功'}
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    //查询活动信息
    async activityInfo(){
        try{
            return await activity.findOne({
                where:{
                    aid:this.aid
                },
                include:[{
                    model: club,
                    as: 'club'
                }]
            })
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    //删除活动
    async delActivity(){
        try{
            await activity.destroy({
                where:{
                    aid:this.aid
                }
            })
            return {code: 20000, message: '删除成功'}
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    async search(){
        try{
            let list = await activity.findAll({
                where:{
                    aName: {[Op.like]: '%'+ this.aName + '%'}
                },
                include:[{
                    model: club,
                    as: 'club'
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

// class UserInfo extends Activity{
//     constructor(uid) {
//         super(); // 调用父类的constructor(x, y)
//         this.uid=uid
//     }
//     //查询当前用户信息
//     async userInfo(){
//         try{
//             console.log(this.cid,this.uid)
//             return await clubuser.findOne({
//                 where:{
//                     [Op.and]:[{uid:this.uid},{cid:super.cid}]
//                 }
//             })
//
//         }catch (e) {
//             console.log(e)
//             return {code:50000,messgae:'错误'};
//         }
//     }
// }
// exports.UserInfo=UserInfo;
exports.Activity = Activity;