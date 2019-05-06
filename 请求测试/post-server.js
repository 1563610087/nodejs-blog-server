const http=require('http')
const querystring=require('querystring')
const server=http.createServer((req,res)=>{
  if(req.method==='POST')
    console.log('req content-type:',req.headers['content-type'])
  let postData=''
  req.on('data',chunk=>{
    postData+=chunk.toString()
  })
  req.on('end',()=>{
    res.end('hello world!')
    console.log('postData:',postData)
  })
  })

server.listen(8000)
console.log('ok')