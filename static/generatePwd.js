const crypto = require('crypto')
const salt = 'youkoblog'

const _md5 = function(pwd) {
    const md5 = crypto.createHash('md5')
    const hash = md5.update(pwd).digest('hex')
    return hash
}

const generatePwd = function (pwd) {
    pwd += salt
    const hash = _md5(pwd)
    return hash
}

module.exports = generatePwd