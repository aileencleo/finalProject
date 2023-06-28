"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var passport = require("passport");
var PassportConfig = /** @class */ (function () {
    /*
     FIX ME 😭
     The problem with this class is... if the caller forgets to call
     the addStrategies method...our program won't work.

     Solution: You should refactor this class to take a constructor
     which receives strategies: PassportStrategy[]. Internally...call
     the addStrategies method within the constructor and make addStragies
     private from the outside world. This way, we can GUARANTEE that our
     passport strategies are added when this class is created. ⭐️ - done??
    */
    function PassportConfig(strategies) {
        this.addStrategies(strategies);
    }
    PassportConfig.prototype.addStrategies = function (strategies) {
        strategies.forEach(function (passportStrategy) {
            passport.use(passportStrategy.name, passportStrategy.strategy);
        });
    };
    return PassportConfig;
}());
exports.default = PassportConfig;
