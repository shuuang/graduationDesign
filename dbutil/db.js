// 创建数据库连接
// 1.引入orm
const Sequelize = require('sequelize');
//2.传递参数
const db = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_TYPE,
    port: process.env.DB_PORT
});

db.authenticate().then(function() {
    console.log("数据库连接成功");
}).catch(function(err) {
    //数据库连接失败时打印输出
    console.error(err);
    throw err;
});
exports.db = db;