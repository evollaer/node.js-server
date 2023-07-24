const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductType = {
    title: String,//标题
    introduction: String,//简介
    detail: String,//详情
    cover: String,//封面
    editTime: Date,//编辑时间
}

const ProductModel = mongoose.model("product", new Schema(ProductType))

module.exports = ProductModel