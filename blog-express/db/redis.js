const redis = require('redis')
//由于这里环境变量配置有问题，暂时不使用环境变量
// const {REDIS_CONF}=require('../conf/db')

const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})

module.exports=redisClient
  

