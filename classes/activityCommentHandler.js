var db = require('../dbutil/db').db;
var activitylog=require('../models/activitylog')(db);
var users=require('../models/users')(db);
var activitycomment=require('../models/activitycomment')(db)
const {Op} = require("sequelize");

class ActivityComment {
    constructor(body) {
        this.acid=body.acid;
        this.comment=body.comment;
        this.alid=body.alid;
        this.uid=body.uid;
        this.createAt=body.creatAt;
        this.alcounts=body.alcounts;
        try{
            activitycomment.belongsTo(users,{
                foreignKey:'uid',
                as:'users'
            })
        }catch(e)
        {

        }
    }
    async addComment(){
        try{
            let data=new Date()
            // console.log(data.Format("yyyy-MM-dd hh:mm:ss"))
            await activitycomment.create({
                comment:this.comment,
                alid:this.alid,
                uid:this.uid,
                createAt:data
                // createAt:data.toLocaleDateString()
            })
            await activitylog.update({
                alcounts: this.alcounts
            },{
                where: {
                    alid: this.alid
                }
            })
            return {code: 20000, message: '评论成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    async delComment(){
        try{
            await activitycomment.destroy({
                where:{
                    acid:this.acid
                }
            })
            return {code: 20000, message: '删除成功'};
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }
    async commentList(){
        try{
            return {
                code: 20000,
                data: await activitycomment.findAll({
                    where:{
                        alid:this.alid
                    },
                    include: [{
                        model: users,
                        as: 'users',
                        attributes:['realname']
                    }]
                })
            }
        }catch (e) {
            console.log(e)
            return {code: 50000, message: '错误'};
        }
    }

}
exports.ActivityComment=ActivityComment;