// 后台首页应用
const user = require('../../middleware/user')
const pv = require('../../middleware/pv')
const category = require('../../middleware/category')
const article = require('../../middleware/article')
const express = require('express')
const indexApp = express()

// 首页加载
indexApp.get('/', [user.lastLoginTime, pv.getTotal, category.getCategoryCount, article.getCount], (req, res, next) => {
    let { user, lastLoginTime, pvTotal, categoryCount, articleCount } = req
    res.render('admin/index', {user:user, lastLoginTime:lastLoginTime, pvTotal:pvTotal, categoryCount:categoryCount, articleCount:articleCount})
})

// 访问量接口
indexApp.get('/pvs', [pv.getAll], (req, res) => {
    let { pvs } = req
    let data = {}
    data.data = pvs
    data.start = pvs[0].time
    data.end = pvs[pvs.length - 1].time
    res.json(data)
})

module.exports = indexApp