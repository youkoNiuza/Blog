const express = require('express')

const searchApp = express()
const article = require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth.js')


searchApp.get('/', [article.getListByKeyWord, category.getList, auth.getUser], (req, res) => {
    let { articles, categories, user } = req
    let data = {}
    data['articles'] = articles
    data['categories'] = categories
    data['keyword'] = req.query.keyword
    data['user'] = user
    res.render('search', {data:data})
})

module.exports = searchApp