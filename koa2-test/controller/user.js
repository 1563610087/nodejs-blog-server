const {exec,escape}=require('../db/mysql.js')
const {genPassWord}=require('../utils/cryp.js')


const login=async (username,password)=>{
  username=escape(username)

  //对密码进行加密，再对数据库的密码进行匹配
  password=genPassWord(password)


  password=escape(password)


  const sql=`select username, realname from users where username=${username} and password=${password}`
  const rows=await exec(sql)
  return rows[0]||{}
  // return exec(sql).then(rows=>{
  //   return rows[0]||{}
  // })
}
module.exports={
  login
}