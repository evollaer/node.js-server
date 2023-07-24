var express = require('express');
var ProductRouter = express.Router();
const ProductController = require("../../controllers/admin/ProductController")


const multer = require('multer')
const upload = multer({ dest: 'public/productuploads/' })

ProductRouter.post("/adminapi/product/add", upload.single("file"), ProductController.add)//新增产品
ProductRouter.get("/adminapi/product/list", ProductController.getList)//获取产品列表
ProductRouter.post("/adminapi/product/list",upload.single("file"),ProductController.updateList)// 编辑产品(编辑)
ProductRouter.get("/adminapi/product/list/:id",ProductController.getList)// 获取对应的产品(编辑)
ProductRouter.delete("/adminapi/product/list/:id",ProductController.delList)// 删除产品


module.exports = ProductRouter


