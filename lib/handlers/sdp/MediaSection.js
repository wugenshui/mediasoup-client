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
exports.OfferMediaSection = exports.AnswerMediaSection = exports.MediaSection = void 0;
var utils = __importStar(require("../../utils"));
var MediaSection = /** @class */ (function () {
    function MediaSection(_a) {
        var e_1, _b;
        var iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, _c = _a.planB, planB = _c === void 0 ? false : _c;
        this._mediaObject = {};
        this._planB = planB;
        if (iceParameters) {
            this.setIceParameters(iceParameters);
        }
        if (iceCandidates) {
            this._mediaObject.candidates = [];
            try {
                for (var iceCandidates_1 = __values(iceCandidates), iceCandidates_1_1 = iceCandidates_1.next(); !iceCandidates_1_1.done; iceCandidates_1_1 = iceCandidates_1.next()) {
                    var candidate = iceCandidates_1_1.value;
                    var candidateObject = {};
                    // mediasoup does mandates rtcp-mux so candidates component is always
                    // RTP (1).
                    candidateObject.component = 1;
                    candidateObject.foundation = candidate.foundation;
                    candidateObject.ip = candidate.ip;
                    candidateObject.port = candidate.port;
                    candidateObject.priority = candidate.priority;
                    candidateObject.transport = candidate.protocol;
                    candidateObject.type = candidate.type;
                    if (candidate.tcpType)
                        candidateObject.tcptype = candidate.tcpType;
                    this._mediaObject.candidates.push(candidateObject);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (iceCandidates_1_1 && !iceCandidates_1_1.done && (_b = iceCandidates_1.return)) _b.call(iceCandidates_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            this._mediaObject.endOfCandidates = 'end-of-candidates';
            this._mediaObject.iceOptions = 'renomination';
        }
        if (dtlsParameters) {
            this.setDtlsRole(dtlsParameters.role);
        }
    }
    Object.defineProperty(MediaSection.prototype, "mid", {
        get: function () {
            return String(this._mediaObject.mid);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaSection.prototype, "closed", {
        get: function () {
            return this._mediaObject.port === 0;
        },
        enumerable: false,
        configurable: true
    });
    MediaSection.prototype.getObject = function () {
        return this._mediaObject;
    };
    MediaSection.prototype.setIceParameters = function (iceParameters) {
        this._mediaObject.iceUfrag = iceParameters.usernameFragment;
        this._mediaObject.icePwd = iceParameters.password;
    };
    MediaSection.prototype.disable = function () {
        this._mediaObject.direction = 'inactive';
        delete this._mediaObject.ext;
        delete this._mediaObject.ssrcs;
        delete this._mediaObject.ssrcGroups;
        delete this._mediaObject.simulcast;
        delete this._mediaObject.simulcast_03;
        delete this._mediaObject.rids;
    };
    MediaSection.prototype.close = function () {
        this._mediaObject.direction = 'inactive';
        this._mediaObject.port = 0;
        delete this._mediaObject.ext;
        delete this._mediaObject.ssrcs;
        delete this._mediaObject.ssrcGroups;
        delete this._mediaObject.simulcast;
        delete this._mediaObject.simulcast_03;
        delete this._mediaObject.rids;
        delete this._mediaObject.extmapAllowMixed;
    };
    return MediaSection;
}());
exports.MediaSection = MediaSection;
var AnswerMediaSection = /** @class */ (function (_super) {
    __extends(AnswerMediaSection, _super);
    function AnswerMediaSection(_a) {
        var e_2, _b, e_3, _c, e_4, _d, e_5, _e;
        var iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, plainRtpParameters = _a.plainRtpParameters, _f = _a.planB, planB = _f === void 0 ? false : _f, offerMediaObject = _a.offerMediaObject, offerRtpParameters = _a.offerRtpParameters, answerRtpParameters = _a.answerRtpParameters, codecOptions = _a.codecOptions, _g = _a.extmapAllowMixed, extmapAllowMixed = _g === void 0 ? false : _g;
        var _this = _super.call(this, { iceParameters: iceParameters, iceCandidates: iceCandidates, dtlsParameters: dtlsParameters, planB: planB }) || this;
        _this._mediaObject.mid = String(offerMediaObject.mid);
        _this._mediaObject.type = offerMediaObject.type;
        _this._mediaObject.protocol = offerMediaObject.protocol;
        if (!plainRtpParameters) {
            _this._mediaObject.connection = { ip: '127.0.0.1', version: 4 };
            _this._mediaObject.port = 7;
        }
        else {
            _this._mediaObject.connection =
                {
                    ip: plainRtpParameters.ip,
                    version: plainRtpParameters.ipVersion
                };
            _this._mediaObject.port = plainRtpParameters.port;
        }
        switch (offerMediaObject.type) {
            case 'audio':
            case 'video':
                {
                    _this._mediaObject.direction = 'recvonly';
                    _this._mediaObject.rtp = [];
                    _this._mediaObject.rtcpFb = [];
                    _this._mediaObject.fmtp = [];
                    var _loop_1 = function (codec) {
                        var e_6, _a, e_7, _b;
                        var rtp = {
                            payload: codec.payloadType,
                            codec: getCodecName(codec),
                            rate: codec.clockRate
                        };
                        if (codec.channels > 1)
                            rtp.encoding = codec.channels;
                        this_1._mediaObject.rtp.push(rtp);
                        var codecParameters = utils.clone(codec.parameters, {});
                        if (codecOptions) {
                            var opusStereo = codecOptions.opusStereo, opusFec = codecOptions.opusFec, opusDtx = codecOptions.opusDtx, opusMaxPlaybackRate = codecOptions.opusMaxPlaybackRate, opusMaxAverageBitrate = codecOptions.opusMaxAverageBitrate, opusPtime = codecOptions.opusPtime, videoGoogleStartBitrate = codecOptions.videoGoogleStartBitrate, videoGoogleMaxBitrate = codecOptions.videoGoogleMaxBitrate, videoGoogleMinBitrate = codecOptions.videoGoogleMinBitrate;
                            var offerCodec = offerRtpParameters.codecs
                                .find(function (c) { return (c.payloadType === codec.payloadType); });
                            switch (codec.mimeType.toLowerCase()) {
                                case 'audio/opus':
                                    {
                                        if (opusStereo !== undefined) {
                                            offerCodec.parameters['sprop-stereo'] = opusStereo ? 1 : 0;
                                            codecParameters.stereo = opusStereo ? 1 : 0;
                                        }
                                        if (opusFec !== undefined) {
                                            offerCodec.parameters.useinbandfec = opusFec ? 1 : 0;
                                            codecParameters.useinbandfec = opusFec ? 1 : 0;
                                        }
                                        if (opusDtx !== undefined) {
                                            offerCodec.parameters.usedtx = opusDtx ? 1 : 0;
                                            codecParameters.usedtx = opusDtx ? 1 : 0;
                                        }
                                        if (opusMaxPlaybackRate !== undefined) {
                                            codecParameters.maxplaybackrate = opusMaxPlaybackRate;
                                        }
                                        if (opusMaxAverageBitrate !== undefined) {
                                            codecParameters.maxaveragebitrate = opusMaxAverageBitrate;
                                        }
                                        if (opusPtime !== undefined) {
                                            offerCodec.parameters.ptime = opusPtime;
                                            codecParameters.ptime = opusPtime;
                                        }
                                        break;
                                    }
                                case 'video/vp8':
                                case 'video/vp9':
                                case 'video/h264':
                                case 'video/h265':
                                    {
                                        if (videoGoogleStartBitrate !== undefined)
                                            codecParameters['x-google-start-bitrate'] = videoGoogleStartBitrate;
                                        if (videoGoogleMaxBitrate !== undefined)
                                            codecParameters['x-google-max-bitrate'] = videoGoogleMaxBitrate;
                                        if (videoGoogleMinBitrate !== undefined)
                                            codecParameters['x-google-min-bitrate'] = videoGoogleMinBitrate;
                                        break;
                                    }
                            }
                        }
                        var fmtp = {
                            payload: codec.payloadType,
                            config: ''
                        };
                        try {
                            for (var _c = (e_6 = void 0, __values(Object.keys(codecParameters))), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var key = _d.value;
                                if (fmtp.config)
                                    fmtp.config += ';';
                                fmtp.config += key + "=" + codecParameters[key];
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        if (fmtp.config)
                            this_1._mediaObject.fmtp.push(fmtp);
                        try {
                            for (var _e = (e_7 = void 0, __values(codec.rtcpFeedback)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var fb = _f.value;
                                this_1._mediaObject.rtcpFb.push({
                                    payload: codec.payloadType,
                                    type: fb.type,
                                    subtype: fb.parameter
                                });
                            }
                        }
                        catch (e_7_1) { e_7 = { error: e_7_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_7) throw e_7.error; }
                        }
                    };
                    var this_1 = this;
                    try {
                        for (var _h = __values(answerRtpParameters.codecs), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var codec = _j.value;
                            _loop_1(codec);
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    _this._mediaObject.payloads = answerRtpParameters.codecs
                        .map(function (codec) { return codec.payloadType; })
                        .join(' ');
                    _this._mediaObject.ext = [];
                    var _loop_2 = function (ext) {
                        // Don't add a header extension if not present in the offer.
                        var found = (offerMediaObject.ext || [])
                            .some(function (localExt) { return localExt.uri === ext.uri; });
                        if (!found)
                            return "continue";
                        this_2._mediaObject.ext.push({
                            uri: ext.uri,
                            value: ext.id
                        });
                    };
                    var this_2 = this;
                    try {
                        for (var _k = __values(answerRtpParameters.headerExtensions), _l = _k.next(); !_l.done; _l = _k.next()) {
                            var ext = _l.value;
                            _loop_2(ext);
                        }
                    }
                    catch (e_3_1) { e_3 = { error: e_3_1 }; }
                    finally {
                        try {
                            if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                        }
                        finally { if (e_3) throw e_3.error; }
                    }
                    // Allow both 1 byte and 2 bytes length header extensions.
                    if (extmapAllowMixed &&
                        offerMediaObject.extmapAllowMixed === 'extmap-allow-mixed') {
                        _this._mediaObject.extmapAllowMixed = 'extmap-allow-mixed';
                    }
                    // Simulcast.
                    if (offerMediaObject.simulcast) {
                        _this._mediaObject.simulcast =
                            {
                                dir1: 'recv',
                                list1: offerMediaObject.simulcast.list1
                            };
                        _this._mediaObject.rids = [];
                        try {
                            for (var _m = __values(offerMediaObject.rids || []), _o = _m.next(); !_o.done; _o = _m.next()) {
                                var rid = _o.value;
                                if (rid.direction !== 'send')
                                    continue;
                                _this._mediaObject.rids.push({
                                    id: rid.id,
                                    direction: 'recv'
                                });
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                    }
                    // Simulcast (draft version 03).
                    else if (offerMediaObject.simulcast_03) {
                        // eslint-disable-next-line camelcase
                        _this._mediaObject.simulcast_03 =
                            {
                                value: offerMediaObject.simulcast_03.value.replace(/send/g, 'recv')
                            };
                        _this._mediaObject.rids = [];
                        try {
                            for (var _p = __values(offerMediaObject.rids || []), _q = _p.next(); !_q.done; _q = _p.next()) {
                                var rid = _q.value;
                                if (rid.direction !== 'send')
                                    continue;
                                _this._mediaObject.rids.push({
                                    id: rid.id,
                                    direction: 'recv'
                                });
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                    }
                    _this._mediaObject.rtcpMux = 'rtcp-mux';
                    _this._mediaObject.rtcpRsize = 'rtcp-rsize';
                    if (_this._planB && _this._mediaObject.type === 'video')
                        _this._mediaObject.xGoogleFlag = 'conference';
                    break;
                }
            case 'application':
                {
                    // New spec.
                    if (typeof offerMediaObject.sctpPort === 'number') {
                        _this._mediaObject.payloads = 'webrtc-datachannel';
                        _this._mediaObject.sctpPort = sctpParameters.port;
                        _this._mediaObject.maxMessageSize = sctpParameters.maxMessageSize;
                    }
                    // Old spec.
                    else if (offerMediaObject.sctpmap) {
                        _this._mediaObject.payloads = sctpParameters.port;
                        _this._mediaObject.sctpmap =
                            {
                                app: 'webrtc-datachannel',
                                sctpmapNumber: sctpParameters.port,
                                maxMessageSize: sctpParameters.maxMessageSize
                            };
                    }
                    break;
                }
        }
        return _this;
    }
    AnswerMediaSection.prototype.setDtlsRole = function (role) {
        switch (role) {
            case 'client':
                this._mediaObject.setup = 'active';
                break;
            case 'server':
                this._mediaObject.setup = 'passive';
                break;
            case 'auto':
                this._mediaObject.setup = 'actpass';
                break;
        }
    };
    return AnswerMediaSection;
}(MediaSection));
exports.AnswerMediaSection = AnswerMediaSection;
var OfferMediaSection = /** @class */ (function (_super) {
    __extends(OfferMediaSection, _super);
    function OfferMediaSection(_a) {
        var e_8, _b, e_9, _c, e_10, _d, e_11, _e;
        var iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, plainRtpParameters = _a.plainRtpParameters, _f = _a.planB, planB = _f === void 0 ? false : _f, mid = _a.mid, kind = _a.kind, offerRtpParameters = _a.offerRtpParameters, streamId = _a.streamId, trackId = _a.trackId, _g = _a.oldDataChannelSpec, oldDataChannelSpec = _g === void 0 ? false : _g;
        var _this = _super.call(this, { iceParameters: iceParameters, iceCandidates: iceCandidates, dtlsParameters: dtlsParameters, planB: planB }) || this;
        _this._mediaObject.mid = String(mid);
        _this._mediaObject.type = kind;
        if (!plainRtpParameters) {
            _this._mediaObject.connection = { ip: '127.0.0.1', version: 4 };
            if (!sctpParameters)
                _this._mediaObject.protocol = 'UDP/TLS/RTP/SAVPF';
            else
                _this._mediaObject.protocol = 'UDP/DTLS/SCTP';
            _this._mediaObject.port = 7;
        }
        else {
            _this._mediaObject.connection =
                {
                    ip: plainRtpParameters.ip,
                    version: plainRtpParameters.ipVersion
                };
            _this._mediaObject.protocol = 'RTP/AVP';
            _this._mediaObject.port = plainRtpParameters.port;
        }
        switch (kind) {
            case 'audio':
            case 'video':
                {
                    _this._mediaObject.direction = 'sendonly';
                    _this._mediaObject.rtp = [];
                    _this._mediaObject.rtcpFb = [];
                    _this._mediaObject.fmtp = [];
                    if (!_this._planB)
                        _this._mediaObject.msid = (streamId || '-') + " " + trackId;
                    try {
                        for (var _h = __values(offerRtpParameters.codecs), _j = _h.next(); !_j.done; _j = _h.next()) {
                            var codec = _j.value;
                            var rtp = {
                                payload: codec.payloadType,
                                codec: getCodecName(codec),
                                rate: codec.clockRate
                            };
                            if (codec.channels > 1)
                                rtp.encoding = codec.channels;
                            _this._mediaObject.rtp.push(rtp);
                            var fmtp = {
                                payload: codec.payloadType,
                                config: ''
                            };
                            try {
                                for (var _k = (e_9 = void 0, __values(Object.keys(codec.parameters))), _l = _k.next(); !_l.done; _l = _k.next()) {
                                    var key = _l.value;
                                    if (fmtp.config)
                                        fmtp.config += ';';
                                    fmtp.config += key + "=" + codec.parameters[key];
                                }
                            }
                            catch (e_9_1) { e_9 = { error: e_9_1 }; }
                            finally {
                                try {
                                    if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
                                }
                                finally { if (e_9) throw e_9.error; }
                            }
                            if (fmtp.config)
                                _this._mediaObject.fmtp.push(fmtp);
                            try {
                                for (var _m = (e_10 = void 0, __values(codec.rtcpFeedback)), _o = _m.next(); !_o.done; _o = _m.next()) {
                                    var fb = _o.value;
                                    _this._mediaObject.rtcpFb.push({
                                        payload: codec.payloadType,
                                        type: fb.type,
                                        subtype: fb.parameter
                                    });
                                }
                            }
                            catch (e_10_1) { e_10 = { error: e_10_1 }; }
                            finally {
                                try {
                                    if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
                                }
                                finally { if (e_10) throw e_10.error; }
                            }
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                    _this._mediaObject.payloads = offerRtpParameters.codecs
                        .map(function (codec) { return codec.payloadType; })
                        .join(' ');
                    _this._mediaObject.ext = [];
                    try {
                        for (var _p = __values(offerRtpParameters.headerExtensions), _q = _p.next(); !_q.done; _q = _p.next()) {
                            var ext = _q.value;
                            _this._mediaObject.ext.push({
                                uri: ext.uri,
                                value: ext.id
                            });
                        }
                    }
                    catch (e_11_1) { e_11 = { error: e_11_1 }; }
                    finally {
                        try {
                            if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
                        }
                        finally { if (e_11) throw e_11.error; }
                    }
                    _this._mediaObject.rtcpMux = 'rtcp-mux';
                    _this._mediaObject.rtcpRsize = 'rtcp-rsize';
                    var encoding = offerRtpParameters.encodings[0];
                    var ssrc = encoding.ssrc;
                    var rtxSsrc = (encoding.rtx && encoding.rtx.ssrc)
                        ? encoding.rtx.ssrc
                        : undefined;
                    _this._mediaObject.ssrcs = [];
                    _this._mediaObject.ssrcGroups = [];
                    if (offerRtpParameters.rtcp.cname) {
                        _this._mediaObject.ssrcs.push({
                            id: ssrc,
                            attribute: 'cname',
                            value: offerRtpParameters.rtcp.cname
                        });
                    }
                    if (_this._planB) {
                        _this._mediaObject.ssrcs.push({
                            id: ssrc,
                            attribute: 'msid',
                            value: (streamId || '-') + " " + trackId
                        });
                    }
                    if (rtxSsrc) {
                        if (offerRtpParameters.rtcp.cname) {
                            _this._mediaObject.ssrcs.push({
                                id: rtxSsrc,
                                attribute: 'cname',
                                value: offerRtpParameters.rtcp.cname
                            });
                        }
                        if (_this._planB) {
                            _this._mediaObject.ssrcs.push({
                                id: rtxSsrc,
                                attribute: 'msid',
                                value: (streamId || '-') + " " + trackId
                            });
                        }
                        // Associate original and retransmission SSRCs.
                        _this._mediaObject.ssrcGroups.push({
                            semantics: 'FID',
                            ssrcs: ssrc + " " + rtxSsrc
                        });
                    }
                    break;
                }
            case 'application':
                {
                    // New spec.
                    if (!oldDataChannelSpec) {
                        _this._mediaObject.payloads = 'webrtc-datachannel';
                        _this._mediaObject.sctpPort = sctpParameters.port;
                        _this._mediaObject.maxMessageSize = sctpParameters.maxMessageSize;
                    }
                    // Old spec.
                    else {
                        _this._mediaObject.payloads = sctpParameters.port;
                        _this._mediaObject.sctpmap =
                            {
                                app: 'webrtc-datachannel',
                                sctpmapNumber: sctpParameters.port,
                                maxMessageSize: sctpParameters.maxMessageSize
                            };
                    }
                    break;
                }
        }
        return _this;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    OfferMediaSection.prototype.setDtlsRole = function (role) {
        // Always 'actpass'.
        this._mediaObject.setup = 'actpass';
    };
    OfferMediaSection.prototype.planBReceive = function (_a) {
        var offerRtpParameters = _a.offerRtpParameters, streamId = _a.streamId, trackId = _a.trackId;
        var encoding = offerRtpParameters.encodings[0];
        var ssrc = encoding.ssrc;
        var rtxSsrc = (encoding.rtx && encoding.rtx.ssrc)
            ? encoding.rtx.ssrc
            : undefined;
        if (offerRtpParameters.rtcp.cname) {
            this._mediaObject.ssrcs.push({
                id: ssrc,
                attribute: 'cname',
                value: offerRtpParameters.rtcp.cname
            });
        }
        this._mediaObject.ssrcs.push({
            id: ssrc,
            attribute: 'msid',
            value: (streamId || '-') + " " + trackId
        });
        if (rtxSsrc) {
            if (offerRtpParameters.rtcp.cname) {
                this._mediaObject.ssrcs.push({
                    id: rtxSsrc,
                    attribute: 'cname',
                    value: offerRtpParameters.rtcp.cname
                });
            }
            this._mediaObject.ssrcs.push({
                id: rtxSsrc,
                attribute: 'msid',
                value: (streamId || '-') + " " + trackId
            });
            // Associate original and retransmission SSRCs.
            this._mediaObject.ssrcGroups.push({
                semantics: 'FID',
                ssrcs: ssrc + " " + rtxSsrc
            });
        }
    };
    OfferMediaSection.prototype.planBStopReceiving = function (_a) {
        var offerRtpParameters = _a.offerRtpParameters;
        var encoding = offerRtpParameters.encodings[0];
        var ssrc = encoding.ssrc;
        var rtxSsrc = (encoding.rtx && encoding.rtx.ssrc)
            ? encoding.rtx.ssrc
            : undefined;
        this._mediaObject.ssrcs = this._mediaObject.ssrcs
            .filter(function (s) { return s.id !== ssrc && s.id !== rtxSsrc; });
        if (rtxSsrc) {
            this._mediaObject.ssrcGroups = this._mediaObject.ssrcGroups
                .filter(function (group) { return group.ssrcs !== ssrc + " " + rtxSsrc; });
        }
    };
    return OfferMediaSection;
}(MediaSection));
exports.OfferMediaSection = OfferMediaSection;
function getCodecName(codec) {
    var MimeTypeRegex = new RegExp('^(audio|video)/(.+)', 'i');
    var mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
    if (!mimeTypeMatch)
        throw new TypeError('invalid codec.mimeType');
    return mimeTypeMatch[2];
}
//# sourceMappingURL=MediaSection.js.map