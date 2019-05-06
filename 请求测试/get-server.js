const http=require('http')
const querystring=require('querystring')

const server=http.createServer((req,res)=>{

  console.log(req.method)
  const url=req.url
  console.log('url:',url)
  req.query=querystring.parse(url.split('?')[1])
  console.log('query:',req.query)
  res.end(JSON.stringify(req.query))

})
server.listen(8000)
console.log('ok')