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
exports.FakeHandler = void 0;
var EnhancedEventEmitter_1 = require("../EnhancedEventEmitter");
var Logger_1 = require("../Logger");
var fake_mediastreamtrack_1 = require("fake-mediastreamtrack");
var utils = __importStar(require("../utils"));
var ortc = __importStar(require("../ortc"));
var HandlerInterface_1 = require("./HandlerInterface");
var logger = new Logger_1.Logger('FakeHandler');
var FakeDataChannel = /** @class */ (function (_super) {
    __extends(FakeDataChannel, _super);
    function FakeDataChannel(_a) {
        var id = _a.id, ordered = _a.ordered, maxPacketLifeTime = _a.maxPacketLifeTime, maxRetransmits = _a.maxRetransmits, priority = _a.priority, label = _a.label, protocol = _a.protocol;
        var _this = _super.call(this) || this;
        _this.id = id;
        _this.ordered = ordered;
        _this.maxPacketLifeTime = maxPacketLifeTime;
        _this.maxRetransmits = maxRetransmits;
        _this.priority = priority;
        _this.label = label;
        _this.protocol = protocol;
        return _this;
    }
    FakeDataChannel.prototype.close = function () {
        this.safeEmit('close');
    };
    FakeDataChannel.prototype.send = function (data) {
        this.safeEmit('message', data);
    };
    FakeDataChannel.prototype.addEventListener = function (event, fn) {
        this.on(event, fn);
    };
    return FakeDataChannel;
}(EnhancedEventEmitter_1.EnhancedEventEmitter));
var FakeHandler = /** @class */ (function (_super) {
    __extends(FakeHandler, _super);
    function FakeHandler(fakeParameters) {
        var _this = _super.call(this) || this;
        // Local RTCP CNAME.
        _this._cname = "CNAME-" + utils.generateRandomNumber();
        // Got transport local and remote parameters.
        _this._transportReady = false;
        // Next localId.
        _this._nextLocalId = 1;
        // Sending and receiving tracks indexed by localId.
        _this._tracks = new Map();
        // DataChannel id value counter. It must be incremented for each new DataChannel.
        _this._nextSctpStreamId = 0;
        _this.fakeParameters = fakeParameters;
        return _this;
    }
    /**
     * Creates a factory function.
     */
    FakeHandler.createFactory = function (fakeParameters) {
        return function () { return new FakeHandler(fakeParameters); };
    };
    Object.defineProperty(FakeHandler.prototype, "name", {
        get: function () {
            return 'FakeHandler';
        },
        enumerable: false,
        configurable: true
    });
    FakeHandler.prototype.close = function () {
        logger.debug('close()');
    };
    // NOTE: Custom method for simulation purposes.
    FakeHandler.prototype.setConnectionState = function (connectionState) {
        this.emit('@connectionstatechange', connectionState);
    };
    FakeHandler.prototype.getNativeRtpCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('getNativeRtpCapabilities()');
                return [2 /*return*/, this.fakeParameters.generateNativeRtpCapabilities()];
            });
        });
    };
    FakeHandler.prototype.getNativeSctpCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('getNativeSctpCapabilities()');
                return [2 /*return*/, this.fakeParameters.generateNativeSctpCapabilities()];
            });
        });
    };
    FakeHandler.prototype.run = function (_a) {
        var 
        /* eslint-disable @typescript-eslint/no-unused-vars */
        direction = _a.direction, iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy, proprietaryConstraints = _a.proprietaryConstraints, extendedRtpCapabilities = _a.extendedRtpCapabilities
        /* eslint-enable @typescript-eslint/no-unused-vars */
        ;
        logger.debug('run()');
        // Generic sending RTP parameters for audio and video.
        // @type {Object}
        this._rtpParametersByKind =
            {
                audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
            };
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FakeHandler.prototype.updateIceServers = function (iceServers) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('updateIceServers()');
                return [2 /*return*/];
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FakeHandler.prototype.restartIce = function (iceParameters) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('restartIce()');
                return [2 /*return*/];
            });
        });
    };
    FakeHandler.prototype.getTransportStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Map()]; // NOTE: Whatever.
            });
        });
    };
    FakeHandler.prototype.send = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a) {
        var track = _a.track, encodings = _a.encodings, codecOptions = _a.codecOptions, codec = _a.codec;
        return __awaiter(this, void 0, void 0, function () {
            var rtpParameters, useRtx, encodings_1, encodings_1_1, encoding, localId;
            var e_1, _b;
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
                        rtpParameters = utils.clone(this._rtpParametersByKind[track.kind], {});
                        useRtx = rtpParameters.codecs
                            .some(function (_codec) { return /.+\/rtx$/i.test(_codec.mimeType); });
                        rtpParameters.mid = "mid-" + utils.generateRandomNumber();
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
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (encodings_1_1 && !encodings_1_1.done && (_b = encodings_1.return)) _b.call(encodings_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        rtpParameters.encodings = encodings;
                        // Fill RTCRtpParameters.rtcp.
                        rtpParameters.rtcp =
                            {
                                cname: this._cname,
                                reducedSize: true,
                                mux: true
                            };
                        localId = this._nextLocalId++;
                        this._tracks.set(localId, track);
                        return [2 /*return*/, { localId: String(localId), rtpParameters: rtpParameters }];
                }
            });
        });
    };
    FakeHandler.prototype.stopSending = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('stopSending() [localId:%s]', localId);
                if (!this._tracks.has(Number(localId)))
                    throw new Error('local track not found');
                this._tracks.delete(Number(localId));
                return [2 /*return*/];
            });
        });
    };
    FakeHandler.prototype.replaceTrack = function (localId, track) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (track) {
                    logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
                }
                else {
                    logger.debug('replaceTrack() [localId:%s, no track]', localId);
                }
                this._tracks.delete(Number(localId));
                this._tracks.set(Number(localId), track);
                return [2 /*return*/];
            });
        });
    };
    FakeHandler.prototype.setMaxSpatialLayer = function (localId, spatialLayer) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
                return [2 /*return*/];
            });
        });
    };
    FakeHandler.prototype.setRtpEncodingParameters = function (localId, params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
                return [2 /*return*/];
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FakeHandler.prototype.getSenderStats = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Map()]; // NOTE: Whatever.
            });
        });
    };
    FakeHandler.prototype.sendDataChannel = function (_a) {
        var ordered = _a.ordered, maxPacketLifeTime = _a.maxPacketLifeTime, maxRetransmits = _a.maxRetransmits, label = _a.label, protocol = _a.protocol, priority = _a.priority;
        return __awaiter(this, void 0, void 0, function () {
            var dataChannel, sctpStreamParameters;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._transportReady) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'server' })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        logger.debug('sendDataChannel()');
                        dataChannel = new FakeDataChannel({
                            id: this._nextSctpStreamId++,
                            ordered: ordered,
                            maxPacketLifeTime: maxPacketLifeTime,
                            maxRetransmits: maxRetransmits,
                            priority: priority,
                            label: label,
                            protocol: protocol
                        });
                        sctpStreamParameters = {
                            streamId: this._nextSctpStreamId,
                            ordered: ordered,
                            maxPacketLifeTime: maxPacketLifeTime,
                            maxRetransmits: maxRetransmits
                        };
                        // @ts-ignore.
                        return [2 /*return*/, { dataChannel: dataChannel, sctpStreamParameters: sctpStreamParameters }];
                }
            });
        });
    };
    FakeHandler.prototype.receive = function (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _a) {
        var trackId = _a.trackId, kind = _a.kind, rtpParameters = _a.rtpParameters;
        return __awaiter(this, void 0, void 0, function () {
            var localId, track;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._transportReady) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'client' })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
                        localId = this._nextLocalId++;
                        track = new fake_mediastreamtrack_1.FakeMediaStreamTrack({ kind: kind });
                        this._tracks.set(localId, track);
                        return [2 /*return*/, { localId: String(localId), track: track }];
                }
            });
        });
    };
    FakeHandler.prototype.stopReceiving = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('stopReceiving() [localId:%s]', localId);
                this._tracks.delete(Number(localId));
                return [2 /*return*/];
            });
        });
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FakeHandler.prototype.getReceiverStats = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Map()]; //
            });
        });
    };
    FakeHandler.prototype.receiveDataChannel = function (_a) {
        var sctpStreamParameters = _a.sctpStreamParameters, label = _a.label, protocol = _a.protocol;
        return __awaiter(this, void 0, void 0, function () {
            var dataChannel;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this._transportReady) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'client' })];
                    case 1:
                        _b.sent();
                        _b.label = 2;
                    case 2:
                        logger.debug('receiveDataChannel()');
                        dataChannel = new FakeDataChannel({
                            id: sctpStreamParameters.streamId,
                            ordered: sctpStreamParameters.ordered,
                            maxPacketLifeTime: sctpStreamParameters.maxPacketLifeTime,
                            maxRetransmits: sctpStreamParameters.maxRetransmits,
                            label: label,
                            protocol: protocol
                        });
                        // @ts-ignore.
                        return [2 /*return*/, { dataChannel: dataChannel }];
                }
            });
        });
    };
    FakeHandler.prototype._setupTransport = function (_a) {
        var localDtlsRole = _a.localDtlsRole, 
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        localSdpObject = _a.localSdpObject;
        return __awaiter(this, void 0, void 0, function () {
            var dtlsParameters;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        dtlsParameters = utils.clone(this.fakeParameters.generateLocalDtlsParameters(), {});
                        // Set our DTLS role.
                        if (localDtlsRole)
                            dtlsParameters.role = localDtlsRole;
                        // Assume we are connecting now.
                        this.emit('@connectionstatechange', 'connecting');
                        // Need to tell the remote transport about our parameters.
                        return [4 /*yield*/, new Promise(function (resolve, reject) { return (_this.emit('@connect', { dtlsParameters: dtlsParameters }, resolve, reject)); })];
                    case 1:
                        // Need to tell the remote transport about our parameters.
                        _b.sent();
                        this._transportReady = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    return FakeHandler;
}(HandlerInterface_1.HandlerInterface));
exports.FakeHandler = FakeHandler;
//# sourceMappingURL=FakeHandler.js.map