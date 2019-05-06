const router = require('koa-router')()
const {login}=require('../controller/user.js')
const {SuccessModel,ErrorModle}=require('../model/resModel.js')
router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const {username,password}=ctx.request.body
  const data=await login(username,password)
  if (data.username) {
        //设置session
        ctx.session.username=data.username
        ctx.session.realname=data.realname        
        ctx.body=new SuccessModel()                  
        return 
   }
  ctx.body=new ErrorModle('登录失败')
             
})
   

   
      

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// router.get('/session-test', async function(ctx,next){
//   if (ctx.session.viewCount==null) {
//     ctx.session.viewCount=0
//   }
//   ctx.session.viewCount++

//   ctx.body={
//     errno:0,
//     viewCount:'hah'
//   }
//   // ctx.body = 'this is hahhha'
// })


module.exports = router
