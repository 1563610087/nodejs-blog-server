const redis = require('redis')
//由于这里环境变量配置有问题，暂时不使用环境变量
// const {REDIS_CONF}=require('../conf/db')

const redisClient = redis.createClient(6379, '127.0.0.1')
redisClient.on('error', err => {
    console.error(err)
})


function set(key,val){
  if (typeof val==='object') {
    val=JSON.stringify(val)
  }
  redisClient.set(key,val,redis.print)
}
function get(key){
  const promise= new Promise((resolve,reject)=>{
    redisClient.get(key, (err, val) => {
        if (err) {
            reject(err)
            return
        }
        if (val==null) {
            resolve(null)
            return
        }
        try{
          resolve(JSON.parse(val))

        }catch(ex){

          resolve(val)
        }
        

    })
  })

  return promise
}

module.exports={
  set,
  get
}
