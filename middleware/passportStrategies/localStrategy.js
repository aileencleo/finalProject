"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var passport_local_1 = require("passport-local");
var userController_1 = require("../../controllers/userController");
var localStrategy = new passport_local_1.Strategy({
    usernameField: "email",
    passwordField: "password",
}, 
//function that talks in the database 
function (email, password, done) {
    try {
        //checks if the user exist in the database using the getUser.. from the userController
        var user = (0, userController_1.getUserByEmailIdAndPassword)(email, password);
        return done(null, user);
    }
    catch (error) {
        return done(null, false, {
            message: error.message,
        });
    }
});
/*
FIX ME (types)
*/
passport.serializeUser(function (user, done) {
    done(null, user.id);
});
/*
FIX ME (types)
*/
passport.deserializeUser(function (id, done) {
    var user = (0, userController_1.getUserById)(id);
    if (user) {
        done(null, user);
    }
    else {
        done({ message: "User not found" }, null);
    }
});
var passportLocalStrategy = {
    name: 'local',
    strategy: localStrategy,
};
exports.default = passportLocalStrategy;
