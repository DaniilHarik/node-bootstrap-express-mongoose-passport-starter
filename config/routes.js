var User = require('../app/models/user');

var UserController = require('../app/controllers/user');
var AdminUserController = require('../app/controllers/admin/user');

var Auth = require('./middlewares/authorization.js');

module.exports = function (app, passport) {
    app.get("/", function (req, res) {
        if (req.isAuthenticated()) {
            res.render("home", {
                user: req.user
            });
        } else {
            res.render("home", {
                user: null
            });
        }
    });

    app.get("/login", function (req, res) {
        res.render("user/login", {
            user: req.user, 
            message : req.flash("error")
        });
    });

    app.post("/login", passport.authenticate('local-login', {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true 
    }));

    app.get("/signup", function (req, res) {
        res.render("user/signup", {
            user: req.user, 
            message : req.flash("error")
        });
    });
    
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile',
        failureRedirect : '/signup',
        failureFlash : true
    }));
    

//    app.get("/auth/facebook", passport.authenticate("facebook", {
//        scope: "email"
//    }));
//
//    app.get("/auth/facebook/callback",
//        passport.authenticate("facebook", {
//            failureRedirect: '/login'
//        }),
//        function (req, res) {
//            res.render("profile", {
//                user: req.user
//            });
//        }
//    );

    app.get("/profile", Auth.isAuthenticated, function (req, res) {
        res.render("user/profile", {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/login');
    });
    
    app.get('/admin/users', AdminUserController.index);
}
