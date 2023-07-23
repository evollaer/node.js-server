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
    },
    upload: async (req, res) => {
        console.log(req.body, req.file);
        const { username, introduction, gender } = req.body
        const token = req.headers["authorization"].split(" ")[1]
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        console.log(token, 'token');
        if (token) {
            var playload = JWT.verify(token)
        }
        //调用service模块更新数据
        await UserService.upload({
            _id: playload._id, username, introduction,
            gender: Number(gender), avatar
        })
        if (avatar) {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction, avatar, gender: Number(gender)
                }
            })
        } else {
            res.send({
                ActionType: "OK",
                data: {
                    username, introduction, gender: Number(gender)
                }
            })
        }
    },
    add: async (req, res) => {
        const { username, password, role, introduction, gender } = req.body
        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ""// 保存头像数据名
        await UserService.add({ username, password, role: Number(role), gender: Number(gender), introduction, avatar })
        res.send({ ActionType: "OK" })
    },
    

    // 获取用户列表数据
    getList: async (req, res) => {
        console.log(req.params,'req');
        const result = await UserService.getList(req.params)
        res.send({
            ActionType:"OK",
            data:result
        })
    },

    // 删除用户数据
    delList:async (req,res)=>{
        // console.log('要删除的用户id',req.params.id)
        const result = await UserService.delList({_id:req.params.id})
        res.send({
            ActionType: "OK"
        })
    },
    
    // 修改用户数据(用户列表)
    putList:async (req,res)=>{
        const result = await UserService.putList(req.body)
        res.send({
            ActionType: "OK"
        })
    },
}

module.exports = UserController