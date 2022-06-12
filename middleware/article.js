const Article = require('../model/article.js')
const Tab  = require('../model/tab.js')
module.exports = {
    getHot: (req, res, next) => {
        Article.getHot(3).then(results => {
            req.hots = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getList: (req, res, next) => {
        Article.getList().then(results => {
            req.articles = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getListByCategoryId: (req, res, next) => {
        let id = req.params.id
        Article.getListByCategoryId(id).then(results => {
            req.articles = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getListByKeyWord: (req, res, next) => {
        let keyword = req.query.keyword
        Article.getListByKeyWord(keyword).then(results => {
            req.articles = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getArticleById: (req, res, next) => {
        let id = req.params.id
        Article.getArticleById(id).then(results => {
            req.article = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getTagByArticleId: (req, res, next) => {
        let id = req.params.id
        Tab.getTagByArticleId(id).then(results => {
            req.tabs = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getPrevArticle: (req, res, next) => {
        let id = req.params.id
        Article.getPrevArticle(id).then(results => {
            req.prev = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getNextArticle: (req, res, next) => {
        let id = req.params.id
        Article.getNextArticle(id).then(results => {
            req.next = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    getCount:(req, res, next) => {
        Article.getCount(req.query.category_id, req.query.hot).then(result => {
            req.articleCount = result
            next()
        }).catch(err => {
            next(err)
        })
    },
    getPage: (req, res, next) => {
        Article.getPage(res.start, res.size, req.query.category_id, req.query.hot).then(results => {
            req.pageList = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    setHot: (req, res, next) => {
        let {id, hot} = req.query
        Article.setHot(id, hot).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    add: (req, res, next) => {
        let { title, content, hot, category_id } = req.body
        const article = {
            title: title,
            content: content,
            hot: hot ? 1 : 0,
            category_id: category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : null
        }
        Article.add(article).then(results => {
            req.insertId = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    del: (req, res, next) => {
        let { id } = req.query
        Article.del(id).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
    delPic:(req, res, next) => {
        let { id } = req.query
        Article.delPic(id).then(results => {
            if (results.code) {
                req.isDeletePicSucs = true
            } else {
                req.isDeletePicSucs = false
            }
            next()
        }).catch(err => {
            next(err)
        })
    },
    edit: (req, res, next) => {
        let { title, content, hot, category_id, thumbnail, id } = req.body
        const article = {
            title: title,
            content: content,
            hot: hot ? 1 : 0,
            category_id: category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : thumbnail,
            id: id
        }
        Article.edit(article).then(results => {
            req.affectedRows = results
            next()
        }).catch(err => {
            next(err)
        })
    },
}