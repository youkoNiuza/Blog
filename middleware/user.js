const User = require('../model/user')

module.exports = {
    lastLoginTime: (req, res, next) => {
        User.lastLoginTime().then(result => {
            req.lastLoginTime = result
            next()
        }).catch(err => {
            console.log(err)
        })
    }
}