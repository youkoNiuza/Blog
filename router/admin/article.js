// 后台文章管理应用
const e = require('express')
const express = require('express')
const articleApp = express()
const article = require('../../middleware/article')
const category = require('../../middleware/category')
const log = require('../../middleware/log')
// 首页加载
articleApp.get('/', [article.getCount], (req, res, next) => {
    let { articleCount } = req
    let size = 3
    req.page = {}
    req.page.count = articleCount
    req.page.total = Math.ceil(articleCount / 5)
    req.page.p = req.query.p ? req.query.p : 1
    req.page.p = req.page.p > req.page.total ? req.page.total : req.page.p
    req.page.p = req.page.p < 1 ? 1 : req.page.p
    res.start = (req.page.p - 1) * size
    res.size = size
    next()
}, [article.getPage, category.getList], (req, res) => {
    let { user, pageList, page, categories } = req
    let { category_id, hot} = req.query
    page.list = pageList
    res.render('admin/article/index', {user:user, page:page, categories:categories, category_id:category_id, hot:hot})

})

articleApp.get('/setHot', article.setHot, (req, res) => {
    if (req.affectedRows > 0) {
        res.json({ code: 1, msg: '设置成功' })
    } else {
        res.json({ code: 0, msg: '设置失败' })
    }
})

articleApp.get('/add', [category.getList],(req, res) => {
    res.render('admin/article/add', {user:req.user, categories:req.categories, code:null})
})

// 上传图片
articleApp.post('/ckeditor', (req, res) => {
    if (req.uploadUrl) {
        res.json({
            uploaded: true,
            url:req.uploadUrl
        })
    } else {
        res.json({
            uploaded: false,
            err:{message:'上传失败'}
        })
    }
})

// 上传文章
articleApp.post('/add', [category.getList, article.add], (req, res, next) => {
    if (req.insertId) {
        // 记录日志
        req.log = {
            time: new Date(),
            handle: '上传文章 文章ID为'+req.insertId,
            ip: req.ip.split(':')[3]
        }
        log.add(req, res, next)
        res.render('admin/article/add', {user:req.user, categories:req.categories,code:1})
    } else {
        res.render('admin/article/add', {user:req.user, categories:req.categories,code:2})
    }
})

// 删除文章
articleApp.get('/del', [article.delPic ,article.del], (req, res, next) => {
    if (req.affectedRows) {
        // 记录日志
        req.log = {
            time: new Date(),
            handle: '删除文章',
            ip: req.ip.split(':')[3]
        }
        log.add(req, res, next)
        res.json({code:1, meg:'删除成功'})
    } else {
        res.json({code:2, meg:'删除失败'})
    }
})

// 编辑文章页面
articleApp.get('/edit/:id',[category.getList, article.getArticleById],(req, res) => {
    let { user, categories, article } = req
    res.render('admin/article/edit', {user:user, categories:categories, article:article})
})

// 更新文章
articleApp.post('/edit',[ article.edit],(req, res, next) => {
    if (req.affectedRows > 0) {
        // 记录日志
        req.log = {
            time: new Date(),
            handle: '更新文章',
            ip: req.ip.split(':')[3]
        }
        log.add(req, res, next)
        res.render('admin/alert', {code:true, title:'Success', message:'文章编辑成功', url:'/admin/article/'})
    } else {
        res.render('admin/alert', {code:false, title:'Error', message:'文章编辑失败', url:'/admin/article/edit/'+req.body.id})
    }
})
module.exports = articleApp