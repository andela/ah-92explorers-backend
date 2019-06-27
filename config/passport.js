const passport = require("./node_modules/passport");
const LocalStrategy = require("./node_modules/passport-local").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("User");

module.exports = passport.use(
    new LocalStrategy(
        {
            usernameField: "email",
            passwordField: "password"
        },
        function(email, password, done) {
            User.findOne({ email: email })
                .then(function(user) {
                    if (!user || !user.validPassword(password)) {
                        return done(null, false, {
                            errors: { "email or password": "is invalid" }
                        });
                    }

                    return done(null, user);
                })
                .catch(done);
        }
    )
);
