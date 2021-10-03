// 文章分类的路由模块
// 导入express

const express = require('express')

const router = express.Router()

// 导入文章分类的路由处理模块:

const artcate_handle = require('../router_handler/artcate')

router.get('/cates', artcate_handle.getArtCates)

// 新增文章分类路由模块:

// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi')

// 利用对象解构导入自定义的验证规则

const { add_cate_schema, delete_cate_schema } = require('../schema/artcate')

// 将中间件填充至路由中
router.post('/addcates', expressJoi(add_cate_schema), artcate_handle.addArticleCates)

// 根据ID删除文章分类的路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), artcate_handle.deleteCateById)

// 根据id获取文章分类路由

router.get('cates/:id', artcate_handle.getCatesById)

//暴露路由模块
module.exports = router