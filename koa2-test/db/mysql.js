const mysql=require('mysql')
// const{MYSQL_CONF}=require('../config/db.js')

//创建链接对象
const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    port:'3306',
    database:'blog'
  })

//开始链接
con.connect()

//统一执行上SQL函数

function exec(sql){
  const promise=new Promise((resolve,reject)=>{
    con.query(sql,(err,result)=>{
      if (err) {
        reject(err)
        return
      }
      resolve(result)
    })
  })
  return promise

}

module.exports={
  exec,
  escape:mysql.escape
}