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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
var awaitqueue_1 = require("awaitqueue");
var Logger_1 = require("./Logger");
var EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
var errors_1 = require("./errors");
var utils = __importStar(require("./utils"));
var ortc = __importStar(require("./ortc"));
var Producer_1 = require("./Producer");
var Consumer_1 = require("./Consumer");
var DataProducer_1 = require("./DataProducer");
var DataConsumer_1 = require("./DataConsumer");
var logger = new Logger_1.Logger('Transport');
var Transport = /** @class */ (function (_super) {
    __extends(Transport, _super);
    /**
     * @emits connect - (transportLocalParameters: any, callback: Function, errback: Function)
     * @emits connectionstatechange - (connectionState: ConnectionState)
     * @emits produce - (producerLocalParameters: any, callback: Function, errback: Function)
     * @emits producedata - (dataProducerLocalParameters: any, callback: Function, errback: Function)
     */
    function Transport(_a) {
        var direction = _a.direction, id = _a.id, iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy, additionalSettings = _a.additionalSettings, proprietaryConstraints = _a.proprietaryConstraints, appData = _a.appData, handlerFactory = _a.handlerFactory, extendedRtpCapabilities = _a.extendedRtpCapabilities, canProduceByKind = _a.canProduceByKind;
        var _this = _super.call(this) || this;
        // Closed flag.
        _this._closed = false;
        // Transport connection state.
        _this._connectionState = 'new';
        // Map of Producers indexed by id.
        _this._producers = new Map();
        // Map of Consumers indexed by id.
        _this._consumers = new Map();
        // Map of DataProducers indexed by id.
        _this._dataProducers = new Map();
        // Map of DataConsumers indexed by id.
        _this._dataConsumers = new Map();
        // Whether the Consumer for RTP probation has been created.
        _this._probatorConsumerCreated = false;
        // AwaitQueue instance to make async tasks happen sequentially.
        _this._awaitQueue = new awaitqueue_1.AwaitQueue({ ClosedErrorClass: errors_1.InvalidStateError });
        // Observer instance.
        _this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
        logger.debug('constructor() [id:%s, direction:%s]', id, direction);
        _this._id = id;
        _this._direction = direction;
        _this._extendedRtpCapabilities = extendedRtpCapabilities;
        _this._canProduceByKind = canProduceByKind;
        _this._maxSctpMessageSize =
            sctpParameters ? sctpParameters.maxMessageSize : null;
        // Clone and sanitize additionalSettings.
        additionalSettings = utils.clone(additionalSettings, {});
        delete additionalSettings.iceServers;
        delete additionalSettings.iceTransportPolicy;
        delete additionalSettings.bundlePolicy;
        delete additionalSettings.rtcpMuxPolicy;
        delete additionalSettings.sdpSemantics;
        _this._handler = handlerFactory();
        _this._handler.run({
            direction: direction,
            iceParameters: iceParameters,
            iceCandidates: iceCandidates,
            dtlsParameters: dtlsParameters,
            sctpParameters: sctpParameters,
            iceServers: iceServers,
            iceTransportPolicy: iceTransportPolicy,
            additionalSettings: additionalSettings,
            proprietaryConstraints: proprietaryConstraints,
            extendedRtpCapabilities: extendedRtpCapabilities
        });
        _this._appData = appData;
        _this._handleHandler();
        return _this;
    }
    Object.defineProperty(Transport.prototype, "id", {
        /**
         * Transport id.
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transport.prototype, "closed", {
        /**
         * Whether the Transport is closed.
         */
        get: function () {
            return this._closed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transport.prototype, "direction", {
        /**
         * Transport direction.
         */
        get: function () {
            return this._direction;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transport.prototype, "handler", {
        /**
         * RTC handler instance.
         */
        get: function () {
            return this._handler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transport.prototype, "connectionState", {
        /**
         * Connection state.
         */
        get: function () {
            return this._connectionState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Transport.prototype, "appData", {
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
    Object.defineProperty(Transport.prototype, "observer", {
        /**
         * Observer.
         *
         * @emits close
         * @emits newproducer - (producer: Producer)
         * @emits newconsumer - (producer: Producer)
         * @emits newdataproducer - (dataProducer: DataProducer)
         * @emits newdataconsumer - (dataProducer: DataProducer)
         */
        get: function () {
            return this._observer;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Close the Transport.
     */
    Transport.prototype.close = function () {
        var e_1, _a, e_2, _b, e_3, _c, e_4, _d;
        if (this._closed)
            return;
        logger.debug('close()');
        this._closed = true;
        // Close the AwaitQueue.
        this._awaitQueue.close();
        // Close the handler.
        this._handler.close();
        try {
            // Close all Producers.
            for (var _e = __values(this._producers.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var producer = _f.value;
                producer.transportClosed();
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_a = _e.return)) _a.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this._producers.clear();
        try {
            // Close all Consumers.
            for (var _g = __values(this._consumers.values()), _h = _g.next(); !_h.done; _h = _g.next()) {
                var consumer = _h.value;
                consumer.transportClosed();
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
            }
            finally { if (e_2) throw e_2.error; }
        }
        this._consumers.clear();
        try {
            // Close all DataProducers.
            for (var _j = __values(this._dataProducers.values()), _k = _j.next(); !_k.done; _k = _j.next()) {
                var dataProducer = _k.value;
                dataProducer.transportClosed();
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
            }
            finally { if (e_3) throw e_3.error; }
        }
        this._dataProducers.clear();
        try {
            // Close all DataConsumers.
            for (var _l = __values(this._dataConsumers.values()), _m = _l.next(); !_m.done; _m = _l.next()) {
                var dataConsumer = _m.value;
                dataConsumer.transportClosed();
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
            }
            finally { if (e_4) throw e_4.error; }
        }
        this._dataConsumers.clear();
        // Emit observer event.
        this._observer.safeEmit('close');
    };
    /**
     * Get associated Transport (RTCPeerConnection) stats.
     *
     * @returns {RTCStatsReport}
     */
    Transport.prototype.getStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this._closed)
                    throw new errors_1.InvalidStateError('closed');
                return [2 /*return*/, this._handler.getTransportStats()];
            });
        });
    };
    /**
     * Restart ICE connection.
     */
    Transport.prototype.restartIce = function (_a) {
        var iceParameters = _a.iceParameters;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                logger.debug('restartIce()');
                if (this._closed)
                    throw new errors_1.InvalidStateError('closed');
                else if (!iceParameters)
                    throw new TypeError('missing iceParameters');
                // Enqueue command.
                return [2 /*return*/, this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, this._handler.restartIce(iceParameters)];
                    }); }); }, 'transport.restartIce()')];
            });
        });
    };
    /**
     * Update ICE servers.
     */
    Transport.prototype.updateIceServers = function (_a) {
        var iceServers = (_a === void 0 ? {} : _a).iceServers;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_b) {
                logger.debug('updateIceServers()');
                if (this._closed)
                    throw new errors_1.InvalidStateError('closed');
                else if (!Array.isArray(iceServers))
                    throw new TypeError('missing iceServers');
                // Enqueue command.
                return [2 /*return*/, this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                        return [2 /*return*/, this._handler.updateIceServers(iceServers)];
                    }); }); }, 'transport.updateIceServers()')];
            });
        });
    };
    /**
     * Create a Producer.
     */
    Transport.prototype.produce = function (_a) {
        var _b = _a === void 0 ? {} : _a, track = _b.track, encodings = _b.encodings, codecOptions = _b.codecOptions, codec = _b.codec, _c = _b.stopTracks, stopTracks = _c === void 0 ? true : _c, _d = _b.disableTrackOnPause, disableTrackOnPause = _d === void 0 ? true : _d, _e = _b.zeroRtpOnPause, zeroRtpOnPause = _e === void 0 ? false : _e, _f = _b.appData, appData = _f === void 0 ? {} : _f;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_g) {
                logger.debug('produce() [track:%o]', track);
                if (!track)
                    throw new TypeError('missing track');
                else if (this._direction !== 'send')
                    throw new errors_1.UnsupportedError('not a sending Transport');
                else if (!this._canProduceByKind[track.kind])
                    throw new errors_1.UnsupportedError("cannot produce " + track.kind);
                else if (track.readyState === 'ended')
                    throw new errors_1.InvalidStateError('track ended');
                else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
                    throw new TypeError('no "connect" listener set into this transport');
                else if (this.listenerCount('produce') === 0)
                    throw new TypeError('no "produce" listener set into this transport');
                else if (appData && typeof appData !== 'object')
                    throw new TypeError('if given, appData must be an object');
                // Enqueue command.
                return [2 /*return*/, this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () {
                        var normalizedEncodings, _a, localId, rtpParameters, rtpSender, id, producer, error_1;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (encodings && !Array.isArray(encodings)) {
                                        throw TypeError('encodings must be an array');
                                    }
                                    else if (encodings && encodings.length === 0) {
                                        normalizedEncodings = undefined;
                                    }
                                    else if (encodings) {
                                        normalizedEncodings = encodings
                                            .map(function (encoding) {
                                            var normalizedEncoding = { active: true };
                                            if (encoding.active === false)
                                                normalizedEncoding.active = false;
                                            if (typeof encoding.dtx === 'boolean')
                                                normalizedEncoding.dtx = encoding.dtx;
                                            if (typeof encoding.scalabilityMode === 'string')
                                                normalizedEncoding.scalabilityMode = encoding.scalabilityMode;
                                            if (typeof encoding.scaleResolutionDownBy === 'number')
                                                normalizedEncoding.scaleResolutionDownBy = encoding.scaleResolutionDownBy;
                                            if (typeof encoding.maxBitrate === 'number')
                                                normalizedEncoding.maxBitrate = encoding.maxBitrate;
                                            if (typeof encoding.maxFramerate === 'number')
                                                normalizedEncoding.maxFramerate = encoding.maxFramerate;
                                            if (typeof encoding.adaptivePtime === 'boolean')
                                                normalizedEncoding.adaptivePtime = encoding.adaptivePtime;
                                            if (typeof encoding.priority === 'string')
                                                normalizedEncoding.priority = encoding.priority;
                                            if (typeof encoding.networkPriority === 'string')
                                                normalizedEncoding.networkPriority = encoding.networkPriority;
                                            return normalizedEncoding;
                                        });
                                    }
                                    return [4 /*yield*/, this._handler.send({
                                            track: track,
                                            encodings: normalizedEncodings,
                                            codecOptions: codecOptions,
                                            codec: codec
                                        })];
                                case 1:
                                    _a = _b.sent(), localId = _a.localId, rtpParameters = _a.rtpParameters, rtpSender = _a.rtpSender;
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    // This will fill rtpParameters's missing fields with default values.
                                    ortc.validateRtpParameters(rtpParameters);
                                    return [4 /*yield*/, this.safeEmitAsPromise('produce', {
                                            kind: track.kind,
                                            rtpParameters: rtpParameters,
                                            appData: appData
                                        })];
                                case 3:
                                    id = (_b.sent()).id;
                                    producer = new Producer_1.Producer({
                                        id: id,
                                        localId: localId,
                                        rtpSender: rtpSender,
                                        track: track,
                                        rtpParameters: rtpParameters,
                                        stopTracks: stopTracks,
                                        disableTrackOnPause: disableTrackOnPause,
                                        zeroRtpOnPause: zeroRtpOnPause,
                                        appData: appData
                                    });
                                    this._producers.set(producer.id, producer);
                                    this._handleProducer(producer);
                                    // Emit observer event.
                                    this._observer.safeEmit('newproducer', producer);
                                    return [2 /*return*/, producer];
                                case 4:
                                    error_1 = _b.sent();
                                    this._handler.stopSending(localId)
                                        .catch(function () { });
                                    throw error_1;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); }, 'transport.produce()')
                        // This catch is needed to stop the given track if the command above
                        // failed due to closed Transport.
                        .catch(function (error) {
                        if (stopTracks) {
                            try {
                                track.stop();
                            }
                            catch (error2) { }
                        }
                        throw error;
                    })];
            });
        });
    };
    /**
     * Create a Consumer to consume a remote Producer.
     */
    Transport.prototype.consume = function (_a) {
        var id = _a.id, producerId = _a.producerId, kind = _a.kind, rtpParameters = _a.rtpParameters, _b = _a.appData, appData = _b === void 0 ? {} : _b;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_c) {
                logger.debug('consume()');
                rtpParameters = utils.clone(rtpParameters, undefined);
                if (this._closed)
                    throw new errors_1.InvalidStateError('closed');
                else if (this._direction !== 'recv')
                    throw new errors_1.UnsupportedError('not a receiving Transport');
                else if (typeof id !== 'string')
                    throw new TypeError('missing id');
                else if (typeof producerId !== 'string')
                    throw new TypeError('missing producerId');
                else if (kind !== 'audio' && kind !== 'video')
                    throw new TypeError("invalid kind '" + kind + "'");
                else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
                    throw new TypeError('no "connect" listener set into this transport');
                else if (appData && typeof appData !== 'object')
                    throw new TypeError('if given, appData must be an object');
                // Enqueue command.
                return [2 /*return*/, this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () {
                        var canConsume, _a, localId, rtpReceiver, track, consumer, probatorRtpParameters, error_2;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    canConsume = ortc.canReceive(rtpParameters, this._extendedRtpCapabilities);
                                    if (!canConsume)
                                        throw new errors_1.UnsupportedError('cannot consume this Producer');
                                    return [4 /*yield*/, this._handler.receive({ trackId: id, kind: kind, rtpParameters: rtpParameters })];
                                case 1:
                                    _a = _b.sent(), localId = _a.localId, rtpReceiver = _a.rtpReceiver, track = _a.track;
                                    consumer = new Consumer_1.Consumer({
                                        id: id,
                                        localId: localId,
                                        producerId: producerId,
                                        rtpReceiver: rtpReceiver,
                                        track: track,
                                        rtpParameters: rtpParameters,
                                        appData: appData
                                    });
                                    this._consumers.set(consumer.id, consumer);
                                    this._handleConsumer(consumer);
                                    if (!(!this._probatorConsumerCreated && kind === 'video')) return [3 /*break*/, 5];
                                    _b.label = 2;
                                case 2:
                                    _b.trys.push([2, 4, , 5]);
                                    probatorRtpParameters = ortc.generateProbatorRtpParameters(consumer.rtpParameters);
                                    return [4 /*yield*/, this._handler.receive({
                                            trackId: 'probator',
                                            kind: 'video',
                                            rtpParameters: probatorRtpParameters
                                        })];
                                case 3:
                                    _b.sent();
                                    logger.debug('consume() | Consumer for RTP probation created');
                                    this._probatorConsumerCreated = true;
                                    return [3 /*break*/, 5];
                                case 4:
                                    error_2 = _b.sent();
                                    logger.error('consume() | failed to create Consumer for RTP probation:%o', error_2);
                                    return [3 /*break*/, 5];
                                case 5:
                                    // Emit observer event.
                                    this._observer.safeEmit('newconsumer', consumer);
                                    return [2 /*return*/, consumer];
                            }
                        });
                    }); }, 'transport.consume()')];
            });
        });
    };
    /**
     * Create a DataProducer
     */
    Transport.prototype.produceData = function (_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.ordered, ordered = _c === void 0 ? true : _c, maxPacketLifeTime = _b.maxPacketLifeTime, maxRetransmits = _b.maxRetransmits, _d = _b.priority, priority = _d === void 0 ? 'low' : _d, _e = _b.label, label = _e === void 0 ? '' : _e, _f = _b.protocol, protocol = _f === void 0 ? '' : _f, _g = _b.appData, appData = _g === void 0 ? {} : _g;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_h) {
                logger.debug('produceData()');
                if (this._direction !== 'send')
                    throw new errors_1.UnsupportedError('not a sending Transport');
                else if (!this._maxSctpMessageSize)
                    throw new errors_1.UnsupportedError('SCTP not enabled by remote Transport');
                else if (!['very-low', 'low', 'medium', 'high'].includes(priority))
                    throw new TypeError('wrong priority');
                else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
                    throw new TypeError('no "connect" listener set into this transport');
                else if (this.listenerCount('producedata') === 0)
                    throw new TypeError('no "producedata" listener set into this transport');
                else if (appData && typeof appData !== 'object')
                    throw new TypeError('if given, appData must be an object');
                if (maxPacketLifeTime || maxRetransmits)
                    ordered = false;
                // Enqueue command.
                return [2 /*return*/, this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () {
                        var _a, dataChannel, sctpStreamParameters, id, dataProducer;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0: return [4 /*yield*/, this._handler.sendDataChannel({
                                        ordered: ordered,
                                        maxPacketLifeTime: maxPacketLifeTime,
                                        maxRetransmits: maxRetransmits,
                                        priority: priority,
                                        label: label,
                                        protocol: protocol
                                    })];
                                case 1:
                                    _a = _b.sent(), dataChannel = _a.dataChannel, sctpStreamParameters = _a.sctpStreamParameters;
                                    // This will fill sctpStreamParameters's missing fields with default values.
                                    ortc.validateSctpStreamParameters(sctpStreamParameters);
                                    return [4 /*yield*/, this.safeEmitAsPromise('producedata', {
                                            sctpStreamParameters: sctpStreamParameters,
                                            label: label,
                                            protocol: protocol,
                                            appData: appData
                                        })];
                                case 2:
                                    id = (_b.sent()).id;
                                    dataProducer = new DataProducer_1.DataProducer({ id: id, dataChannel: dataChannel, sctpStreamParameters: sctpStreamParameters, appData: appData });
                                    this._dataProducers.set(dataProducer.id, dataProducer);
                                    this._handleDataProducer(dataProducer);
                                    // Emit observer event.
                                    this._observer.safeEmit('newdataproducer', dataProducer);
                                    return [2 /*return*/, dataProducer];
                            }
                        });
                    }); }, 'transport.produceData()')];
            });
        });
    };
    /**
     * Create a DataConsumer
     */
    Transport.prototype.consumeData = function (_a) {
        var id = _a.id, dataProducerId = _a.dataProducerId, sctpStreamParameters = _a.sctpStreamParameters, _b = _a.label, label = _b === void 0 ? '' : _b, _c = _a.protocol, protocol = _c === void 0 ? '' : _c, _d = _a.appData, appData = _d === void 0 ? {} : _d;
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_e) {
                logger.debug('consumeData()');
                sctpStreamParameters = utils.clone(sctpStreamParameters, undefined);
                if (this._closed)
                    throw new errors_1.InvalidStateError('closed');
                else if (this._direction !== 'recv')
                    throw new errors_1.UnsupportedError('not a receiving Transport');
                else if (!this._maxSctpMessageSize)
                    throw new errors_1.UnsupportedError('SCTP not enabled by remote Transport');
                else if (typeof id !== 'string')
                    throw new TypeError('missing id');
                else if (typeof dataProducerId !== 'string')
                    throw new TypeError('missing dataProducerId');
                else if (this.listenerCount('connect') === 0 && this._connectionState === 'new')
                    throw new TypeError('no "connect" listener set into this transport');
                else if (appData && typeof appData !== 'object')
                    throw new TypeError('if given, appData must be an object');
                // This may throw.
                ortc.validateSctpStreamParameters(sctpStreamParameters);
                // Enqueue command.
                return [2 /*return*/, this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () {
                        var dataChannel, dataConsumer;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, this._handler.receiveDataChannel({
                                        sctpStreamParameters: sctpStreamParameters,
                                        label: label,
                                        protocol: protocol
                                    })];
                                case 1:
                                    dataChannel = (_a.sent()).dataChannel;
                                    dataConsumer = new DataConsumer_1.DataConsumer({
                                        id: id,
                                        dataProducerId: dataProducerId,
                                        dataChannel: dataChannel,
                                        sctpStreamParameters: sctpStreamParameters,
                                        appData: appData
                                    });
                                    this._dataConsumers.set(dataConsumer.id, dataConsumer);
                                    this._handleDataConsumer(dataConsumer);
                                    // Emit observer event.
                                    this._observer.safeEmit('newdataconsumer', dataConsumer);
                                    return [2 /*return*/, dataConsumer];
                            }
                        });
                    }); }, 'transport.consumeData()')];
            });
        });
    };
    Transport.prototype._handleHandler = function () {
        var _this = this;
        var handler = this._handler;
        handler.on('@connect', function (_a, callback, errback) {
            var dtlsParameters = _a.dtlsParameters;
            if (_this._closed) {
                errback(new errors_1.InvalidStateError('closed'));
                return;
            }
            _this.safeEmit('connect', { dtlsParameters: dtlsParameters }, callback, errback);
        });
        handler.on('@connectionstatechange', function (connectionState) {
            if (connectionState === _this._connectionState)
                return;
            logger.debug('connection state changed to %s', connectionState);
            _this._connectionState = connectionState;
            if (!_this._closed)
                _this.safeEmit('connectionstatechange', connectionState);
        });
    };
    Transport.prototype._handleProducer = function (producer) {
        var _this = this;
        producer.on('@close', function () {
            _this._producers.delete(producer.id);
            if (_this._closed)
                return;
            _this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this._handler.stopSending(producer.localId)];
            }); }); }, 'producer @close event')
                .catch(function (error) { return logger.warn('producer.close() failed:%o', error); });
        });
        producer.on('@replacetrack', function (track, callback, errback) {
            _this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this._handler.replaceTrack(producer.localId, track)];
            }); }); }, 'producer @replacetrack event')
                .then(callback)
                .catch(errback);
        });
        producer.on('@setmaxspatiallayer', function (spatialLayer, callback, errback) {
            _this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (this._handler.setMaxSpatialLayer(producer.localId, spatialLayer))];
                });
            }); }, 'producer @setmaxspatiallayer event')
                .then(callback)
                .catch(errback);
        });
        producer.on('@setrtpencodingparameters', function (params, callback, errback) {
            _this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, (this._handler.setRtpEncodingParameters(producer.localId, params))];
                });
            }); }, 'producer @setrtpencodingparameters event')
                .then(callback)
                .catch(errback);
        });
        producer.on('@getstats', function (callback, errback) {
            if (_this._closed)
                return errback(new errors_1.InvalidStateError('closed'));
            _this._handler.getSenderStats(producer.localId)
                .then(callback)
                .catch(errback);
        });
    };
    Transport.prototype._handleConsumer = function (consumer) {
        var _this = this;
        consumer.on('@close', function () {
            _this._consumers.delete(consumer.id);
            if (_this._closed)
                return;
            _this._awaitQueue.push(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/, this._handler.stopReceiving(consumer.localId)];
            }); }); }, 'consumer @close event')
                .catch(function () { });
        });
        consumer.on('@getstats', function (callback, errback) {
            if (_this._closed)
                return errback(new errors_1.InvalidStateError('closed'));
            _this._handler.getReceiverStats(consumer.localId)
                .then(callback)
                .catch(errback);
        });
    };
    Transport.prototype._handleDataProducer = function (dataProducer) {
        var _this = this;
        dataProducer.on('@close', function () {
            _this._dataProducers.delete(dataProducer.id);
        });
    };
    Transport.prototype._handleDataConsumer = function (dataConsumer) {
        var _this = this;
        dataConsumer.on('@close', function () {
            _this._dataConsumers.delete(dataConsumer.id);
        });
    };
    return Transport;
}(EnhancedEventEmitter_1.EnhancedEventEmitter));
exports.Transport = Transport;
//# sourceMappingURL=Transport.js.map