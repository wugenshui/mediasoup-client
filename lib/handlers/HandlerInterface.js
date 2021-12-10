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
exports.HandlerInterface = void 0;
var EnhancedEventEmitter_1 = require("../EnhancedEventEmitter");
var HandlerInterface = /** @class */ (function (_super) {
    __extends(HandlerInterface, _super);
    /**
     * @emits @connect - (
     *     { dtlsParameters: DtlsParameters },
     *     callback: Function,
     *     errback: Function
     *   )
     * @emits @connectionstatechange - (connectionState: ConnectionState)
     */
    function HandlerInterface() {
        return _super.call(this) || this;
    }
    return HandlerInterface;
}(EnhancedEventEmitter_1.EnhancedEventEmitter));
exports.HandlerInterface = HandlerInterface;
//# sourceMappingURL=HandlerInterface.js.map