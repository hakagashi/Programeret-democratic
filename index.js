// modules
const express = require('express');
const mongoose = require('mongoose');
const expressSession = require('express-session');
const auth = require('./helpers/auth');
// routers
const authRouter = require('./routers/authRouter');
const blogRouter = require('./routers/blogRouter');
const { rawListeners } = require('./models/user');

// create express app
const app = express();

// set our view engine to use ejs
app.set('view engine', 'ejs');

app.use(expressSession({
    secret: "topsecret",
    resave: false,
    saveUninitialized: true
}));
app.listen(80);

mongoose.connect('mongodb://127.0.0.1:27017/blog01');

// setting /static as a public path 
app.use('/static', express.static('static'));

// localhost/auth
app.use('/auth', authRouter);
// localhost/blogs
app.use('/blogs', auth.autherize, blogRouter);

app.use('*', (req, res)=>{
    if(req.session.user){
        res.redirect('/blogs');
    } else{
        res.redirect('/auth/login');
    }
});