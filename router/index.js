// 首页路由

const express = require('express')

const indexApp = express()
const article = require('../middleware/article')
const category = require('../middleware/category.js')
const auth = require('../middleware/auth.js')
const pv = require('../middleware/pv.js')

indexApp.use(auth.getUser)

indexApp.get('/', [article.getHot, article.getList, category.getList, pv.todayExist, pv.indexPvCount], (req, res) => {
    let { hots, articles, categories, user } = req
    let data = {}
    data['hots'] = hots
    data['articles'] = articles
    data['categories'] = categories
    data['user'] = user
    res.render('index', {data:data})
})

module.exports = indexApp