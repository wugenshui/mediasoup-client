"use strict";
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
exports.applyCodecParameters = exports.getCname = exports.extractDtlsParameters = exports.extractRtpCapabilities = void 0;
var sdpTransform = __importStar(require("sdp-transform"));
function extractRtpCapabilities(_a) {
    var e_1, _b, e_2, _c, e_3, _d, e_4, _e, e_5, _f;
    var sdpObject = _a.sdpObject;
    // Map of RtpCodecParameters indexed by payload type.
    var codecsMap = new Map();
    // Array of RtpHeaderExtensions.
    var headerExtensions = [];
    // Whether a m=audio/video section has been already found.
    var gotAudio = false;
    var gotVideo = false;
    try {
        for (var _g = __values(sdpObject.media), _h = _g.next(); !_h.done; _h = _g.next()) {
            var m = _h.value;
            var kind = m.type;
            switch (kind) {
                case 'audio':
                    {
                        if (gotAudio)
                            continue;
                        gotAudio = true;
                        break;
                    }
                case 'video':
                    {
                        if (gotVideo)
                            continue;
                        gotVideo = true;
                        break;
                    }
                default:
                    {
                        continue;
                    }
            }
            try {
                // Get codecs.
                for (var _j = (e_2 = void 0, __values(m.rtp)), _k = _j.next(); !_k.done; _k = _j.next()) {
                    var rtp = _k.value;
                    var codec = {
                        kind: kind,
                        mimeType: kind + "/" + rtp.codec,
                        preferredPayloadType: rtp.payload,
                        clockRate: rtp.rate,
                        channels: rtp.encoding,
                        parameters: {},
                        rtcpFeedback: []
                    };
                    codecsMap.set(codec.preferredPayloadType, codec);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_k && !_k.done && (_c = _j.return)) _c.call(_j);
                }
                finally { if (e_2) throw e_2.error; }
            }
            try {
                // Get codec parameters.
                for (var _l = (e_3 = void 0, __values(m.fmtp || [])), _m = _l.next(); !_m.done; _m = _l.next()) {
                    var fmtp = _m.value;
                    var parameters = sdpTransform.parseParams(fmtp.config);
                    var codec = codecsMap.get(fmtp.payload);
                    if (!codec)
                        continue;
                    // Specials case to convert parameter value to string.
                    if (parameters && parameters['profile-level-id'])
                        parameters['profile-level-id'] = String(parameters['profile-level-id']);
                    codec.parameters = parameters;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_m && !_m.done && (_d = _l.return)) _d.call(_l);
                }
                finally { if (e_3) throw e_3.error; }
            }
            try {
                // Get RTCP feedback for each codec.
                for (var _o = (e_4 = void 0, __values(m.rtcpFb || [])), _p = _o.next(); !_p.done; _p = _o.next()) {
                    var fb = _p.value;
                    var codec = codecsMap.get(fb.payload);
                    if (!codec)
                        continue;
                    var feedback = {
                        type: fb.type,
                        parameter: fb.subtype
                    };
                    if (!feedback.parameter)
                        delete feedback.parameter;
                    codec.rtcpFeedback.push(feedback);
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_p && !_p.done && (_e = _o.return)) _e.call(_o);
                }
                finally { if (e_4) throw e_4.error; }
            }
            try {
                // Get RTP header extensions.
                for (var _q = (e_5 = void 0, __values(m.ext || [])), _r = _q.next(); !_r.done; _r = _q.next()) {
                    var ext = _r.value;
                    // Ignore encrypted extensions (not yet supported in mediasoup).
                    if (ext['encrypt-uri'])
                        continue;
                    var headerExtension = {
                        kind: kind,
                        uri: ext.uri,
                        preferredId: ext.value
                    };
                    headerExtensions.push(headerExtension);
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_r && !_r.done && (_f = _q.return)) _f.call(_q);
                }
                finally { if (e_5) throw e_5.error; }
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_h && !_h.done && (_b = _g.return)) _b.call(_g);
        }
        finally { if (e_1) throw e_1.error; }
    }
    var rtpCapabilities = {
        codecs: Array.from(codecsMap.values()),
        headerExtensions: headerExtensions
    };
    return rtpCapabilities;
}
exports.extractRtpCapabilities = extractRtpCapabilities;
function extractDtlsParameters(_a) {
    var sdpObject = _a.sdpObject;
    var mediaObject = (sdpObject.media || [])
        .find(function (m) { return (m.iceUfrag && m.port !== 0); });
    if (!mediaObject)
        throw new Error('no active media section found');
    var fingerprint = mediaObject.fingerprint || sdpObject.fingerprint;
    var role;
    switch (mediaObject.setup) {
        case 'active':
            role = 'client';
            break;
        case 'passive':
            role = 'server';
            break;
        case 'actpass':
            role = 'auto';
            break;
    }
    var dtlsParameters = {
        role: role,
        fingerprints: [
            {
                algorithm: fingerprint.type,
                value: fingerprint.hash
            }
        ]
    };
    return dtlsParameters;
}
exports.extractDtlsParameters = extractDtlsParameters;
function getCname(_a) {
    var offerMediaObject = _a.offerMediaObject;
    var ssrcCnameLine = (offerMediaObject.ssrcs || [])
        .find(function (line) { return line.attribute === 'cname'; });
    if (!ssrcCnameLine)
        return '';
    return ssrcCnameLine.value;
}
exports.getCname = getCname;
/**
 * Apply codec parameters in the given SDP m= section answer based on the
 * given RTP parameters of an offer.
 */
function applyCodecParameters(_a) {
    var e_6, _b;
    var offerRtpParameters = _a.offerRtpParameters, answerMediaObject = _a.answerMediaObject;
    var _loop_1 = function (codec) {
        var e_7, _a;
        var mimeType = codec.mimeType.toLowerCase();
        // Avoid parsing codec parameters for unhandled codecs.
        if (mimeType !== 'audio/opus')
            return "continue";
        var rtp = (answerMediaObject.rtp || [])
            .find(function (r) { return r.payload === codec.payloadType; });
        if (!rtp)
            return "continue";
        // Just in case.
        answerMediaObject.fmtp = answerMediaObject.fmtp || [];
        var fmtp = answerMediaObject.fmtp
            .find(function (f) { return f.payload === codec.payloadType; });
        if (!fmtp) {
            fmtp = { payload: codec.payloadType, config: '' };
            answerMediaObject.fmtp.push(fmtp);
        }
        var parameters = sdpTransform.parseParams(fmtp.config);
        switch (mimeType) {
            case 'audio/opus':
                {
                    var spropStereo = codec.parameters['sprop-stereo'];
                    if (spropStereo !== undefined)
                        parameters.stereo = spropStereo ? 1 : 0;
                    break;
                }
        }
        // Write the codec fmtp.config back.
        fmtp.config = '';
        try {
            for (var _b = (e_7 = void 0, __values(Object.keys(parameters))), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                if (fmtp.config)
                    fmtp.config += ';';
                fmtp.config += key + "=" + parameters[key];
            }
        }
        catch (e_7_1) { e_7 = { error: e_7_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_7) throw e_7.error; }
        }
    };
    try {
        for (var _c = __values(offerRtpParameters.codecs), _d = _c.next(); !_d.done; _d = _c.next()) {
            var codec = _d.value;
            _loop_1(codec);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
        }
        finally { if (e_6) throw e_6.error; }
    }
}
exports.applyCodecParameters = applyCodecParameters;
//# sourceMappingURL=commonUtils.js.map