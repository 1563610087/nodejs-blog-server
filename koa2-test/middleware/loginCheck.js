const {SuccessModel,ErrorModle}=require('../model/resModel.js')

module.exports=async (ctx,next)=>{
  if (ctx.session.username) {
   await next()
    return
  }
  ctx.body=new ErrorModle('未登录')
    
  
}