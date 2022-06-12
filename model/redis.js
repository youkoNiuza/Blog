const redis = require('redis')
const REDIS_CONFIG ={
    host: '127.0.0.1',
    port: '6379'
}
const client = redis.createClient(REDIS_CONFIG.port, REDIS_CONFIG.host)
client.on("error", function(error) {
    console.error(error)
})

module.exports = client