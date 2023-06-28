"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = exports.database = void 0;
var database = [
    {
        id: 1,
        name: "Jimmy Smith",
        email: "jimmy123@gmail.com",
        password: "123",
        role: "admin",
    },
    {
        id: 2,
        name: "Johnny Doe",
        email: "johnny123@gmail.com",
        password: "johnny123!",
        role: "user",
    },
    {
        id: 3,
        name: "Jonathan Chen",
        email: "jonathan123@gmail.com",
        password: "jonathan123!",
        role: "user",
    },
    {
        id: 4,
        name: "lostinthecity",
        email: "capriccio_000@yahoo.com",
        password: "",
        role: "user",
    },
];
exports.database = database;
var userModel = {
    findOne: function (email) {
        var user = database.find(function (user) { return user.email === email; });
        if (user) {
            return user;
        }
        throw new Error("Couldn't find user with email: ".concat(email));
    },
    findById: function (id) {
        var user = database.find(function (user) { return user.id === id; });
        if (user) {
            return user;
        }
        throw new Error("Couldn't find user with id: ".concat(id));
    },
    updateOne: function (id, update) {
        var userIndex = database.findIndex(function (user) { return user.id === id; });
        if (userIndex !== -1) {
            var updatedUser = __assign(__assign({}, database[userIndex]), update);
            database[userIndex] = updatedUser;
            return updatedUser;
        }
        throw new Error("Couldn't find user with id: ".concat(id));
    },
    getAllUsers: function () {
        return database;
    },
};
exports.userModel = userModel;
