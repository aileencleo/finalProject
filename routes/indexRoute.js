"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var checkAuth_1 = require("../middleware/checkAuth");
var router = express.Router();
//to root/main
router.get("/", function (req, res) {
    res.send("welcome");
});
//to dashboard
router.get("/dashboard", checkAuth_1.ensureAuthenticated, function (req, res) {
    res.render("dashboard", {
        user: req.user, // Pass the user object to the template
    });
});
//admin
router.get("/admin", checkAuth_1.ensureAuthenticated, checkAuth_1.isAdmin, function (req, res) {
    var sessions = Object.entries(req.sessionStore.sessions).map(function (_a) {
        var sessionId = _a[0], sessionData = _a[1];
        var session = JSON.parse(sessionData);
        var userId = session.passport && session.passport.user;
        console.log(userId);
        return {
            sessionId: sessionId,
            userId: userId || null,
        };
    });
    res.render("admin", {
        sessions: sessions,
        user: req.user,
    });
});
router.get("/admin/revoke-session/:sessionId", function (req, res) {
    var sessionId = req.params.sessionId;
    req.sessionStore.destroy(sessionId, function (err) {
        if (err) {
            console.log(err);
            res.redirect("/admin"); // Handle any error, redirect back to the admin page
        }
        else {
            res.redirect("/admin"); // Session successfully destroyed, redirect back to the admin page
        }
    });
});
exports.default = router;
