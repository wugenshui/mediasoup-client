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
exports.Producer = void 0;
var Logger_1 = require("./Logger");
var EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
var errors_1 = require("./errors");
var logger = new Logger_1.Logger('Producer');
var Producer = /** @class */ (function (_super) {
    __extends(Producer, _super);
    /**
     * @emits transportclose
     * @emits trackended
     * @emits @replacetrack - (track: MediaStreamTrack | null)
     * @emits @setmaxspatiallayer - (spatialLayer: string)
     * @emits @setrtpencodingparameters - (params: any)
     * @emits @getstats
     * @emits @close
     */
    function Producer(_a) {
        var id = _a.id, localId = _a.localId, rtpSender = _a.rtpSender, track = _a.track, rtpParameters = _a.rtpParameters, stopTracks = _a.stopTracks, disableTrackOnPause = _a.disableTrackOnPause, zeroRtpOnPause = _a.zeroRtpOnPause, appData = _a.appData;
        var _this = _super.call(this) || this;
        // Closed flag.
        _this._closed = false;
        // Observer instance.
        _this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
        logger.debug('constructor()');
        _this._id = id;
        _this._localId = localId;
        _this._rtpSender = rtpSender;
        _this._track = track;
        _this._kind = track.kind;
        _this._rtpParameters = rtpParameters;
        _this._paused = disableTrackOnPause ? !track.enabled : false;
        _this._maxSpatialLayer = undefined;
        _this._stopTracks = stopTracks;
        _this._disableTrackOnPause = disableTrackOnPause;
        _this._zeroRtpOnPause = zeroRtpOnPause;
        _this._appData = appData;
        _this._onTrackEnded = _this._onTrackEnded.bind(_this);
        // NOTE: Minor issue. If zeroRtpOnPause is true, we cannot emit the
        // '@replacetrack' event here, so RTCRtpSender.track won't be null.
        _this._handleTrack();
        return _this;
    }
    Object.defineProperty(Producer.prototype, "id", {
        /**
         * Producer id.
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "localId", {
        /**
         * Local id.
         */
        get: function () {
            return this._localId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "closed", {
        /**
         * Whether the Producer is closed.
         */
        get: function () {
            return this._closed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "kind", {
        /**
         * Media kind.
         */
        get: function () {
            return this._kind;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "rtpSender", {
        /**
         * Associated RTCRtpSender.
         */
        get: function () {
            return this._rtpSender;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "track", {
        /**
         * The associated track.
         */
        get: function () {
            return this._track;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "rtpParameters", {
        /**
         * RTP parameters.
         */
        get: function () {
            return this._rtpParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "paused", {
        /**
         * Whether the Producer is paused.
         */
        get: function () {
            return this._paused;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "maxSpatialLayer", {
        /**
         * Max spatial layer.
         *
         * @type {Number | undefined}
         */
        get: function () {
            return this._maxSpatialLayer;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Producer.prototype, "appData", {
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
    Object.defineProperty(Producer.prototype, "observer", {
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
     * Closes the Producer.
     */
    Producer.prototype.close = function () {
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
    Producer.prototype.transportClosed = function () {
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
     * Get associated RTCRtpSender stats.
     */
    Producer.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._closed)
                    throw new errors_1.InvalidStateError('closed');
                return [2 /*return*/, this.safeEmitAsPromise('@getstats')];
            });
        });
    };
    /**
     * Pauses sending media.
     */
    Producer.prototype.pause = function () {
        logger.debug('pause()');
        if (this._closed) {
            logger.error('pause() | Producer closed');
            return;
        }
        this._paused = true;
        if (this._track && this._disableTrackOnPause) {
            this._track.enabled = false;
        }
        if (this._zeroRtpOnPause) {
            this.safeEmitAsPromise('@replacetrack', null)
                .catch(function () { });
        }
        // Emit observer event.
        this._observer.safeEmit('pause');
    };
    /**
     * Resumes sending media.
     */
    Producer.prototype.resume = function () {
        logger.debug('resume()');
        if (this._closed) {
            logger.error('resume() | Producer closed');
            return;
        }
        this._paused = false;
        if (this._track && this._disableTrackOnPause) {
            this._track.enabled = true;
        }
        if (this._zeroRtpOnPause) {
            this.safeEmitAsPromise('@replacetrack', this._track)
                .catch(function () { });
        }
        // Emit observer event.
        this._observer.safeEmit('resume');
    };
    /**
     * Replaces the current track with a new one or null.
     */
    Producer.prototype.replaceTrack = function (_a) {
        var track = _a.track;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.debug('replaceTrack() [track:%o]', track);
                        if (this._closed) {
                            // This must be done here. Otherwise there is no chance to stop the given
                            // track.
                            if (track && this._stopTracks) {
                                try {
                                    track.stop();
                                }
                                catch (error) { }
                            }
                            throw new errors_1.InvalidStateError('closed');
                        }
                        else if (track && track.readyState === 'ended') {
                            throw new errors_1.InvalidStateError('track ended');
                        }
                        // Do nothing if this is the same track as the current handled one.
                        if (track === this._track) {
                            logger.debug('replaceTrack() | same track, ignored');
                            return [2 /*return*/];
                        }
                        if (!(!this._zeroRtpOnPause || !this._paused)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.safeEmitAsPromise('@replacetrack', track)];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        // Destroy the previous track.
                        this._destroyTrack();
                        // Set the new track.
                        this._track = track;
                        // If this Producer was paused/resumed and the state of the new
                        // track does not match, fix it.
                        if (this._track && this._disableTrackOnPause) {
                            if (!this._paused)
                                this._track.enabled = true;
                            else if (this._paused)
                                this._track.enabled = false;
                        }
                        // Handle the effective track.
                        this._handleTrack();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the video max spatial layer to be sent.
     */
    Producer.prototype.setMaxSpatialLayer = function (spatialLayer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._closed)
                            throw new errors_1.InvalidStateError('closed');
                        else if (this._kind !== 'video')
                            throw new errors_1.UnsupportedError('not a video Producer');
                        else if (typeof spatialLayer !== 'number')
                            throw new TypeError('invalid spatialLayer');
                        if (spatialLayer === this._maxSpatialLayer)
                            return [2 /*return*/];
                        return [4 /*yield*/, this.safeEmitAsPromise('@setmaxspatiallayer', spatialLayer)];
                    case 1:
                        _a.sent();
                        this._maxSpatialLayer = spatialLayer;
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the DSCP value.
     */
    Producer.prototype.setRtpEncodingParameters = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this._closed)
                            throw new errors_1.InvalidStateError('closed');
                        else if (typeof params !== 'object')
                            throw new TypeError('invalid params');
                        return [4 /*yield*/, this.safeEmitAsPromise('@setrtpencodingparameters', params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Producer.prototype._onTrackEnded = function () {
        logger.debug('track "ended" event');
        this.safeEmit('trackended');
        // Emit observer event.
        this._observer.safeEmit('trackended');
    };
    Producer.prototype._handleTrack = function () {
        if (!this._track)
            return;
        this._track.addEventListener('ended', this._onTrackEnded);
    };
    Producer.prototype._destroyTrack = function () {
        if (!this._track)
            return;
        try {
            this._track.removeEventListener('ended', this._onTrackEnded);
            // Just stop the track unless the app set stopTracks: false.
            if (this._stopTracks)
                this._track.stop();
        }
        catch (error) { }
    };
    return Producer;
}(EnhancedEventEmitter_1.EnhancedEventEmitter));
exports.Producer = Producer;
//# sourceMappingURL=Producer.js.map