var mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = mongoose.model('User');


module.exports = function (passport, config) {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findOne({
            _id: id
        }, function (err, user) {
            done(err, user);
        });
    });



    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) {
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                'email': email
            }, function (err, user) {
                if (err)
                    return done(err);
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, req.flash('error', 'That email is already taken.'));
                } else {
                    var newUser = new User();

                    newUser.email = email;
                    newUser.hashPassword(password); // use the generateHash function in our user model

                    // save the user
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    });
                }
            });
    }));

    
    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },
        function (req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({
                'email': email
            }, function (err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('error', 'No user found.')); // req.flash is the way to set flashdata using connect-flash

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, req.flash('error', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                return done(null, user);
            });

    }));

    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreateFaceBookUser(profile, done);
        }));
}