const express = require('express')

const userApp = express()
const auth = require('../middleware/auth.js')

userApp.get('/', [auth.logout], (req, res) => {
    res.render('login', {msg:'ιεΊζε'})
})

module.exports = userApp