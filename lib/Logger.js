"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var debug_1 = __importDefault(require("debug"));
var APP_NAME = 'mediasoup-client';
var Logger = /** @class */ (function () {
    function Logger(prefix) {
        if (prefix) {
            this._debug = debug_1.default(APP_NAME + ":" + prefix);
            this._warn = debug_1.default(APP_NAME + ":WARN:" + prefix);
            this._error = debug_1.default(APP_NAME + ":ERROR:" + prefix);
        }
        else {
            this._debug = debug_1.default(APP_NAME);
            this._warn = debug_1.default(APP_NAME + ":WARN");
            this._error = debug_1.default(APP_NAME + ":ERROR");
        }
        /* eslint-disable no-console */
        this._debug.log = console.info.bind(console);
        this._warn.log = console.warn.bind(console);
        this._error.log = console.error.bind(console);
        /* eslint-enable no-console */
    }
    Object.defineProperty(Logger.prototype, "debug", {
        get: function () {
            return this._debug;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "warn", {
        get: function () {
            return this._warn;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Logger.prototype, "error", {
        get: function () {
            return this._error;
        },
        enumerable: false,
        configurable: true
    });
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=Logger.js.map