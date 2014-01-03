var User = require('../app/models/user');

var AdminUsersController = require('../app/controllers/admin/users');
var AdminGroupsController = require('../app/controllers/admin/groups');

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

    app.get('/admin/users', Auth.isAuthenticated, AdminUsersController.index);
    app.get('/admin/users/:id', Auth.isAuthenticated, AdminUsersController.get);
    app.get('/admin/users/:id/edit', Auth.isAuthenticated, AdminUsersController.edit);
    app.put('/admin/users/:id', Auth.isAuthenticated, AdminUsersController.update);


    app.get('/admin/groups', Auth.isAuthenticated, AdminGroupsController.index);
    app.get('/admin/groups/add', Auth.isAuthenticated, AdminGroupsController.add);
    app.post('/admin/groups', Auth.isAuthenticated, AdminGroupsController.create);
    app.get('/admin/groups/:id', Auth.isAuthenticated, AdminGroupsController.get);
    app.get('/admin/groups/:id/edit', Auth.isAuthenticated, AdminGroupsController.edit);
    app.put('/admin/groups/:id', Auth.isAuthenticated, AdminGroupsController.update);
}
