const express = require('express')
const { route } = require('./user')
const multer = require('multer')
const path = require('path')
const Blog = require('../models/blog.models')
const Comment = require('../models/comment.models')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve('./public/uploads'))
    },
    filename: function (req, file, cb) {
      cb(null ,file.originalname)
    }
  })

  const upload  = multer({storage:storage})


const router = express.Router()

router.get('/add-new-blog' , (req , res)=>{
    return res.render('addBlogs',{
        user:req.user
    })
})

router.get('/:id' , async(req , res)=>{
  const specificBlog = await Blog.findById(req.params.id).populate('createdBy')
  const allComments = await Comment.find({ blogId:req.params.id}).populate('createdBy')
  console.log('allcomments goes here!!!!',allComments)
  res.render('blog' , {
    specificBlog:specificBlog,
    user:req.user,
    allComments:allComments
  })
})

router.post('/comment/:blogId' , async(req , res)=>{
  const {content} = req.body
  const comment = await Comment.create({
    content:content,
    createdBy:req.user._id,
    blogId:req.params.blogId
  })

  console.log('comment' , comment)

  return res.redirect(`/blog/${req.params.blogId}`)
})

router.post('/' ,upload.single('coverImageURL'), async(req , res)=>{
    const {title,body} = req.body
    const blog = await Blog.create({
      body:body,
      title:title,
      coverImageURL:`/uploads/${req.file.filename}`,
      createdBy:req.user._id
    })
    return res.redirect(`/blog/${blog._id}`)
})


module.exports = router