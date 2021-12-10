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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consumer = void 0;
var Logger_1 = require("./Logger");
var EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
var errors_1 = require("./errors");
var logger = new Logger_1.Logger('Consumer');
var Consumer = /** @class */ (function (_super) {
    __extends(Consumer, _super);
    /**
     * @emits transportclose
     * @emits trackended
     * @emits @getstats
     * @emits @close
     */
    function Consumer(_a) {
        var id = _a.id, localId = _a.localId, producerId = _a.producerId, rtpReceiver = _a.rtpReceiver, track = _a.track, rtpParameters = _a.rtpParameters, appData = _a.appData;
        var _this = _super.call(this) || this;
        // Closed flag.
        _this._closed = false;
        // Observer instance.
        _this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
        logger.debug('constructor()');
        _this._id = id;
        _this._localId = localId;
        _this._producerId = producerId;
        _this._rtpReceiver = rtpReceiver;
        _this._track = track;
        _this._rtpParameters = rtpParameters;
        _this._paused = !track.enabled;
        _this._appData = appData;
        _this._onTrackEnded = _this._onTrackEnded.bind(_this);
        _this._handleTrack();
        return _this;
    }
    Object.defineProperty(Consumer.prototype, "id", {
        /**
         * Consumer id.
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "localId", {
        /**
         * Local id.
         */
        get: function () {
            return this._localId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "producerId", {
        /**
         * Associated Producer id.
         */
        get: function () {
            return this._producerId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "closed", {
        /**
         * Whether the Consumer is closed.
         */
        get: function () {
            return this._closed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "kind", {
        /**
         * Media kind.
         */
        get: function () {
            return this._track.kind;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "rtpReceiver", {
        /**
         * Associated RTCRtpReceiver.
         */
        get: function () {
            return this._rtpReceiver;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "track", {
        /**
         * The associated track.
         */
        get: function () {
            return this._track;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "rtpParameters", {
        /**
         * RTP parameters.
         */
        get: function () {
            return this._rtpParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "paused", {
        /**
         * Whether the Consumer is paused.
         */
        get: function () {
            return this._paused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "appData", {
        /**
         * App custom data.
         */
        get: function () {
            return this._appData;
        },
        /**
         * Invalid setter.
         */
        set: function (appData) {
            throw new Error('cannot override appData object');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Consumer.prototype, "observer", {
        /**
         * Observer.
         *
         * @emits close
         * @emits pause
         * @emits resume
         * @emits trackended
         */
        get: function () {
            return this._observer;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Closes the Consumer.
     */
    Consumer.prototype.close = function () {
        if (this._closed)
            return;
        logger.debug('close()');
        this._closed = true;
        this._destroyTrack();
        this.emit('@close');
        // Emit observer event.
        this._observer.safeEmit('close');
    };
    /**
     * Transport was closed.
     */
    Consumer.prototype.transportClosed = function () {
        if (this._closed)
            return;
        logger.debug('transportClosed()');
        this._closed = true;
        this._destroyTrack();
        this.safeEmit('transportclose');
        // Emit observer event.
        this._observer.safeEmit('close');
    };
    /**
     * Get associated RTCRtpReceiver stats.
     */
    Consumer.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._closed)
                    throw new errors_1.InvalidStateError('closed');
                return [2 /*return*/, this.safeEmitAsPromise('@getstats')];
            });
        });
    };
    /**
     * Pauses receiving media.
     */
    Consumer.prototype.pause = function () {
        logger.debug('pause()');
        if (this._closed) {
            logger.error('pause() | Consumer closed');
            return;
        }
        this._paused = true;
        this._track.enabled = false;
        // Emit observer event.
        this._observer.safeEmit('pause');
    };
    /**
     * Resumes receiving media.
     */
    Consumer.prototype.resume = function () {
        logger.debug('resume()');
        if (this._closed) {
            logger.error('resume() | Consumer closed');
            return;
        }
        this._paused = false;
        this._track.enabled = true;
        // Emit observer event.
        this._observer.safeEmit('resume');
    };
    Consumer.prototype._onTrackEnded = function () {
        logger.debug('track "ended" event');
        this.safeEmit('trackended');
        // Emit observer event.
        this._observer.safeEmit('trackended');
    };
    Consumer.prototype._handleTrack = function () {
        this._track.addEventListener('ended', this._onTrackEnded);
    };
    Consumer.prototype._destroyTrack = function () {
        try {
            this._track.removeEventListener('ended', this._onTrackEnded);
            this._track.stop();
        }
        catch (error) { }
    };
    return Consumer;
}(EnhancedEventEmitter_1.EnhancedEventEmitter));
exports.Consumer = Consumer;
//# sourceMappingURL=Consumer.js.map