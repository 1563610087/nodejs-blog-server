//nodejs自带加密模块
const crypto=require('crypto')

//密匙
const SECRET_KEY='sdsa#f'

//md5加密

function md5(content){
  let md5=crypto.createHash('md5')

  return md5.update(content).digest('hex')
}


//加密函数
function genPassWord(password){
  const str=`password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

// console.log(genPassWord(123))


module.exports={
  genPassWord
}