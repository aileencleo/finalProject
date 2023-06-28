"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.forwardAuthenticated = exports.ensureAuthenticated = void 0;
/*
FIX ME (types)
*/
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/auth/login");
};
exports.ensureAuthenticated = ensureAuthenticated;
/*
FIX ME (types)
*/
var forwardAuthenticated = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect("/dashboard");
};
exports.forwardAuthenticated = forwardAuthenticated;
//checks if user has an admin role
var isAdmin = function (req, res, next) {
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.redirect('/dashboard');
};
exports.isAdmin = isAdmin;
