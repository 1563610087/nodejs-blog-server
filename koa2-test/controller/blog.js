const { exec } = require('../db/mysql.js')
const xss=require('xss')

//传入作者和关键字，拼接SQL语句
const getList=async (author,keyword)=>{
  //字符串尾部有空格，因为要拼接语句
  let sql=`select * from blogs where 1=1 `
  if (author) {
    sql+=`and author='${author}' `
  }
  if(keyword){
    sql+=`and title like '%${keyword}%' `
  }
  sql+=`order by createtime desc;`
  //返回promise
  return await exec(sql)
}
const getDetail=async (id)=>{
  //先返回假数据
  const sql=`select * from blogs where id='${id}'`
  const rows=await exec(sql)
  return rows[0]

  // return await exec(sql).then(rows=>{
  //   return rows[0]
  // })
     
}
const newBlog=async (blogData={})=>{
  //blogData是一个博客对象，是从前端传过来的，包含title content等属性



  const title=xss(blogData.title)
  // const title=blogData.title
  const content=xss(blogData.content)
  const author=blogData.author
  const createtime=Date.now()
  const sql =`insert into blogs (title,content,createtime,author) values ('${title}','${content}','${createtime}','${author}');`
  const insertData=await exec(sql)
  return {
      id:insertData.insertId
    }
  // return exec(sql).then(insertData=>{
    
  //   return {
  //     id:insertData.insertId
  //   }
  // })
}

const updateBlog=async (id,blogData={})=>{
  //id 表示要更新博客的id
  //blogData是一个博客对象，包含title content属性
  const title=blogData.title
  const content=blogData.content

  const sql=`update blogs set title='${title}',content='${content}' where id=${id}`
  
  const updateData=await exec(sql)
  if (updateData.affectedRows>0) {
      return true
    }
    return false
  // return  exec(sql).then(updateData=>{
    
  //   // console.log('updateData is',updateData)
  //   if (updateData.affectedRows>0) {
  //     return true
  //   }
  //   return false
  // })
}

const delBlog=async (id,author)=>{
  //id就是要删除博客的id
  const sql=`delete from blogs where id='${id}' and author='${author}'`
  const delData=await exec(sql)
  if (delData.affectedRows>0) {
      return true
    }
  return false
  // return exec(sql).then(delData=>{
  //   if (delData.affectedRows>0) {
  //     return true
  //   }
  //   return false
  // })



    
}



module.exports={
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}