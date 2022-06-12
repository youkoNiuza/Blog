// 后台日志管理应用
const express = require('express')
const log = require('../../middleware/log')
const logApp = express()

// 首页加载
logApp.get('/',[log.getCount], (req, res, next) => {
    const page = {
        p: req.query.p ? req.query.p : 1,
        count: req.count,
        size: 5
    }
    page.total = Math.ceil(page.count / page.size)
    page.p = page.p > page.total ? page.total : page.p
    page.p = page.p < 1 ? 1 : page.p
    req.page = page
    next()
}, log.getPage, (req, res, next) => {
    res.render('admin/log/index', {user:req.user, page:req.page})
})


module.exports = logApp