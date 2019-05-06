const {SuccessModel,ErrorModle}=require('../model/resModel.js')

module.exports=(req,res,next)=>{
  if (req.session.username) {
    next()
    return
  }
  res.json(
    new ErrorModle('未登录')
  )
}