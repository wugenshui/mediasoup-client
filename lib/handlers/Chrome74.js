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
exports.Chrome74 = void 0;
var sdpTransform = __importStar(require("sdp-transform"));
var Logger_1 = require("../Logger");
var utils = __importStar(require("../utils"));
var ortc = __importStar(require("../ortc"));
var sdpCommonUtils = __importStar(require("./sdp/commonUtils"));
var sdpUnifiedPlanUtils = __importStar(require("./sdp/unifiedPlanUtils"));
var HandlerInterface_1 = require("./HandlerInterface");
var RemoteSdp_1 = require("./sdp/RemoteSdp");
var scalabilityModes_1 = require("../scalabilityModes");
var logger = new Logger_1.Logger('Chrome74');
var SCTP_NUM_STREAMS = { OS: 1024, MIS: 1024 };
var Chrome74 = /** @class */ (function (_super) {
    __extends(Chrome74, _super);
    function Chrome74() {
        var _this = _super.call(this) || this;
        // Map of RTCTransceivers indexed by MID.
        _this._mapMidTransceiver = new Map();
        // Local stream for sending.
        _this._sendStream = new MediaStream();
        // Whether a DataChannel m=application section has been created.
        _this._hasDataChannelMediaSection = false;
        // Sending DataChannel id value counter. Incremented for each new DataChannel.
        _this._nextSendSctpStreamId = 0;
        // Got transport local and remote parameters.
        _this._transportReady = false;
        return _this;
    }
    /**
     * Creates a factory function.
     */
    Chrome74.createFactory = function () {
        return function () { return new Chrome74(); };
    };
    Object.defineProperty(Chrome74.prototype, "name", {
        get: function () {
            return 'Chrome74';
        },
        enumerable: false,
        configurable: true
    });
    Chrome74.prototype.close = function () {
        logger.debug('close()');
        // Close RTCPeerConnection.
        if (this._pc) {
            try {
                this._pc.close();
            }
            catch (error) { }
        }
    };
    Chrome74.prototype.getNativeRtpCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pc, offer, sdpObject, nativeRtpCapabilities, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('getNativeRtpCapabilities()');
                        pc = new RTCPeerConnection({
                            iceServers: [],
                            iceTransportPolicy: 'all',
                            bundlePolicy: 'max-bundle',
                            rtcpMuxPolicy: 'require',
                            sdpSemantics: 'unified-plan'
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        pc.addTransceiver('audio');
                        pc.addTransceiver('video');
                        return [4 /*yield*/, pc.createOffer()];
                    case 2:
                        offer = _a.sent();
                        try {
                            pc.close();
                        }
                        catch (error) { }
                        sdpObject = sdpTransform.parse(offer.sdp);
                        nativeRtpCapabilities = sdpCommonUtils.extractRtpCapabilities({ sdpObject: sdpObject });
                        return [2 /*return*/, nativeRtpCapabilities];
                    case 3:
                        error_1 = _a.sent();
                        try {
                            pc.close();
                        }
                        catch (error2) { }
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype.getNativeSctpCapabilities = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                logger.debug('getNativeSctpCapabilities()');
                return [2 /*return*/, {
                        numStreams: SCTP_NUM_STREAMS
                    }];
            });
        });
    };
    Chrome74.prototype.run = function (_a) {
        var _this = this;
        var direction = _a.direction, iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy, additionalSettings = _a.additionalSettings, proprietaryConstraints = _a.proprietaryConstraints, extendedRtpCapabilities = _a.extendedRtpCapabilities;
        logger.debug('run()');
        this._direction = direction;
        this._remoteSdp = new RemoteSdp_1.RemoteSdp({
            iceParameters: iceParameters,
            iceCandidates: iceCandidates,
            dtlsParameters: dtlsParameters,
            sctpParameters: sctpParameters
        });
        this._sendingRtpParametersByKind =
            {
                audio: ortc.getSendingRtpParameters('audio', extendedRtpCapabilities),
                video: ortc.getSendingRtpParameters('video', extendedRtpCapabilities)
            };
        this._sendingRemoteRtpParametersByKind =
            {
                audio: ortc.getSendingRemoteRtpParameters('audio', extendedRtpCapabilities),
                video: ortc.getSendingRemoteRtpParameters('video', extendedRtpCapabilities)
            };
        this._pc = new RTCPeerConnection(__assign({ iceServers: iceServers || [], iceTransportPolicy: iceTransportPolicy || 'all', bundlePolicy: 'max-bundle', rtcpMuxPolicy: 'require', sdpSemantics: 'unified-plan' }, additionalSettings), proprietaryConstraints);
        // Handle RTCPeerConnection connection status.
        this._pc.addEventListener('iceconnectionstatechange', function () {
            switch (_this._pc.iceConnectionState) {
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
    };
    Chrome74.prototype.updateIceServers = function (iceServers) {
        return __awaiter(this, void 0, void 0, function () {
            var configuration;
            return __generator(this, function (_a) {
                logger.debug('updateIceServers()');
                configuration = this._pc.getConfiguration();
                configuration.iceServers = iceServers;
                this._pc.setConfiguration(configuration);
                return [2 /*return*/];
            });
        });
    };
    Chrome74.prototype.restartIce = function (iceParameters) {
        return __awaiter(this, void 0, void 0, function () {
            var offer, answer, offer, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        logger.debug('restartIce()');
                        // Provide the remote SDP handler with new remote ICE parameters.
                        this._remoteSdp.updateIceParameters(iceParameters);
                        if (!this._transportReady)
                            return [2 /*return*/];
                        if (!(this._direction === 'send')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._pc.createOffer({ iceRestart: true })];
                    case 1:
                        offer = _a.sent();
                        logger.debug('restartIce() | calling pc.setLocalDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setLocalDescription(offer)];
                    case 2:
                        _a.sent();
                        answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('restartIce() | calling pc.setRemoteDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(answer)];
                    case 3:
                        _a.sent();
                        return [3 /*break*/, 8];
                    case 4:
                        offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('restartIce() | calling pc.setRemoteDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(offer)];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this._pc.createAnswer()];
                    case 6:
                        answer = _a.sent();
                        logger.debug('restartIce() | calling pc.setLocalDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setLocalDescription(answer)];
                    case 7:
                        _a.sent();
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype.getTransportStats = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this._pc.getStats()];
            });
        });
    };
    Chrome74.prototype.send = function (_a) {
        var track = _a.track, encodings = _a.encodings, codecOptions = _a.codecOptions, codec = _a.codec;
        return __awaiter(this, void 0, void 0, function () {
            var sendingRtpParameters, sendingRemoteRtpParameters, mediaSectionIdx, transceiver, offer, localSdpObject, offerMediaObject, hackVp9Svc, layers, localId, newEncodings, _b, _c, encoding, answer;
            var e_1, _d;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        this._assertSendDirection();
                        logger.debug('send() [kind:%s, track.id:%s]', track.kind, track.id);
                        if (encodings && encodings.length > 1) {
                            encodings.forEach(function (encoding, idx) {
                                encoding.rid = "r" + idx;
                            });
                        }
                        sendingRtpParameters = utils.clone(this._sendingRtpParametersByKind[track.kind], {});
                        // This may throw.
                        sendingRtpParameters.codecs =
                            ortc.reduceCodecs(sendingRtpParameters.codecs, codec);
                        sendingRemoteRtpParameters = utils.clone(this._sendingRemoteRtpParametersByKind[track.kind], {});
                        // This may throw.
                        sendingRemoteRtpParameters.codecs =
                            ortc.reduceCodecs(sendingRemoteRtpParameters.codecs, codec);
                        mediaSectionIdx = this._remoteSdp.getNextMediaSectionIdx();
                        transceiver = this._pc.addTransceiver(track, {
                            direction: 'sendonly',
                            streams: [this._sendStream],
                            sendEncodings: encodings
                        });
                        return [4 /*yield*/, this._pc.createOffer()];
                    case 1:
                        offer = _e.sent();
                        localSdpObject = sdpTransform.parse(offer.sdp);
                        if (!!this._transportReady) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'server', localSdpObject: localSdpObject })];
                    case 2:
                        _e.sent();
                        _e.label = 3;
                    case 3:
                        hackVp9Svc = false;
                        layers = scalabilityModes_1.parse((encodings || [{}])[0].scalabilityMode);
                        if (encodings &&
                            encodings.length === 1 &&
                            layers.spatialLayers > 1 &&
                            sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp9') {
                            logger.debug('send() | enabling legacy simulcast for VP9 SVC');
                            hackVp9Svc = true;
                            localSdpObject = sdpTransform.parse(offer.sdp);
                            offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
                            sdpUnifiedPlanUtils.addLegacySimulcast({
                                offerMediaObject: offerMediaObject,
                                numStreams: layers.spatialLayers
                            });
                            offer = { type: 'offer', sdp: sdpTransform.write(localSdpObject) };
                        }
                        logger.debug('send() | calling pc.setLocalDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setLocalDescription(offer)];
                    case 4:
                        _e.sent();
                        localId = transceiver.mid;
                        // Set MID.
                        sendingRtpParameters.mid = localId;
                        localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
                        offerMediaObject = localSdpObject.media[mediaSectionIdx.idx];
                        // Set RTCP CNAME.
                        sendingRtpParameters.rtcp.cname =
                            sdpCommonUtils.getCname({ offerMediaObject: offerMediaObject });
                        // Set RTP encodings by parsing the SDP offer if no encodings are given.
                        if (!encodings) {
                            sendingRtpParameters.encodings =
                                sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject: offerMediaObject });
                        }
                        // Set RTP encodings by parsing the SDP offer and complete them with given
                        // one if just a single encoding has been given.
                        else if (encodings.length === 1) {
                            newEncodings = sdpUnifiedPlanUtils.getRtpEncodings({ offerMediaObject: offerMediaObject });
                            Object.assign(newEncodings[0], encodings[0]);
                            // Hack for VP9 SVC.
                            if (hackVp9Svc)
                                newEncodings = [newEncodings[0]];
                            sendingRtpParameters.encodings = newEncodings;
                        }
                        // Otherwise if more than 1 encoding are given use them verbatim.
                        else {
                            sendingRtpParameters.encodings = encodings;
                        }
                        // If VP8 or H264 and there is effective simulcast, add scalabilityMode to
                        // each encoding.
                        if (sendingRtpParameters.encodings.length > 1 &&
                            (sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/vp8' ||
                                sendingRtpParameters.codecs[0].mimeType.toLowerCase() === 'video/h264')) {
                            try {
                                for (_b = __values(sendingRtpParameters.encodings), _c = _b.next(); !_c.done; _c = _b.next()) {
                                    encoding = _c.value;
                                    encoding.scalabilityMode = 'S1T3';
                                }
                            }
                            catch (e_1_1) { e_1 = { error: e_1_1 }; }
                            finally {
                                try {
                                    if (_c && !_c.done && (_d = _b.return)) _d.call(_b);
                                }
                                finally { if (e_1) throw e_1.error; }
                            }
                        }
                        this._remoteSdp.send({
                            offerMediaObject: offerMediaObject,
                            reuseMid: mediaSectionIdx.reuseMid,
                            offerRtpParameters: sendingRtpParameters,
                            answerRtpParameters: sendingRemoteRtpParameters,
                            codecOptions: codecOptions,
                            extmapAllowMixed: true
                        });
                        answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('send() | calling pc.setRemoteDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(answer)];
                    case 5:
                        _e.sent();
                        // Store in the map.
                        this._mapMidTransceiver.set(localId, transceiver);
                        return [2 /*return*/, {
                                localId: localId,
                                rtpParameters: sendingRtpParameters,
                                rtpSender: transceiver.sender
                            }];
                }
            });
        });
    };
    Chrome74.prototype.stopSending = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var transceiver, offer, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._assertSendDirection();
                        logger.debug('stopSending() [localId:%s]', localId);
                        transceiver = this._mapMidTransceiver.get(localId);
                        if (!transceiver)
                            throw new Error('associated RTCRtpTransceiver not found');
                        transceiver.sender.replaceTrack(null);
                        this._pc.removeTrack(transceiver.sender);
                        this._remoteSdp.closeMediaSection(transceiver.mid);
                        return [4 /*yield*/, this._pc.createOffer()];
                    case 1:
                        offer = _a.sent();
                        logger.debug('stopSending() | calling pc.setLocalDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setLocalDescription(offer)];
                    case 2:
                        _a.sent();
                        answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('stopSending() | calling pc.setRemoteDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(answer)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype.replaceTrack = function (localId, track) {
        return __awaiter(this, void 0, void 0, function () {
            var transceiver;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._assertSendDirection();
                        if (track) {
                            logger.debug('replaceTrack() [localId:%s, track.id:%s]', localId, track.id);
                        }
                        else {
                            logger.debug('replaceTrack() [localId:%s, no track]', localId);
                        }
                        transceiver = this._mapMidTransceiver.get(localId);
                        if (!transceiver)
                            throw new Error('associated RTCRtpTransceiver not found');
                        return [4 /*yield*/, transceiver.sender.replaceTrack(track)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype.setMaxSpatialLayer = function (localId, spatialLayer) {
        return __awaiter(this, void 0, void 0, function () {
            var transceiver, parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._assertSendDirection();
                        logger.debug('setMaxSpatialLayer() [localId:%s, spatialLayer:%s]', localId, spatialLayer);
                        transceiver = this._mapMidTransceiver.get(localId);
                        if (!transceiver)
                            throw new Error('associated RTCRtpTransceiver not found');
                        parameters = transceiver.sender.getParameters();
                        parameters.encodings.forEach(function (encoding, idx) {
                            if (idx <= spatialLayer)
                                encoding.active = true;
                            else
                                encoding.active = false;
                        });
                        return [4 /*yield*/, transceiver.sender.setParameters(parameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype.setRtpEncodingParameters = function (localId, params) {
        return __awaiter(this, void 0, void 0, function () {
            var transceiver, parameters;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._assertSendDirection();
                        logger.debug('setRtpEncodingParameters() [localId:%s, params:%o]', localId, params);
                        transceiver = this._mapMidTransceiver.get(localId);
                        if (!transceiver)
                            throw new Error('associated RTCRtpTransceiver not found');
                        parameters = transceiver.sender.getParameters();
                        parameters.encodings.forEach(function (encoding, idx) {
                            parameters.encodings[idx] = __assign(__assign({}, encoding), params);
                        });
                        return [4 /*yield*/, transceiver.sender.setParameters(parameters)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype.getSenderStats = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var transceiver;
            return __generator(this, function (_a) {
                this._assertSendDirection();
                transceiver = this._mapMidTransceiver.get(localId);
                if (!transceiver)
                    throw new Error('associated RTCRtpTransceiver not found');
                return [2 /*return*/, transceiver.sender.getStats()];
            });
        });
    };
    Chrome74.prototype.sendDataChannel = function (_a) {
        var ordered = _a.ordered, maxPacketLifeTime = _a.maxPacketLifeTime, maxRetransmits = _a.maxRetransmits, label = _a.label, protocol = _a.protocol, priority = _a.priority;
        return __awaiter(this, void 0, void 0, function () {
            var options, dataChannel, offer, localSdpObject, offerMediaObject, answer, sctpStreamParameters;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._assertSendDirection();
                        options = {
                            negotiated: true,
                            id: this._nextSendSctpStreamId,
                            ordered: ordered,
                            maxPacketLifeTime: maxPacketLifeTime,
                            maxRetransmits: maxRetransmits,
                            protocol: protocol,
                            priority: priority
                        };
                        logger.debug('sendDataChannel() [options:%o]', options);
                        dataChannel = this._pc.createDataChannel(label, options);
                        // Increase next id.
                        this._nextSendSctpStreamId =
                            ++this._nextSendSctpStreamId % SCTP_NUM_STREAMS.MIS;
                        if (!!this._hasDataChannelMediaSection) return [3 /*break*/, 6];
                        return [4 /*yield*/, this._pc.createOffer()];
                    case 1:
                        offer = _b.sent();
                        localSdpObject = sdpTransform.parse(offer.sdp);
                        offerMediaObject = localSdpObject.media
                            .find(function (m) { return m.type === 'application'; });
                        if (!!this._transportReady) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'server', localSdpObject: localSdpObject })];
                    case 2:
                        _b.sent();
                        _b.label = 3;
                    case 3:
                        logger.debug('sendDataChannel() | calling pc.setLocalDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setLocalDescription(offer)];
                    case 4:
                        _b.sent();
                        this._remoteSdp.sendSctpAssociation({ offerMediaObject: offerMediaObject });
                        answer = { type: 'answer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('sendDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(answer)];
                    case 5:
                        _b.sent();
                        this._hasDataChannelMediaSection = true;
                        _b.label = 6;
                    case 6:
                        sctpStreamParameters = {
                            streamId: options.id,
                            ordered: options.ordered,
                            maxPacketLifeTime: options.maxPacketLifeTime,
                            maxRetransmits: options.maxRetransmits
                        };
                        return [2 /*return*/, { dataChannel: dataChannel, sctpStreamParameters: sctpStreamParameters }];
                }
            });
        });
    };
    Chrome74.prototype.receive = function (_a) {
        var trackId = _a.trackId, kind = _a.kind, rtpParameters = _a.rtpParameters;
        return __awaiter(this, void 0, void 0, function () {
            var localId, offer, answer, localSdpObject, answerMediaObject, transceiver;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._assertRecvDirection();
                        logger.debug('receive() [trackId:%s, kind:%s]', trackId, kind);
                        localId = rtpParameters.mid || String(this._mapMidTransceiver.size);
                        this._remoteSdp.receive({
                            mid: localId,
                            kind: kind,
                            offerRtpParameters: rtpParameters,
                            streamId: rtpParameters.rtcp.cname,
                            trackId: trackId
                        });
                        offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('receive() | calling pc.setRemoteDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(offer)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this._pc.createAnswer()];
                    case 2:
                        answer = _b.sent();
                        localSdpObject = sdpTransform.parse(answer.sdp);
                        answerMediaObject = localSdpObject.media
                            .find(function (m) { return String(m.mid) === localId; });
                        // May need to modify codec parameters in the answer based on codec
                        // parameters in the offer.
                        sdpCommonUtils.applyCodecParameters({
                            offerRtpParameters: rtpParameters,
                            answerMediaObject: answerMediaObject
                        });
                        answer = { type: 'answer', sdp: sdpTransform.write(localSdpObject) };
                        if (!!this._transportReady) return [3 /*break*/, 4];
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'client', localSdpObject: localSdpObject })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        logger.debug('receive() | calling pc.setLocalDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setLocalDescription(answer)];
                    case 5:
                        _b.sent();
                        transceiver = this._pc.getTransceivers()
                            .find(function (t) { return t.mid === localId; });
                        if (!transceiver)
                            throw new Error('new RTCRtpTransceiver not found');
                        // Store in the map.
                        this._mapMidTransceiver.set(localId, transceiver);
                        return [2 /*return*/, {
                                localId: localId,
                                track: transceiver.receiver.track,
                                rtpReceiver: transceiver.receiver
                            }];
                }
            });
        });
    };
    Chrome74.prototype.stopReceiving = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var transceiver, offer, answer;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._assertRecvDirection();
                        logger.debug('stopReceiving() [localId:%s]', localId);
                        transceiver = this._mapMidTransceiver.get(localId);
                        if (!transceiver)
                            throw new Error('associated RTCRtpTransceiver not found');
                        this._remoteSdp.closeMediaSection(transceiver.mid);
                        offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('stopReceiving() | calling pc.setRemoteDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(offer)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._pc.createAnswer()];
                    case 2:
                        answer = _a.sent();
                        logger.debug('stopReceiving() | calling pc.setLocalDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setLocalDescription(answer)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype.getReceiverStats = function (localId) {
        return __awaiter(this, void 0, void 0, function () {
            var transceiver;
            return __generator(this, function (_a) {
                this._assertRecvDirection();
                transceiver = this._mapMidTransceiver.get(localId);
                if (!transceiver)
                    throw new Error('associated RTCRtpTransceiver not found');
                return [2 /*return*/, transceiver.receiver.getStats()];
            });
        });
    };
    Chrome74.prototype.receiveDataChannel = function (_a) {
        var sctpStreamParameters = _a.sctpStreamParameters, label = _a.label, protocol = _a.protocol;
        return __awaiter(this, void 0, void 0, function () {
            var streamId, ordered, maxPacketLifeTime, maxRetransmits, options, dataChannel, offer, answer, localSdpObject;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this._assertRecvDirection();
                        streamId = sctpStreamParameters.streamId, ordered = sctpStreamParameters.ordered, maxPacketLifeTime = sctpStreamParameters.maxPacketLifeTime, maxRetransmits = sctpStreamParameters.maxRetransmits;
                        options = {
                            negotiated: true,
                            id: streamId,
                            ordered: ordered,
                            maxPacketLifeTime: maxPacketLifeTime,
                            maxRetransmits: maxRetransmits,
                            protocol: protocol
                        };
                        logger.debug('receiveDataChannel() [options:%o]', options);
                        dataChannel = this._pc.createDataChannel(label, options);
                        if (!!this._hasDataChannelMediaSection) return [3 /*break*/, 6];
                        this._remoteSdp.receiveSctpAssociation();
                        offer = { type: 'offer', sdp: this._remoteSdp.getSdp() };
                        logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [offer:%o]', offer);
                        return [4 /*yield*/, this._pc.setRemoteDescription(offer)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, this._pc.createAnswer()];
                    case 2:
                        answer = _b.sent();
                        if (!!this._transportReady) return [3 /*break*/, 4];
                        localSdpObject = sdpTransform.parse(answer.sdp);
                        return [4 /*yield*/, this._setupTransport({ localDtlsRole: 'client', localSdpObject: localSdpObject })];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        logger.debug('receiveDataChannel() | calling pc.setRemoteDescription() [answer:%o]', answer);
                        return [4 /*yield*/, this._pc.setLocalDescription(answer)];
                    case 5:
                        _b.sent();
                        this._hasDataChannelMediaSection = true;
                        _b.label = 6;
                    case 6: return [2 /*return*/, { dataChannel: dataChannel }];
                }
            });
        });
    };
    Chrome74.prototype._setupTransport = function (_a) {
        var localDtlsRole = _a.localDtlsRole, localSdpObject = _a.localSdpObject;
        return __awaiter(this, void 0, void 0, function () {
            var dtlsParameters;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!localSdpObject)
                            localSdpObject = sdpTransform.parse(this._pc.localDescription.sdp);
                        dtlsParameters = sdpCommonUtils.extractDtlsParameters({ sdpObject: localSdpObject });
                        // Set our DTLS role.
                        dtlsParameters.role = localDtlsRole;
                        // Update the remote DTLS role in the SDP.
                        this._remoteSdp.updateDtlsRole(localDtlsRole === 'client' ? 'server' : 'client');
                        // Need to tell the remote transport about our parameters.
                        return [4 /*yield*/, this.safeEmitAsPromise('@connect', { dtlsParameters: dtlsParameters })];
                    case 1:
                        // Need to tell the remote transport about our parameters.
                        _b.sent();
                        this._transportReady = true;
                        return [2 /*return*/];
                }
            });
        });
    };
    Chrome74.prototype._assertSendDirection = function () {
        if (this._direction !== 'send') {
            throw new Error('method can just be called for handlers with "send" direction');
        }
    };
    Chrome74.prototype._assertRecvDirection = function () {
        if (this._direction !== 'recv') {
            throw new Error('method can just be called for handlers with "recv" direction');
        }
    };
    return Chrome74;
}(HandlerInterface_1.HandlerInterface));
exports.Chrome74 = Chrome74;
//# sourceMappingURL=Chrome74.js.map