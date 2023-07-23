const UserModel = require("../../models/UserModel")

const UserService = {
    login: async ({ username, password }) => {
        return UserModel.find({
            username,
            password
        })
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {
            return UserModel.updateOne({
                _id
            }, {
                username, introduction, gender, avatar
            })

        } else {

            return UserModel.updateOne({
                _id
            }, {
                username, introduction, gender
            })
        }
    },
    add: async ({ username, introduction, gender, avatar, role, password }) => {
        return UserModel.create({
            username, introduction, gender, avatar, role, password
        })
    },

    // 获取用户列表数据
    getList:async ({id})=>{
        // 判断是否有用户id传进来,有则搜索单一用户,无则搜索全部用户
        return id?UserModel.find({_id:id},["username","role","avatar","introduction","gender"]):
        UserModel.find({},["username","role","avatar","introduction","gender"])
    },

    // 删除用户数据
    delList:async ({_id})=>{
        return UserModel.deleteOne({_id})
    },

    // 修改用户数据(用户列表)
    putList:async(body)=>{
        return UserModel.updateOne({_id:body._id},body)
    },
}


module.exports = UserService