const {login}=require('../controller/user.js')
const {SuccessModel,ErrorModle}=require('../model/resModel.js')

const {set }=require('../db/redis.js')



const handleUserRouter=(req,res)=>{
  const method=req.method
  //登录
  if (method==='POST'&&req.path==='/api/user/login') {
    const {username,password}=req.body

    // const {username,password}=req.query
    const result=login(username,password)

    return result.then(data=>{
      if (data.username) {
        //设置session
        req.session.username=data.username
        req.session.realname=data.realname
        //同步到redis中
        set(req.sessionId,req.session)
        
        return new SuccessModel()
      }
      return new ErrorModle('登录失败')
    })
  }

  //登录验证的测试
  // if (method==='GET'&&req.path==='/api/user/login-test') {
  //   if (req.session.username) {
  //     return Promise.resolve(new SuccessModel(

  //         {session:req.session}
  //       ))
  //   }

  //   return Promise.resolve(new ErrorModle('尚未登录'))
  // }
}

module.exports = handleUserRouter