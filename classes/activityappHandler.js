var db = require('../dbutil/db').db;
var activityapp=require('../models/activityapp')(db);
var clubuser=require('../models/clubuser')(db);
var activity=require('../models/activity')(db);
var club=require('../models/club')(db);
const {Op} = require("sequelize");

class ActivityApp{
    constructor(body) {
        this.aaid=body.aaid;
        this.cid=body.cid;
        this.aaName=body.aaName;
        this.aaConnect=body.aaConnect;
        this.aafile=body.aafile;
        this.aid=body.aid;
        this.uid=body.uid;
        try{
            activityapp.belongsTo(club,{
                foreignKey: 'cid',
                as: 'club'
            })
        }catch (e) {
            
        }
    }
    //查询用户信息
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
    //查询数据库是否存在同一社团同一活动
    async queryList(){
        try{
            return await activityapp.findOne({
                where:{
                    [Op.and]:[{cid:this.cid},{aid:this.aid}]
                }
            })
        }catch (e){
            console.log(e)
            return {code: 50000, messgae: '错误'};
        }
    }
    // async addActApp(){
    //     try{
    //         await activityapp.create({
    //             cid:this.cid,
    //             aaName:this.aaName,
    //             aaConnect:this.aaConnect,
    //             aafile:this.aafile,
    //             aid:this.aid
    //         })
    //         return {code: 20000, messgae: '成功'};
    //     }catch (e) {
    //         console.log(e)
    //         return {code: 50000, messgae: '失败'};
    //     }
    // }
    //是否到截止时间
    async addActApp(){
        try{
            let add = await activity.findOne({
                where:{
                    aid:this.aid
                }
            })
            if (!add){
                return {code: 50000, message: '没有这个活动'};
            }
            let nowdata=new Date()
            let enddata=add.endDate.replace(/-/g,'/')
            // console.log(nowdata)
            console.log(nowdata.toLocaleDateString())
            console.log(enddata)
            // console.log(enddata.getTime())
            if (nowdata.toLocaleDateString()>enddata){
                // console.log('超过')
                return {code:50000, message:'已超过截止日期'}
            }
            // console.log('1')
            // this.addActApp()
            // console.log('2')
            await activityapp.create({
                cid:this.cid,
                aaName:this.aaName,
                aaConnect:this.aaConnect,
                aafile:this.aafile,
                aid:this.aid
            })
            return {code: 20000, messgae: '成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    async signList(){
        try{
            return await activityapp.findAll()
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    //取消报名
    async delSign(){
        try{
            await activityapp.destroy({
                where:{
                    aaid:this.aaid
                }
            })
            return {code: 20000, messgae: '删除成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    //社长某社团报名列表
    async prsclubSign(){
        try{
            return await activityapp.findAll({
                where:{
                    cid:this.cid
                }
            })
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    //根据活动查询
    async listforActivity() {
        try{
            return {
                code: 20000,
                data: await activityapp.findAll({
                    where: {
                        aid: this.aid
                    },
                    include:[{
                        model: club,
                        as: 'club'
                    }]
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
    //根据社团查询
    async appStatusList() {
        try{
            return {
                code: 20000,
                data: await activityapp.findAll({
                    where: {
                        cid: this.cid
                    },
                    include:[{
                        model: club,
                        as: 'club'
                    }]
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '失败'};
        }
    }
}
exports.ActivityApp=ActivityApp;