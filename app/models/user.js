var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

UserSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: {
        type: String, required: true
    },
    password: String,
    role: Number,
    facebook: {
        id: String,
        email: String,
        name: String
    },
    twitter: {
        id: String,
        email: String,
        name: String
    }
});



// checking if password is valid using bcrypt
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// this method hashes the password and sets the users password
UserSchema.methods.hashPassword = function (password) {
    var user = this;

    // hash the password
    bcrypt.hash(password, null, null, function (err, hash) {
        if (err)
            return next(err);

        user.password = hash;
        user.role = 10
    });
};

UserSchema.statics.findOrCreateFaceBookUser = function (profile, done) {
    var User = this;
    this.findOne({
        'facebook.id': profile.id
    }, function (err, user) {
        if (err) throw err;
        // if (err) return done(err);
        if (user) {
            done(null, user);
        } else {
            User.create({
                email: profile.emails[0].value,
                facebook: {
                    id: profile.id,
                    email: profile.emails[0].value,
                    name: profile.displayName
                }
            }, function (err, user) {
                if (err) throw err;
                // if (err) return done(err);
                done(null, user);
            });
        }
    });
}

var User = mongoose.model("User", UserSchema);
module.exports = User;