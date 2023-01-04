const express = require('express');
const multer = require('multer');
const router = express.Router();
const blogController = require('../controllers/blogController');

let upload = multer({ dest: './static/images/' });

// GET localhost/blogs/
router.get('/', blogController.getAllBlogs, (req, res) => {
    let blogs = res.blogs;
    res.render('blogs.ejs', { blogs })
});

// GET localhost/blogs/create
router.get('/create', (req, res) => {
    res.render('blogform');
})

// POST localhost/blogs/create
router.post('/create', express.urlencoded({ "extended": true }), upload.single('image'),
    blogController.createNewBlog, (req, res) => {
    });

// GET localhost/blogs/blogId
router.get('/:blogId', blogController.getBlogById, (req, res) => {
    let blog = res.blog;
    res.render('blog.ejs', { blog });
});

// GET localhost/blogs/user/63a5768ee0adff9a32341b4c
router.get('/user/:userId', blogController.getBlogsByUserId, (req, res) => {
    let userProfile = res.user;
    res.render('profile.ejs', { user: userProfile })
});

module.exports = router;