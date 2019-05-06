class BaseModel {
  constructor (data,message){
    //传入的data要为对象，message为字符串类型
    //假设只传入了一个字符串
    if(typeof data==='string'){
      this.message=data
      data=null
      message=null
    }
    if (data) {
      this.data=data
    }
    if (message) {
      this.message=message
    }
  }
}


class SuccessModel extends BaseModel{
  constructor(data,message){
    super(data,message)
    this.errno=0
  }
}

class ErrorModle extends BaseModel{
  constructor(data,message){
    super(data,message)
    this.errno=-1
  }
}

module.exports={
  SuccessModel,
  ErrorModle
}