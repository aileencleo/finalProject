"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var PassportConfig_1 = require("./PassportConfig");
var localStrategy_1 = require("./passportStrategies/localStrategy");
var githubStrategy_1 = require("./passportStrategies/githubStrategy");
// No need to actually pass the instance of passport since it returns a singleton
var passportConfig = new PassportConfig_1.default([localStrategy_1.default, githubStrategy_1.default]);
//passportConfig.addStrategies([localStrategy, passportGitHubStrategy]);
var passportMiddleware = function (app) {
    app.use(passport.initialize());
    app.use(passport.session());
};
exports.default = passportMiddleware;
