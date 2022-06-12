const express = require('express')

const userApp = express()
const auth = require('../middleware/auth.js')

userApp.get('/', [auth.logout], (req, res) => {
    res.render('login', {msg:'退出成功'})
})

module.exports = userApp