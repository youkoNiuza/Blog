// 后台文章管理应用
const express = require('express')
const accountApp = express()
// 首页加载
accountApp.get('/', (req, res, next) => {
    let { user } = req
    res.render('admin/account/index', {user:user})
})



module.exports = accountApp