const ProductModel = require("../../models/ProductModel")
const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductModel.create({ title, introduction, detail, cover, editTime })
    },
    getList:async ({id})=>{
        // 判断是否有用户id传进来,有则搜索单一用户,无则搜索全部用户
        return id?ProductModel.find({_id:id},["title","introduction","cover","detail","editTime"]):
        ProductModel.find({},["title","introduction","cover","detail","editTime"])
    },
    // 编辑产品
    updateList:async({title,introduction,detail,_id,cover,editTime})=>{
        if(cover){
            return ProductModel.updateOne({_id},{
                title,introduction,detail,cover,editTime
            })
        }else{
            return ProductModel.updateOne({_id},{
                title,introduction,detail,editTime
            })
        }
    },

    // 删除产品
    delList:async ({_id})=>{
        return ProductModel.deleteOne({
            _id
        })
    },
}

module.exports = ProductService