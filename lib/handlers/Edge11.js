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
exports.Edge11 = void 0;
var Logger_1 = require("../Logger");
var errors_1 = require("../errors");
var utils = __importStar(require("../utils"));
var ortc = __importStar(require("../ortc"));
var edgeUtils = __importStar(require("./ortc/edgeUtils"));
var HandlerInterface_1 = require("./HandlerInterface");
var logger = new Logger_1.Logger('Edge11');
var Edge11 = /** @class */ (function (_super) {
    __extends(Edge11, _super);
    function Edge11() {
        var _this = _super.call(this) || this;
        // Map of RTCRtpSenders indexed by id.
        _this._rtpSenders = new Map();
        // Map of RTCRtpReceivers indexed by id.
        _this._rtpReceivers = new Map();
        // Next localId for sending tracks.
        _this._nextSendLocalId = 0;
        // Got transport local and remote parameters.
        _this._transportReady = false;
        return _this;
    }
    /**
     * Creates a factory function.
     */
    Edge11.createFactory = function () {
        return function () { return new Edge11(); };
    };
    Object.defineProperty(Edge11.prototype, "name", {
        get: function () {
            return 'Edge11';
        },
        enumerable: false,
        configurable: true
    });
    Edge11.prototype.close = function () {
        var e_1, _a, e_2, _b;
        logger.debug('close()');
        // Close the ICE gatherer.
        // NOTE: Not yet implemented by Edge.
        try {
            this._iceGatherer.close();
        }
        catch (error) { }
        // Close the ICE transport.
        try {
            this._iceTransport.stop();
        }
        catch (error) { }
        // Close the DTLS transport.
        try {
            this._dtlsTransport.stop();
        }
        catch (error) { }
        try {
            // Close RTCRtpSenders.
            for (var _c = __values(this._rtpSenders.values()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var rtpSender = _d.value;
                try {
                    rtpSender.stop();
                }
                catch (error) { }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
        try {
            // Close RTCRtpReceivers.
            for (var _e = __values(this._rtpReceivers.values()), _f = _e.next(); !_f.done; _f = _e.next()) {
                var rtpReceiver = _f.value;
                try {
                    rtpReceiver.stop();
                }
                catch (error) { }
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    Edge11.prototype.getNativeRtpCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('getNativeRtpCapabilities()');
                return [2 /*return*/, edgeUtils.getCapabilities()];
            });
        });
    };
    Edge11.prototype.getNativeSctpCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('getNativeSctpCapabilities()');
                return [2 /*return*/, {
                        numStreams: { OS: 0, MIS: 0 }
                    }];
            });
        });
    };
    Edge11.prototype.run = function (_a) {
        var direction = _a.direction, // eslint-disable-line @typescript-eslint/no-unused-vars
        iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, // eslint-disable-line @typescript-eslint/no-unused-vars
        iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy, additionalSettings = _a.additionalSettings, // eslint-disable-line @typescript-eslint/no-unused-vars
        proprietaryConstraints = _a.proprietaryConstraints, // eslint-disable-line @typescript-eslint/no-unused-vars
        extendedRtpCapabilities = _a.extendedRtpCapabilities;
        logger.debug('run()');
        this._sendingRtpParametersByKind =
            {
                audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
            };
        this._remoteIceParameters = iceParameters;
        this._remoteIceCandidates = iceCandidates;
        this._remoteDtlsParameters = dtlsParameters;
        this._cname = "CNAME-" + utils.generateRandomNumber();
        this._setIceGatherer({ iceServers: iceServers, iceTransportPolicy: iceTransportPolicy });
        this._setIceTransport();
        this._setDtlsTransport();
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Edge11.prototype.updateIceServers = function (iceServers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                // NOTE: Edge 11 does not implement iceGatherer.gater().
                throw new errors_1.UnsupportedError('not supported');
            });
        });
    };
    Edge11.prototype.restartIce = function (iceParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, candidate;
            var e_3, _c;
            return __generator(this, function (_d) {
                logger.debug('restartIce()');
                this._remoteIceParameters = iceParameters;
                if (!this._transportReady)
                    return [2 /*return*/];
                logger.debug('restartIce() | calling iceTransport.start()');
                this._iceTransport.start(this._iceGatherer, iceParameters, 'controlling');
                try {
                    for (_a = __values(this._remoteIceCandidates), _b = _a.next(); !_b.done; _b = _a.next()) {
                        candidate = _b.value;
                        this._iceTransport.addRemoteCandidate(candidate);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                this._iceTransport.addRemoteCandidate({});
                return [2 /*return*/];
            });
        });
    };
    Edge11.prototype.getTransportStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._iceTransport.getStats()];
            });
        });
    };
    Edge11.prototype.send = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a) {
        var track = _a.track, encodings = _a.encodings, codecOptions = _a.codecOptions, codec = _a.codec;
        return __awaiter(this, void 0, void 0, function () {
            var rtpSender, rtpParameters, useRtx, encodings_1, encodings_1_1, encoding, edgeRtpParameters, localId;
            var e_4, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
                        if (!!this._transportReady) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'server' })];
                    case 1:
                        _c.sent();
                        _c.label = 2;
                    case 2:
                        logger.debug('send() | calling new RTCRtpSender()');
                        rtpSender = new RTCRtpSender(track, this._dtlsTransport);
                        rtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
                        rtpParameters.codecs = ortc.reduceCodecs(rtpParameters.codecs, codec);
                        useRtx = rtpParameters.codecs
                            .some(function (_codec) { return /.+\/rtx$/i.test(_codec.mimeType); });
                        if (!encodings)
                            encodings = [{}];
                        try {
                            for (encodings_1 = __values(encodings), encodings_1_1 = encodings_1.next(); !encodings_1_1.done; encodings_1_1 = encodings_1.next()) {
                                encoding = encodings_1_1.value;
                                encoding.ssrc = utils.generateRandomNumber();
                                if (useRtx)
                                    encoding.rtx = { ssrc: utils.generateRandomNumber() };
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (encodings_1_1 && !encodings_1_1.done && (_b = encodings_1.return)) _b.call(encodings_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        rtpParameters.encodings = encodings;
                        // Fill RTCRtpParameters.rtcp.
                        rtpParameters.rtcp =
                            {
                                cname: this._cname,
                                reducedSize: true,
                                mux: true
                            };
                        edgeRtpParameters = edgeUtils.mangleRtpParameters(rtpParameters);
                        logger.debug('send() | calling rtpSender.send() [params:%o]', edgeRtpParameters);
                        return [4 /*yield*/, rtpSender.send(edgeRtpParameters)];
                    case 3:
                        _c.sent();
                        localId = String(this._nextSendLocalId);
                        this._nextSendLocalId++;
                        // Store it.
                        this._rtpSenders.set(localId, rtpSender);
                        return [2 /*return*/, { localId: localId, rtpParameters: rtpParameters, rtpSender: rtpSender }];
                }
            });
        });
    };
    Edge11.prototype.stopSending = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var rtpSender;
            return __generator(this, function (_a) {
                logger.debug('stopSending() [localId:%s]', localId);
                rtpSender = this._rtpSenders.get(localId);
                if (!rtpSender)
                    throw new Error('RTCRtpSender not found');
                this._rtpSenders.delete(localId);
                try {
                    logger.debug('stopSending() | calling rtpSender.stop()');
                    rtpSender.stop();
                }
                catch (error) {
                    logger.warn('stopSending() | rtpSender.stop() failed:%o', error);
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Edge11.prototype.replaceTrack = function (localId, track) {
        return __awaiter(this, void 0, void 0, function () {
            var rtpSender;
            return __generator(this, function (_a) {
                if (track) {
                    logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
                }
                else {
                    logger.debug('replaceTrack() [localId:%s, no track]', localId);
                }
                rtpSender = this._rtpSenders.get(localId);
                if (!rtpSender)
                    throw new Error('RTCRtpSender not found');
                rtpSender.setTrack(track);
                return [2 /*return*/];
            });
        });
    };
    Edge11.prototype.setMaxSpatialLayer = function (localId, spatialLayer) {
        return __awaiter(this, void 0, void 0, function () {
            var rtpSender, parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
                        rtpSender = this._rtpSenders.get(localId);
                        if (!rtpSender)
                            throw new Error('RTCRtpSender not found');
                        parameters = rtpSender.getParameters();
                        parameters.encodings
                            .forEach(function (encoding, idx) {
                            if (idx <= spatialLayer)
                                encoding.active = true;
                            else
                                encoding.active = false;
                        });
                        return [4 /*yield*/, rtpSender.setParameters(parameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Edge11.prototype.setRtpEncodingParameters = function (localId, params) {
        return __awaiter(this, void 0, void 0, function () {
            var rtpSender, parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
                        rtpSender = this._rtpSenders.get(localId);
                        if (!rtpSender)
                            throw new Error('RTCRtpSender not found');
                        parameters = rtpSender.getParameters();
                        parameters.encodings.forEach(function (encoding, idx) {
                            parameters.encodings[idx] = __assign(__assign({}, encoding), params);
                        });
                        return [4 /*yield*/, rtpSender.setParameters(parameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Edge11.prototype.getSenderStats = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var rtpSender;
            return __generator(this, function (_a) {
                rtpSender = this._rtpSenders.get(localId);
                if (!rtpSender)
                    throw new Error('RTCRtpSender not found');
                return [2 /*return*/, rtpSender.getStats()];
            });
        });
    };
    Edge11.prototype.sendDataChannel = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new errors_1.UnsupportedError('not implemented');
            });
        });
    };
    Edge11.prototype.receive = function (_a) {
        var trackId = _a.trackId, kind = _a.kind, rtpParameters = _a.rtpParameters;
        return __awaiter(this, void 0, void 0, function () {
            var rtpReceiver, edgeRtpParameters, localId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
                        if (!!this._transportReady) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'server' })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        logger.debug('receive() | calling new RTCRtpReceiver()');
                        rtpReceiver = new RTCRtpReceiver(this._dtlsTransport, kind);
                        rtpReceiver.addEventListener('error', function (event) {
                            logger.error('rtpReceiver "error" event [event:%o]', event);
                        });
                        edgeRtpParameters = edgeUtils.mangleRtpParameters(rtpParameters);
                        logger.debug('receive() | calling rtpReceiver.receive() [params:%o]', edgeRtpParameters);
                        return [4 /*yield*/, rtpReceiver.receive(edgeRtpParameters)];
                    case 3:
                        _b.sent();
                        localId = trackId;
                        // Store it.
                        this._rtpReceivers.set(localId, rtpReceiver);
                        return [2 /*return*/, {
                                localId: localId,
                                track: rtpReceiver.track,
                                rtpReceiver: rtpReceiver
                            }];
                }
            });
        });
    };
    Edge11.prototype.stopReceiving = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var rtpReceiver;
            return __generator(this, function (_a) {
                logger.debug('stopReceiving() [localId:%s]', localId);
                rtpReceiver = this._rtpReceivers.get(localId);
                if (!rtpReceiver)
                    throw new Error('RTCRtpReceiver not found');
                this._rtpReceivers.delete(localId);
                try {
                    logger.debug('stopReceiving() | calling rtpReceiver.stop()');
                    rtpReceiver.stop();
                }
                catch (error) {
                    logger.warn('stopReceiving() | rtpReceiver.stop() failed:%o', error);
                }
                return [2 /*return*/];
            });
        });
    };
    Edge11.prototype.getReceiverStats = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var rtpReceiver;
            return __generator(this, function (_a) {
                rtpReceiver = this._rtpReceivers.get(localId);
                if (!rtpReceiver)
                    throw new Error('RTCRtpReceiver not found');
                return [2 /*return*/, rtpReceiver.getStats()];
            });
        });
    };
    Edge11.prototype.receiveDataChannel = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new errors_1.UnsupportedError('not implemented');
            });
        });
    };
    Edge11.prototype._setIceGatherer = function (_a) {
        var iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy;
        var iceGatherer = new RTCIceGatherer({
            iceServers: iceServers || [],
            gatherPolicy: iceTransportPolicy || 'all'
        });
        iceGatherer.addEventListener('error', function (event) {
            logger.error('iceGatherer "error" event [event:%o]', event);
        });
        // NOTE: Not yet implemented by Edge, which starts gathering automatically.
        try {
            iceGatherer.gather();
        }
        catch (error) {
            logger.debug('_setIceGatherer() | iceGatherer.gather() failed: %s', error.toString());
        }
        this._iceGatherer = iceGatherer;
    };
    Edge11.prototype._setIceTransport = function () {
        var _this = this;
        var iceTransport = new RTCIceTransport(this._iceGatherer);
        // NOTE: Not yet implemented by Edge.
        iceTransport.addEventListener('statechange', function () {
            switch (iceTransport.state) {
                case 'checking':
                    _this.emit('@connectionstatechange', 'connecting');
                    break;
                case 'connected':
                case 'completed':
                    _this.emit('@connectionstatechange', 'connected');
                    break;
                case 'failed':
                    _this.emit('@connectionstatechange', 'failed');
                    break;
                case 'disconnected':
                    _this.emit('@connectionstatechange', 'disconnected');
                    break;
                case 'closed':
                    _this.emit('@connectionstatechange', 'closed');
                    break;
            }
        });
        // NOTE: Not standard, but implemented by Edge.
        iceTransport.addEventListener('icestatechange', function () {
            switch (iceTransport.state) {
                case 'checking':
                    _this.emit('@connectionstatechange', 'connecting');
                    break;
                case 'connected':
                case 'completed':
                    _this.emit('@connectionstatechange', 'connected');
                    break;
                case 'failed':
                    _this.emit('@connectionstatechange', 'failed');
                    break;
                case 'disconnected':
                    _this.emit('@connectionstatechange', 'disconnected');
                    break;
                case 'closed':
                    _this.emit('@connectionstatechange', 'closed');
                    break;
            }
        });
        iceTransport.addEventListener('candidatepairchange', function (event) {
            logger.debug('iceTransport "candidatepairchange" event [pair:%o]', event.pair);
        });
        this._iceTransport = iceTransport;
    };
    Edge11.prototype._setDtlsTransport = function () {
        var _this = this;
        var dtlsTransport = new RTCDtlsTransport(this._iceTransport);
        // NOTE: Not yet implemented by Edge.
        dtlsTransport.addEventListener('statechange', function () {
            logger.debug('dtlsTransport "statechange" event [state:%s]', dtlsTransport.state);
        });
        // NOTE: Not standard, but implemented by Edge.
        dtlsTransport.addEventListener('dtlsstatechange', function () {
            logger.debug('dtlsTransport "dtlsstatechange" event [state:%s]', dtlsTransport.state);
            if (dtlsTransport.state === 'closed')
                _this.emit('@connectionstatechange', 'closed');
        });
        dtlsTransport.addEventListener('error', function (event) {
            logger.error('dtlsTransport "error" event [event:%o]', event);
        });
        this._dtlsTransport = dtlsTransport;
    };
    Edge11.prototype._setupTransport = function (_a) {
        var localDtlsRole = _a.localDtlsRole;
        return __awaiter(this, void 0, void 0, function () {
            var dtlsParameters, _b, _c, candidate;
            var e_5, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        logger.debug('_setupTransport()');
                        dtlsParameters = this._dtlsTransport.getLocalParameters();
                        dtlsParameters.role = localDtlsRole;
                        // Need to tell the remote transport about our parameters.
                        return [4 /*yield*/, this.safeEmitAsPromise('@connect', { dtlsParameters: dtlsParameters })];
                    case 1:
                        // Need to tell the remote transport about our parameters.
                        _e.sent();
                        // Start the RTCIceTransport.
                        this._iceTransport.start(this._iceGatherer, this._remoteIceParameters, 'controlling');
                        try {
                            // Add remote ICE candidates.
                            for (_b = __values(this._remoteIceCandidates), _c = _b.next(); !_c.done; _c = _b.next()) {
                                candidate = _c.value;
                                this._iceTransport.addRemoteCandidate(candidate);
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                        // Also signal a 'complete' candidate as per spec.
                        // NOTE: It should be {complete: true} but Edge prefers {}.
                        // NOTE: If we don't signal end of candidates, the Edge RTCIceTransport
                        // won't enter the 'completed' state.
                        this._iceTransport.addRemoteCandidate({});
                        // NOTE: Edge does not like SHA less than 256.
                        this._remoteDtlsParameters.fingerprints = this._remoteDtlsParameters.fingerprints
                            .filter(function (fingerprint) {
                            return (fingerprint.algorithm === 'sha-256' ||
                                fingerprint.algorithm === 'sha-384' ||
                                fingerprint.algorithm === 'sha-512');
                        });
                        // Start the RTCDtlsTransport.
                        this._dtlsTransport.start(this._remoteDtlsParameters);
                        this._transportReady = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return Edge11;
}(HandlerInterface_1.HandlerInterface));
exports.Edge11 = Edge11;
//# sourceMappingURL=Edge11.js.map