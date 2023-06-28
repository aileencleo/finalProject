"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkAuth_1 = require("./middleware/checkAuth");
var passportMiddleware_1 = require("./middleware/passportMiddleware");
var authRoute_1 = require("./routes/authRoute");
var indexRoute_1 = require("./routes/indexRoute");
var express = require("express");
var expressLayouts = require("express-ejs-layouts");
var session = require("express-session");
var path = require("path");
var flash = require("express-flash");
var passport = require('passport');
var port = process.env.port || 8003;
var app = express();
app.use(require('express-flash')());
//use ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
//for CSS 
app.use('/public', express.static('public', {
    setHeaders: function (res, path) {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        }
    },
}));
//initialize express session
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000,
    },
    store: new session.MemoryStore(),
}));
app.use(flash());
// Add middleware to clear flash messages
app.use(function (req, res, next) {
    res.locals.messages = req.flash();
    next();
});
// Middleware
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
(0, passportMiddleware_1.default)(app);
app.use(function (req, res, next) {
    console.log("User details are: ");
    console.log(req.user);
    console.log("Entire sessionID object:");
    console.log(req.session.id);
    console.log("Entire session object:");
    console.log(req.session);
    console.log("Session details are: ");
    console.log(req.session.passport);
    next();
});
app.use("/", indexRoute_1.default);
app.use("/auth", authRoute_1.default);
// Define the '/auth/login' route handler
app.post('/auth/login', function (req, res, next) {
    // Clear flash messages before handling the request
    req.flash('error', '');
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            req.flash('error', info.message); // Set flash message for current error
            return res.redirect('/auth/login');
        }
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            // Store the user's name in the session
            req.session.name = user.name;
            return res.redirect('/dashboard');
        });
    })(req, res, next);
});
// GitHub login callback route
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/auth/login' }), function (req, res) {
    res.redirect('/dashboard');
});
// checks if the user is logged in
//redirects user to the /auth/login if they try to access the /dashboard but not logged in
app.get('/dashboard', checkAuth_1.ensureAuthenticated, function (req, res) {
    res.render('dashboard', {
        name: req.session.name,
    });
});
app.listen(port, function () {
    console.log("\uD83D\uDE80 Server has started on port ".concat(port));
});
