let express = require('express');
const { model } = require('mongoose');
let router = express.Router();

let mongoose = require('mongoose');
//const { use } = require('passport');
let passport = require('passport');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias 
module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('projects', {title: 'projects', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('services', {title: 'projservicesects', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('contact', {title: 'contact', displayName: req.user ? req.user.displayName: ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('about', {title: 'about', displayName: req.user ? req.user.displayName: ''});
}


module.exports.displayLoginPage = (req, res, next) => {
    // check if the User is already loged in
    if(!req.User)
    {
        res.render('auth/login',
        {
            title: "login",
            messages: req.flash('loginMessage'),
            displayName: req.User ? req.User.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) =>
{
    passport.authenticate('local', 
    (err,  user, info) =>
    {
        // server error?
        if(err)
        {
            return next(err);
        }
        // is there a User login Error
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) =>
        {
            // server error
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayrRegisterPage = (req, res, next) => {
    // check if the User is not already loged in
    if(!req.User)
    {
        res.render('auth/register',
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.User ? req.User.displayName : ''
        })
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    // instantiate a user object
    let newUser = new User(
    {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        displayName: req.body.displayName
    });
    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registeration Error: User Already Exist!'
                );
                console.log('Error: User Already Exist!')
            }
            return res.render('auth/register',
                {
                    title: "Register",
                    messages: req.flash('registerMessage'),
                    displayName: req.user ? req.user.displayName : ''
                });
        }
        else
        {
            /* if no error exist, then registration successful 
            redirect the user and aythenticate him */
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contact-list')
            });
        }
    });

}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}
