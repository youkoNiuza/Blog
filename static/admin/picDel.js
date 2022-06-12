const fs = require('fs')

const delPic = function (fileNames) {
    return new Promise((resolve, reject) => {
        if (fileNames && fileNames.length > 0) {
            fileNames.forEach(fileName => {
                fs.unlinkSync(`${__dirname}/${fileName}`)
                })
        }
        resolve({code:1, msg:'删除成功'})
    })
}

module.exports = delPic