// 后台类目管理应用
const express = require('express')
const categoryApp = express()
const category = require('../../middleware/category')
const log = require('../../middleware/log')

// 首页加载
categoryApp.get('/',category.getList, (req, res, next) => {
    let { user, categories } = req
    res.render('admin/category/index', {user:user, categories:categories})
})

categoryApp.post('/add', category.addCategory, (req, res,next) => {
    if (req.insertId) {
        // 记录日志
        req.log = {
            time: new Date(),
            handle: '添加类目 ID'+req.insertId,
            ip: req.ip.split(':')[3]
        }
        log.add(req, res, next)
        res.json({code:1, msg:'添加类目成功'})
    } else {
        res.json({code:0, msg:'添加类目失败'})
    }
})

categoryApp.get('/del', category.delCategory, (req, res, next) => {
    if (req.affectedRows > 0) {
        req.log = {
            time: new Date(),
            handle: '删除类目',
            ip: req.ip.split(':')[3]
        }
        log.add(req, res, next)
        res.json({code:1, msg:'删除类目成功'})
    } else {
        res.json({code:0, msg:'删除类目失败'})
    }
})

categoryApp.post('/setname', category.setName, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({code:1, msg:'修改类目名称成功'})
    } else {
        res.json({code:0, msg:'修改类目名称失败'})
    }
})

categoryApp.post('/setindex', category.setIndex, (req, res) => {
    if (req.affectedRows>0) {
        res.json({code:1, msg:'修改类目索引成功'})
    } else {
        res.json({code:0, msg:'修改类目索引失败'})
    }
})

module.exports = categoryApp