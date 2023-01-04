const User = require('../models/user')
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');

exports.getProfile = (req, res, next) => {
    User.findById(req.session.user._id, (err, data) => {
        data.populate('blogs', (err, data) => {
            res.user = data;
            next();
        });
    })
}

exports.getUserByEmail = (req, res, next) => 
    User.findOne({ "email": req.body.email }, (err, data) => {
        if (err || data == null) {
            res.redirect('/auth/login')
            return;
        }

        bcrypt.compare(req.body.password, data.password,(err, result) => {
            if (result) {
                res.user = data;
            next()
            } else {
                res.redirect('/auth/login');
                return;
            }
        })

    })


        
exports.createNewUser = (req, res, next) => {
    if (req.body.firstName == "" || req.body.lastName == "" || req.body.email == "" ||
        req.body.username == "" || req.body.password == "" || req.body.passwordConfirmation == "") {
        res.redirect('/auth/signup');
    } else {
        if (req.body.password == req.body.passwordConfirmation) {
            // ".png"
            const fileext = path.extname(req.file.originalname).toLowerCase();
            // "newblog.png"
            const fullFileName = req.body.firstName + req.body.lastName + fileext;

            const tempPath = req.file.path;
            // C:\Users\Dell\Desktop\Blog_G1\controllers\blogController.js
            const targetPath = path.join(__dirname, `../static/images/${fullFileName}`);

            if (fileext === ".png" || fileext === ".jpg" || fileext === ".jpeg" || fileext === ".webp") {
                fs.rename(tempPath, targetPath, err => {
                    if (err) {
                        console.log(err)
                        return;
                    } else {
                        bcrypt.hash(req.body.password, 10, (err, hash) => {
                            if (err) {
                                res.redirect('/auth/signup');
                                return;
                            }

                            User.create({
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                email: req.body.email,
                                password: hash,
                                username: req.body.username,
                                profilePicture: fullFileName,
                                blogs: []
                            }, (err, data) => {
                                if (err) {
                                    res.redirect('/auth/signup');
                                    return;
                                }
                                res.redirect('/auth/login');
                                next()
                            });
                        });
                    }
                });
            } else {
                fs.unlink(tempPath, err => {
                    if (err)
                        return;
                    res.send("Only .png, .jpg or .jpeg  files are allowed!")
                });
            }
        } else {
            res.redirect('/auth/signup');
        }
    }
}