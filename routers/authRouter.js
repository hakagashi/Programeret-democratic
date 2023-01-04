const express = require('express');
const multer = require('multer');
const auth = require('../helpers/auth');
const userController = require('../controllers/userController');
const router = express.Router();

let upload = multer({ dest: './static/images/' });

// get
router.get('/login', (req, res) => {
    if (req.session.user) {
        res.redirect('/auth/profile')
    } else {
        res.render('login.ejs');
    }
})
// post
router.post('/login', express.urlencoded({ extended: true }),
    userController.getUserByEmail, (req, res) => {
        let user = res.user;
        req.session.user = user;
        res.redirect('/blogs')
    })

// get localhost/auth/create
router.get('/signup', (req, res) => {
    if (req.session.user) {
        res.redirect('/auth/profile');
    } else {
        res.render('userform.ejs');
    }
})

// post localhost/auth/signup
router.post('/signup', express.urlencoded({ "extended": true }), upload.single('image'),
    userController.createNewUser, (req, res) => {
    });

router.get('/profile', auth.autherize, userController.getProfile, (req, res) => {
    let user = res.user;
    res.render('profile.ejs', { user })
});

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
})
// this js file exports a router 
module.exports = router;