const express = require('express')
const path = require('path')
const fs = require('fs')
const app = express()
const cookieParser = require('cookie-parser')
const session = require('express-session')
const multer = require('multer')
const RedisStore = require('connect-redis')(session)
const redisClient = require('./model/redis')

const upload = multer({
    dest: './static/upload',
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

app.set('view engine', 'html')
app.set('views', `${path._dirname}/views`)
app.engine('html', require('ejs').renderFile)

app.use(cookieParser())

app.use(session({
    name: 'userID',
    secret: 'Ava',
    saveUninitialized: true,
    resave: true,
    cookie: { path: '/', httpOnly: true, maxAge: 1000 * 60 * 30 },
    store: new RedisStore({ client: redisClient })
}))
app.use(express.static('static'))

// post 处理
app.use(express.urlencoded({ extended: true }))
// session 延期
app.use((req, res, next) => {
    req.session.touch()
    next()
})

// 子应用
app.use(/\/(index)?/, require('./router/index'))
app.use('/article', require('./router/article'))
app.use('/search', require('./router/search'))
app.use('/login', require('./router/login'))

// 进入后台权限验证
app.use('/admin/?*', require('./middleware/auth').allowToAdmin)

//上传
app.post('/admin/*', upload.single('upload'), (req, res, next) => {
    // 上传成功后的文件对象
    let { file } = req
    if (file) {
        let extname = path.extname(file.originalname)
        fs.renameSync(file.path, file.path + extname)
        req.uploadUrl = '/upload/' + file.filename + extname
    }
    next()
})

// 后台首页
app.use(/\/admin\/(index)?/, require('./router/admin/index'))
// 后台文章管理
app.use('/admin/article', require('./router/admin/article'))
// 后台类目管理
app.use('/admin/category', require('./router/admin/category'))
// 后台日志管理
app.use('/admin/log', require('./router/admin/log'))
// 后台文章管理
app.use('/admin/account', require('./router/admin/account'))

app.use('/user/logout', require('./router/user'))


app.listen(3000)
// app.keepAliveTimeout = 61 * 1000
// app.headersTimeout = 65 * 1000 // Node.js >= 10.15.2 需要设置该值大于keepAliveTimeout