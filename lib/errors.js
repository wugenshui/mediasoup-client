"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidStateError = exports.UnsupportedError = void 0;
/**
 * Error indicating not support for something.
 */
var UnsupportedError = /** @class */ (function (_super) {
    __extends(UnsupportedError, _super);
    function UnsupportedError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'UnsupportedError';
        if (Error.hasOwnProperty('captureStackTrace')) // Just in V8.
         {
            // @ts-ignore
            Error.captureStackTrace(_this, UnsupportedError);
        }
        else {
            _this.stack = (new Error(message)).stack;
        }
        return _this;
    }
    return UnsupportedError;
}(Error));
exports.UnsupportedError = UnsupportedError;
/**
 * Error produced when calling a method in an invalid state.
 */
var InvalidStateError = /** @class */ (function (_super) {
    __extends(InvalidStateError, _super);
    function InvalidStateError(message) {
        var _this = _super.call(this, message) || this;
        _this.name = 'InvalidStateError';
        if (Error.hasOwnProperty('captureStackTrace')) // Just in V8.
         {
            // @ts-ignore
            Error.captureStackTrace(_this, InvalidStateError);
        }
        else {
            _this.stack = (new Error(message)).stack;
        }
        return _this;
    }
    return InvalidStateError;
}(Error));
exports.InvalidStateError = InvalidStateError;
//# sourceMappingURL=errors.js.map