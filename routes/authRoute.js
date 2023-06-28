"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var passport = require("passport");
var checkAuth_1 = require("../middleware/checkAuth");
var router = express.Router();
//github login
router.get('/github', passport.authenticate('github', {
    scope: ['user:email', 'user']
}));
router.get('/github/callback', passport.authenticate('github', {
    successRedirect: "/dashboard",
    failureRedirect: '/auth/login'
}));
//login form
router.get("/login", checkAuth_1.forwardAuthenticated, function (req, res) {
    var messages = req.session.messages;
    // Clear the session messages
    req.session.messages = [];
    res.render("login", {
        messages: messages
    });
});
//login button
router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/auth/login",
    failureMessage: true,
}));
//logout button
router.get("/logout", function (req, res) {
    req.logout(function (err) {
        if (err)
            console.log(err);
    });
    req.session.destroy(function (err) {
        if (err)
            console.log(err);
    });
    res.redirect("/auth/login");
});
exports.default = router;
