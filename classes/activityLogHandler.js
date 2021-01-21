var db = require('../dbutil/db').db;
var activity=require('../models/activity')(db);
var clubuser=require('../models/clubuser')(db);
var activitylog=require('../models/activitylog')(db);
const {Op} = require("sequelize");

class ActivityLog{
    constructor(body) {
        this.alid=body.alid;
        this.aid=body.aid;
        this.uid=body.uid;
        this.img=body.img;
        this.video=body.video;
        this.alintroduction=body.alintroduction;
        this.aldate=body.aldate;
        this.alcounts=body.alcounts;
        this.cid=body.cid;
    }
    //查看用户信息
    async clubUser(){
        try{
            return await clubuser.findOne({
                where: {
                    [Op.and]: [{uid: this.uid}, {cid: this.cid}]
                }
            })
        } catch (e) {
            console.log(e)
            return {code: 50000, messgae: '错误'};
        }
    }
    async addLog(){
        try{
            let data=new Date()
            // console.log(data.toLocaleDateString())
            await activitylog.create({
                aid:this.aid,
                img:this.img,
                video:this.video,
                alintroduction:this.alintroduction,
                aldate:data.toLocaleDateString(),
                alcounts:0,
                cid:this.cid
            })
            return {code: 20000, messgae: '成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    async editLog(){
        try{
            await activitylog.update({
                alid:this.alid,
                aid:this.aid,
                img:this.img,
                video:this.video,
                alintroduction:this.alintroduction,
                cid:this.cid
            },{
                where:{
                    alid:this.alid
                }
            })
            return {code: 20000, messgae: '修改成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    async delLog(){
        try{
            await activitylog.destroy({
                where:{
                    alid:this.alid
                }
            })
            return {code: 20000, messgae: '删除成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    async logList(){
        try{
            return {
                code: 20000,
                data: await activitylog.findAll({
                    where:{
                        cid:this.cid
                    }
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
}
exports.ActivityLog=ActivityLog;