var db = require('../dbutil/db').db;
var activity=require('../models/activity')(db);
var club = require('../models/club')(db);
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
        try{
            activitylog.belongsTo(club,{
                foreignKey: 'cid',
                as: 'club'
            })
        }catch (e) {

        }
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
            return {code: 50000, message: '错误'};
        }
    }
    async addLog(){
        try{
            let data=new Date()
            console.log(data.toLocaleDateString())
            const time = data.toLocaleDateString()
            await activitylog.create({
                aid:this.aid,
                img:this.img,
                video:this.video,
                alintroduction:this.alintroduction,
                aldate: time,
                alcounts:0,
                cid:this.cid
            })
            return {code: 20000, message: '成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '失败'};
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
            return {code: 20000, message: '修改成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '失败'};
        }
    }
    async delLog(){
        try{
            await activitylog.destroy({
                where:{
                    alid:this.alid
                }
            })
            return {code: 20000, message: '删除成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '失败'};
        }
    }
    //根据社团查
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
            return {code: 50000, message: '失败'};
        }
    }
    //根据活动查
    async logListforactivity(){
        try{
            return {
                code: 20000,
                data: await activitylog.findAll({
                    where:{
                        aid:this.aid
                    }
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '失败'};
        }
    }
    //查询活动记录
    async searchLog(){
        try{
            return {
                code: 20000,
                data: await activitylog.findOne({
                    where:{
                        alid:this.alid
                    },
                    include:[{
                        model: club,
                        as: 'club'
                    }]
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '失败'};
        }
    }
}
exports.ActivityLog=ActivityLog;