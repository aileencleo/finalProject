"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByEmailIdAndPassword = void 0;
var userModel_1 = require("../models/userModel");
var getUserByEmailIdAndPassword = function (email, password) {
    var user = userModel_1.userModel.findOne(email);
    if (user) {
        if (isUserValid(user, password)) {
            return user;
        }
        else {
            throw new Error("Password is incorrect"); // Throw an error for incorrect password
        }
    }
    else {
        throw new Error("Could not find user with email: " + email); // Throw an error for email not found
    }
};
exports.getUserByEmailIdAndPassword = getUserByEmailIdAndPassword;
var getUserById = function (id) {
    var user = userModel_1.userModel.findById(id);
    if (user) {
        return user;
    }
    return null;
};
exports.getUserById = getUserById;
function isUserValid(user, password) {
    return user.password === password;
}
