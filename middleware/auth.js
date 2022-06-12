// 处理权限

module.exports = {
    getUser: (req, res, next) => {
        // 从session中读取数据
        req.user = req.session.user
        next()
    },
    logout: (req, res, next) => {
        req.session.user = null
        next()
    },
    allowToAdmin:(req, res, next) => {
        let user = req.session.user
        if (user) {
            req.user = req.session.user
            next()
        } else {
            res.redirect('/login')
        }
    },
}