var db = require('../dbutil/db').db;
var clubmember=require('../models/clubmember')(db);
var clubuser=require('../models/clubuser')(db);
const {Op} = require("sequelize");

class ClubMember {
    constructor(body) {
        this.cmid=body.cmid;
        this.cid=body.cid;
        this.uid=body.uid;
        this.num=body.num;
        this.year=body.year;
        this.uappyear=body.uappyear;
    }
    //查询用户信息
    async clubUser(){
        try{
            console.log(this.cid,this.uid)
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
    //计算num
    async numValue(){
        try{
            var list=await clubuser.findAll({
                where:{
                    [Op.and]:[{uappyear:this.year},{status:1},{cid:this.cid}]
                    //当年
                }
            })
            // console.log(list.length)
            return list.length
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '错误'};
        }
    }
    async addMember(){
        try{
            await clubmember.create({
                cid:this.cid,
                //clubuser中年份，status=1，cid得到
                num:this.num,
                //正常应该获取某一年
                year:this.year
            })
            return {code: 20000, messgae: '成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '错误'};
        }
    }
    //查询数据
    async memberList(){
        try{
            return await clubmember.findAll({
                where:{
                    cid:this.cid
                }
            })
        }catch (e) {
            console.log(e)
            return {code: 50000, messgae: '错误'};
        }
    }
}
exports.ClubMember=ClubMember;