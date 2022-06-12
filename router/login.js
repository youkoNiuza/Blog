const express = require('express')
const User = require('../model/user')
const Log = require('../middleware/log')

const loginApp = express()

loginApp.get('/', (req, res) => {
    res.render('login', {msg:''})
})

loginApp.post('/', (req, res, next) => {
    let { username, password } = req.body
    User.login(username, password).then(results => {
        if (results) {
            // 记录日志
            req.log = {
                time: new Date(),
                handle: '登陆',
                ip: req.ip.split(':')[3]
            }
            Log.add(req, res, next)
            // 储存session key:value
            req.session.user = results
            res.redirect('/')
        } else {
            res.render('login', {msg:'登陆失败!用户名或密码错误'})
        }
    }).catch(err => {
        next(err)
    })
})

module.exports = loginApp