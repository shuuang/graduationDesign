//身份识别
var roleCheck=function (role) {
    switch (role) {
        //非社联
        case 0:
            return "editor"
        //社联
        case 1:
            return "admin"
        default:
            return "unknown"
    }
}
module.exports=roleCheck;