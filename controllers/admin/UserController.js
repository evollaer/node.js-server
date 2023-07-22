const UserService = require("../../services/admin/UserService")
const JWT = require("../../util/JWT")

const UserController = {
    login: async (req, res) => {
        //req.body 
        var result = await UserService.login(req.body)
        if (result.length === 0) {
            res.send({
                code: '-1',
                error: "用户名密码不匹配"
            })
        } else {
            //生成token并设置在header中
            const token = JWT.generate({
                _id: result[0]._id,
                username: result[0].username
            }, "7d")
            res.header("Authorization", token)
            res.send({
                ActionType: "OK",
                code: 1,
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,//性别：0,1,2
                    introduction: result[0].introduction,//简介
                    avatar: result[0].avatar,
                    role: result[0].role,//管理员1，编辑2
                }
            })
        }
    }
}

module.exports = UserController