const express = require('express')

const articleApp = express()
const article = require('../middleware/article')
const category = require('../middleware/category')
const auth = require('../middleware/auth.js')
const pv = require('../middleware/pv.js')

articleApp.use(auth.getUser)

articleApp.get('/list/:id', [article.getListByCategoryId,category.getList,category.getCategoryById], (req, res) => {
    let { articles, categories, category, user } = req
    let data = {}
    data['articles'] = articles
    data['categories'] = categories
    data['category'] = category
    data['user'] = user
    res.render('list', {data:data})
})

articleApp.get('/:id', [category.getList, article.getArticleById,
    article.getTagByArticleId, article.getPrevArticle, article.getNextArticle, pv.articlePvCount],
    (req, res) => {
    let { article, categories, tabs, prev, next, user } = req
    let data = {}
    data['article'] = article
    data['categories'] = categories
    data['tabs'] = tabs
    data['prev'] = prev
    data['next'] = next
    data['user'] = user
    res.render('article', { data: data })
})

module.exports = articleApp