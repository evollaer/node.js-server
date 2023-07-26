const mongoose = require("mongoose")
const Schema = mongoose.Schema

const NewsType = {
    title: String,//标题
    content: String,//内容
    category: Number,//详情
    cover: String,//封面
    isPublish: Number,//0未发布，1已发布
}

const NewsModel = mongoose.model("news", new Schema(NewsType))

module.exports = NewsModel