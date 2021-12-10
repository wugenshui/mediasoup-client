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
exports.canReceive = exports.canSend = exports.generateProbatorRtpParameters = exports.reduceCodecs = exports.getSendingRemoteRtpParameters = exports.getSendingRtpParameters = exports.getRecvRtpCapabilities = exports.getExtendedRtpCapabilities = exports.validateSctpStreamParameters = exports.validateSctpParameters = exports.validateNumSctpStreams = exports.validateSctpCapabilities = exports.validateRtcpParameters = exports.validateRtpEncodingParameters = exports.validateRtpHeaderExtensionParameters = exports.validateRtpCodecParameters = exports.validateRtpParameters = exports.validateRtpHeaderExtension = exports.validateRtcpFeedback = exports.validateRtpCodecCapability = exports.validateRtpCapabilities = void 0;
var h264 = __importStar(require("h264-profile-level-id"));
var utils = __importStar(require("./utils"));
var RTP_PROBATOR_MID = 'probator';
var RTP_PROBATOR_SSRC = 1234;
var RTP_PROBATOR_CODEC_PAYLOAD_TYPE = 127;
/**
 * Validates RtpCapabilities. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtpCapabilities(caps) {
    var e_1, _a, e_2, _b;
    if (typeof caps !== 'object')
        throw new TypeError('caps is not an object');
    // codecs is optional. If unset, fill with an empty array.
    if (caps.codecs && !Array.isArray(caps.codecs))
        throw new TypeError('caps.codecs is not an array');
    else if (!caps.codecs)
        caps.codecs = [];
    try {
        for (var _c = __values(caps.codecs), _d = _c.next(); !_d.done; _d = _c.next()) {
            var codec = _d.value;
            validateRtpCodecCapability(codec);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    // headerExtensions is optional. If unset, fill with an empty array.
    if (caps.headerExtensions && !Array.isArray(caps.headerExtensions))
        throw new TypeError('caps.headerExtensions is not an array');
    else if (!caps.headerExtensions)
        caps.headerExtensions = [];
    try {
        for (var _e = __values(caps.headerExtensions), _f = _e.next(); !_f.done; _f = _e.next()) {
            var ext = _f.value;
            validateRtpHeaderExtension(ext);
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_2) throw e_2.error; }
    }
}
exports.validateRtpCapabilities = validateRtpCapabilities;
/**
 * Validates RtpCodecCapability. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtpCodecCapability(codec) {
    var e_3, _a, e_4, _b;
    var MimeTypeRegex = new RegExp('^(audio|video)/(.+)', 'i');
    if (typeof codec !== 'object')
        throw new TypeError('codec is not an object');
    // mimeType is mandatory.
    if (!codec.mimeType || typeof codec.mimeType !== 'string')
        throw new TypeError('missing codec.mimeType');
    var mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
    if (!mimeTypeMatch)
        throw new TypeError('invalid codec.mimeType');
    // Just override kind with media component of mimeType.
    codec.kind = mimeTypeMatch[1].toLowerCase();
    // preferredPayloadType is optional.
    if (codec.preferredPayloadType && typeof codec.preferredPayloadType !== 'number')
        throw new TypeError('invalid codec.preferredPayloadType');
    // clockRate is mandatory.
    if (typeof codec.clockRate !== 'number')
        throw new TypeError('missing codec.clockRate');
    // channels is optional. If unset, set it to 1 (just if audio).
    if (codec.kind === 'audio') {
        if (typeof codec.channels !== 'number')
            codec.channels = 1;
    }
    else {
        delete codec.channels;
    }
    // parameters is optional. If unset, set it to an empty object.
    if (!codec.parameters || typeof codec.parameters !== 'object')
        codec.parameters = {};
    try {
        for (var _c = __values(Object.keys(codec.parameters)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var key = _d.value;
            var value = codec.parameters[key];
            if (value === undefined) {
                codec.parameters[key] = '';
                value = '';
            }
            if (typeof value !== 'string' && typeof value !== 'number') {
                throw new TypeError("invalid codec parameter [key:" + key + "s, value:" + value + "]");
            }
            // Specific parameters validation.
            if (key === 'apt') {
                if (typeof value !== 'number')
                    throw new TypeError('invalid codec apt parameter');
            }
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_3) throw e_3.error; }
    }
    // rtcpFeedback is optional. If unset, set it to an empty array.
    if (!codec.rtcpFeedback || !Array.isArray(codec.rtcpFeedback))
        codec.rtcpFeedback = [];
    try {
        for (var _e = __values(codec.rtcpFeedback), _f = _e.next(); !_f.done; _f = _e.next()) {
            var fb = _f.value;
            validateRtcpFeedback(fb);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_4) throw e_4.error; }
    }
}
exports.validateRtpCodecCapability = validateRtpCodecCapability;
/**
 * Validates RtcpFeedback. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtcpFeedback(fb) {
    if (typeof fb !== 'object')
        throw new TypeError('fb is not an object');
    // type is mandatory.
    if (!fb.type || typeof fb.type !== 'string')
        throw new TypeError('missing fb.type');
    // parameter is optional. If unset set it to an empty string.
    if (!fb.parameter || typeof fb.parameter !== 'string')
        fb.parameter = '';
}
exports.validateRtcpFeedback = validateRtcpFeedback;
/**
 * Validates RtpHeaderExtension. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtpHeaderExtension(ext) {
    if (typeof ext !== 'object')
        throw new TypeError('ext is not an object');
    // kind is optional. If unset set it to an empty string.
    if (!ext.kind || typeof ext.kind !== 'string')
        ext.kind = '';
    if (ext.kind !== '' && ext.kind !== 'audio' && ext.kind !== 'video')
        throw new TypeError('invalid ext.kind');
    // uri is mandatory.
    if (!ext.uri || typeof ext.uri !== 'string')
        throw new TypeError('missing ext.uri');
    // preferredId is mandatory.
    if (typeof ext.preferredId !== 'number')
        throw new TypeError('missing ext.preferredId');
    // preferredEncrypt is optional. If unset set it to false.
    if (ext.preferredEncrypt && typeof ext.preferredEncrypt !== 'boolean')
        throw new TypeError('invalid ext.preferredEncrypt');
    else if (!ext.preferredEncrypt)
        ext.preferredEncrypt = false;
    // direction is optional. If unset set it to sendrecv.
    if (ext.direction && typeof ext.direction !== 'string')
        throw new TypeError('invalid ext.direction');
    else if (!ext.direction)
        ext.direction = 'sendrecv';
}
exports.validateRtpHeaderExtension = validateRtpHeaderExtension;
/**
 * Validates RtpParameters. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtpParameters(params) {
    var e_5, _a, e_6, _b, e_7, _c;
    if (typeof params !== 'object')
        throw new TypeError('params is not an object');
    // mid is optional.
    if (params.mid && typeof params.mid !== 'string')
        throw new TypeError('params.mid is not a string');
    // codecs is mandatory.
    if (!Array.isArray(params.codecs))
        throw new TypeError('missing params.codecs');
    try {
        for (var _d = __values(params.codecs), _e = _d.next(); !_e.done; _e = _d.next()) {
            var codec = _e.value;
            validateRtpCodecParameters(codec);
        }
    }
    catch (e_5_1) { e_5 = { error: e_5_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_5) throw e_5.error; }
    }
    // headerExtensions is optional. If unset, fill with an empty array.
    if (params.headerExtensions && !Array.isArray(params.headerExtensions))
        throw new TypeError('params.headerExtensions is not an array');
    else if (!params.headerExtensions)
        params.headerExtensions = [];
    try {
        for (var _f = __values(params.headerExtensions), _g = _f.next(); !_g.done; _g = _f.next()) {
            var ext = _g.value;
            validateRtpHeaderExtensionParameters(ext);
        }
    }
    catch (e_6_1) { e_6 = { error: e_6_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
        }
        finally { if (e_6) throw e_6.error; }
    }
    // encodings is optional. If unset, fill with an empty array.
    if (params.encodings && !Array.isArray(params.encodings))
        throw new TypeError('params.encodings is not an array');
    else if (!params.encodings)
        params.encodings = [];
    try {
        for (var _h = __values(params.encodings), _j = _h.next(); !_j.done; _j = _h.next()) {
            var encoding = _j.value;
            validateRtpEncodingParameters(encoding);
        }
    }
    catch (e_7_1) { e_7 = { error: e_7_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
        }
        finally { if (e_7) throw e_7.error; }
    }
    // rtcp is optional. If unset, fill with an empty object.
    if (params.rtcp && typeof params.rtcp !== 'object')
        throw new TypeError('params.rtcp is not an object');
    else if (!params.rtcp)
        params.rtcp = {};
    validateRtcpParameters(params.rtcp);
}
exports.validateRtpParameters = validateRtpParameters;
/**
 * Validates RtpCodecParameters. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtpCodecParameters(codec) {
    var e_8, _a, e_9, _b;
    var MimeTypeRegex = new RegExp('^(audio|video)/(.+)', 'i');
    if (typeof codec !== 'object')
        throw new TypeError('codec is not an object');
    // mimeType is mandatory.
    if (!codec.mimeType || typeof codec.mimeType !== 'string')
        throw new TypeError('missing codec.mimeType');
    var mimeTypeMatch = MimeTypeRegex.exec(codec.mimeType);
    if (!mimeTypeMatch)
        throw new TypeError('invalid codec.mimeType');
    // payloadType is mandatory.
    if (typeof codec.payloadType !== 'number')
        throw new TypeError('missing codec.payloadType');
    // clockRate is mandatory.
    if (typeof codec.clockRate !== 'number')
        throw new TypeError('missing codec.clockRate');
    var kind = mimeTypeMatch[1].toLowerCase();
    // channels is optional. If unset, set it to 1 (just if audio).
    if (kind === 'audio') {
        if (typeof codec.channels !== 'number')
            codec.channels = 1;
    }
    else {
        delete codec.channels;
    }
    // parameters is optional. If unset, set it to an empty object.
    if (!codec.parameters || typeof codec.parameters !== 'object')
        codec.parameters = {};
    try {
        for (var _c = __values(Object.keys(codec.parameters)), _d = _c.next(); !_d.done; _d = _c.next()) {
            var key = _d.value;
            var value = codec.parameters[key];
            if (value === undefined) {
                codec.parameters[key] = '';
                value = '';
            }
            if (typeof value !== 'string' && typeof value !== 'number') {
                throw new TypeError("invalid codec parameter [key:" + key + "s, value:" + value + "]");
            }
            // Specific parameters validation.
            if (key === 'apt') {
                if (typeof value !== 'number')
                    throw new TypeError('invalid codec apt parameter');
            }
        }
    }
    catch (e_8_1) { e_8 = { error: e_8_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_8) throw e_8.error; }
    }
    // rtcpFeedback is optional. If unset, set it to an empty array.
    if (!codec.rtcpFeedback || !Array.isArray(codec.rtcpFeedback))
        codec.rtcpFeedback = [];
    try {
        for (var _e = __values(codec.rtcpFeedback), _f = _e.next(); !_f.done; _f = _e.next()) {
            var fb = _f.value;
            validateRtcpFeedback(fb);
        }
    }
    catch (e_9_1) { e_9 = { error: e_9_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_9) throw e_9.error; }
    }
}
exports.validateRtpCodecParameters = validateRtpCodecParameters;
/**
 * Validates RtpHeaderExtensionParameteters. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtpHeaderExtensionParameters(ext) {
    var e_10, _a;
    if (typeof ext !== 'object')
        throw new TypeError('ext is not an object');
    // uri is mandatory.
    if (!ext.uri || typeof ext.uri !== 'string')
        throw new TypeError('missing ext.uri');
    // id is mandatory.
    if (typeof ext.id !== 'number')
        throw new TypeError('missing ext.id');
    // encrypt is optional. If unset set it to false.
    if (ext.encrypt && typeof ext.encrypt !== 'boolean')
        throw new TypeError('invalid ext.encrypt');
    else if (!ext.encrypt)
        ext.encrypt = false;
    // parameters is optional. If unset, set it to an empty object.
    if (!ext.parameters || typeof ext.parameters !== 'object')
        ext.parameters = {};
    try {
        for (var _b = __values(Object.keys(ext.parameters)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var value = ext.parameters[key];
            if (value === undefined) {
                ext.parameters[key] = '';
                value = '';
            }
            if (typeof value !== 'string' && typeof value !== 'number')
                throw new TypeError('invalid header extension parameter');
        }
    }
    catch (e_10_1) { e_10 = { error: e_10_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_10) throw e_10.error; }
    }
}
exports.validateRtpHeaderExtensionParameters = validateRtpHeaderExtensionParameters;
/**
 * Validates RtpEncodingParameters. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtpEncodingParameters(encoding) {
    if (typeof encoding !== 'object')
        throw new TypeError('encoding is not an object');
    // ssrc is optional.
    if (encoding.ssrc && typeof encoding.ssrc !== 'number')
        throw new TypeError('invalid encoding.ssrc');
    // rid is optional.
    if (encoding.rid && typeof encoding.rid !== 'string')
        throw new TypeError('invalid encoding.rid');
    // rtx is optional.
    if (encoding.rtx && typeof encoding.rtx !== 'object') {
        throw new TypeError('invalid encoding.rtx');
    }
    else if (encoding.rtx) {
        // RTX ssrc is mandatory if rtx is present.
        if (typeof encoding.rtx.ssrc !== 'number')
            throw new TypeError('missing encoding.rtx.ssrc');
    }
    // dtx is optional. If unset set it to false.
    if (!encoding.dtx || typeof encoding.dtx !== 'boolean')
        encoding.dtx = false;
    // scalabilityMode is optional.
    if (encoding.scalabilityMode && typeof encoding.scalabilityMode !== 'string')
        throw new TypeError('invalid encoding.scalabilityMode');
}
exports.validateRtpEncodingParameters = validateRtpEncodingParameters;
/**
 * Validates RtcpParameters. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateRtcpParameters(rtcp) {
    if (typeof rtcp !== 'object')
        throw new TypeError('rtcp is not an object');
    // cname is optional.
    if (rtcp.cname && typeof rtcp.cname !== 'string')
        throw new TypeError('invalid rtcp.cname');
    // reducedSize is optional. If unset set it to true.
    if (!rtcp.reducedSize || typeof rtcp.reducedSize !== 'boolean')
        rtcp.reducedSize = true;
}
exports.validateRtcpParameters = validateRtcpParameters;
/**
 * Validates SctpCapabilities. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateSctpCapabilities(caps) {
    if (typeof caps !== 'object')
        throw new TypeError('caps is not an object');
    // numStreams is mandatory.
    if (!caps.numStreams || typeof caps.numStreams !== 'object')
        throw new TypeError('missing caps.numStreams');
    validateNumSctpStreams(caps.numStreams);
}
exports.validateSctpCapabilities = validateSctpCapabilities;
/**
 * Validates NumSctpStreams. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateNumSctpStreams(numStreams) {
    if (typeof numStreams !== 'object')
        throw new TypeError('numStreams is not an object');
    // OS is mandatory.
    if (typeof numStreams.OS !== 'number')
        throw new TypeError('missing numStreams.OS');
    // MIS is mandatory.
    if (typeof numStreams.MIS !== 'number')
        throw new TypeError('missing numStreams.MIS');
}
exports.validateNumSctpStreams = validateNumSctpStreams;
/**
 * Validates SctpParameters. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateSctpParameters(params) {
    if (typeof params !== 'object')
        throw new TypeError('params is not an object');
    // port is mandatory.
    if (typeof params.port !== 'number')
        throw new TypeError('missing params.port');
    // OS is mandatory.
    if (typeof params.OS !== 'number')
        throw new TypeError('missing params.OS');
    // MIS is mandatory.
    if (typeof params.MIS !== 'number')
        throw new TypeError('missing params.MIS');
    // maxMessageSize is mandatory.
    if (typeof params.maxMessageSize !== 'number')
        throw new TypeError('missing params.maxMessageSize');
}
exports.validateSctpParameters = validateSctpParameters;
/**
 * Validates SctpStreamParameters. It may modify given data by adding missing
 * fields with default values.
 * It throws if invalid.
 */
function validateSctpStreamParameters(params) {
    if (typeof params !== 'object')
        throw new TypeError('params is not an object');
    // streamId is mandatory.
    if (typeof params.streamId !== 'number')
        throw new TypeError('missing params.streamId');
    // ordered is optional.
    var orderedGiven = false;
    if (typeof params.ordered === 'boolean')
        orderedGiven = true;
    else
        params.ordered = true;
    // maxPacketLifeTime is optional.
    if (params.maxPacketLifeTime && typeof params.maxPacketLifeTime !== 'number')
        throw new TypeError('invalid params.maxPacketLifeTime');
    // maxRetransmits is optional.
    if (params.maxRetransmits && typeof params.maxRetransmits !== 'number')
        throw new TypeError('invalid params.maxRetransmits');
    if (params.maxPacketLifeTime && params.maxRetransmits)
        throw new TypeError('cannot provide both maxPacketLifeTime and maxRetransmits');
    if (orderedGiven &&
        params.ordered &&
        (params.maxPacketLifeTime || params.maxRetransmits)) {
        throw new TypeError('cannot be ordered with maxPacketLifeTime or maxRetransmits');
    }
    else if (!orderedGiven && (params.maxPacketLifeTime || params.maxRetransmits)) {
        params.ordered = false;
    }
    // priority is optional.
    if (params.priority && typeof params.priority !== 'string')
        throw new TypeError('invalid params.priority');
    // label is optional.
    if (params.label && typeof params.label !== 'string')
        throw new TypeError('invalid params.label');
    // protocol is optional.
    if (params.protocol && typeof params.protocol !== 'string')
        throw new TypeError('invalid params.protocol');
}
exports.validateSctpStreamParameters = validateSctpStreamParameters;
/**
 * Generate extended RTP capabilities for sending and receiving.
 */
function getExtendedRtpCapabilities(localCaps, remoteCaps) {
    var e_11, _a, e_12, _b, e_13, _c;
    var extendedRtpCapabilities = {
        codecs: [],
        headerExtensions: []
    };
    var _loop_1 = function (remoteCodec) {
        if (isRtxCodec(remoteCodec))
            return "continue";
        var matchingLocalCodec = (localCaps.codecs || [])
            .find(function (localCodec) { return (matchCodecs(localCodec, remoteCodec, { strict: true, modify: true })); });
        if (!matchingLocalCodec)
            return "continue";
        var extendedCodec = {
            mimeType: matchingLocalCodec.mimeType,
            kind: matchingLocalCodec.kind,
            clockRate: matchingLocalCodec.clockRate,
            channels: matchingLocalCodec.channels,
            localPayloadType: matchingLocalCodec.preferredPayloadType,
            localRtxPayloadType: undefined,
            remotePayloadType: remoteCodec.preferredPayloadType,
            remoteRtxPayloadType: undefined,
            localParameters: matchingLocalCodec.parameters,
            remoteParameters: remoteCodec.parameters,
            rtcpFeedback: reduceRtcpFeedback(matchingLocalCodec, remoteCodec)
        };
        extendedRtpCapabilities.codecs.push(extendedCodec);
    };
    try {
        // Match media codecs and keep the order preferred by remoteCaps.
        for (var _d = __values(remoteCaps.codecs || []), _e = _d.next(); !_e.done; _e = _d.next()) {
            var remoteCodec = _e.value;
            _loop_1(remoteCodec);
        }
    }
    catch (e_11_1) { e_11 = { error: e_11_1 }; }
    finally {
        try {
            if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
        }
        finally { if (e_11) throw e_11.error; }
    }
    var _loop_2 = function (extendedCodec) {
        var matchingLocalRtxCodec = localCaps.codecs
            .find(function (localCodec) { return (isRtxCodec(localCodec) &&
            localCodec.parameters.apt === extendedCodec.localPayloadType); });
        var matchingRemoteRtxCodec = remoteCaps.codecs
            .find(function (remoteCodec) { return (isRtxCodec(remoteCodec) &&
            remoteCodec.parameters.apt === extendedCodec.remotePayloadType); });
        if (matchingLocalRtxCodec && matchingRemoteRtxCodec) {
            extendedCodec.localRtxPayloadType = matchingLocalRtxCodec.preferredPayloadType;
            extendedCodec.remoteRtxPayloadType = matchingRemoteRtxCodec.preferredPayloadType;
        }
    };
    try {
        // Match RTX codecs.
        for (var _f = __values(extendedRtpCapabilities.codecs), _g = _f.next(); !_g.done; _g = _f.next()) {
            var extendedCodec = _g.value;
            _loop_2(extendedCodec);
        }
    }
    catch (e_12_1) { e_12 = { error: e_12_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
        }
        finally { if (e_12) throw e_12.error; }
    }
    var _loop_3 = function (remoteExt) {
        var matchingLocalExt = localCaps.headerExtensions
            .find(function (localExt) { return (matchHeaderExtensions(localExt, remoteExt)); });
        if (!matchingLocalExt)
            return "continue";
        var extendedExt = {
            kind: remoteExt.kind,
            uri: remoteExt.uri,
            sendId: matchingLocalExt.preferredId,
            recvId: remoteExt.preferredId,
            encrypt: matchingLocalExt.preferredEncrypt,
            direction: 'sendrecv'
        };
        switch (remoteExt.direction) {
            case 'sendrecv':
                extendedExt.direction = 'sendrecv';
                break;
            case 'recvonly':
                extendedExt.direction = 'sendonly';
                break;
            case 'sendonly':
                extendedExt.direction = 'recvonly';
                break;
            case 'inactive':
                extendedExt.direction = 'inactive';
                break;
        }
        extendedRtpCapabilities.headerExtensions.push(extendedExt);
    };
    try {
        // Match header extensions.
        for (var _h = __values(remoteCaps.headerExtensions), _j = _h.next(); !_j.done; _j = _h.next()) {
            var remoteExt = _j.value;
            _loop_3(remoteExt);
        }
    }
    catch (e_13_1) { e_13 = { error: e_13_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
        }
        finally { if (e_13) throw e_13.error; }
    }
    return extendedRtpCapabilities;
}
exports.getExtendedRtpCapabilities = getExtendedRtpCapabilities;
/**
 * Generate RTP capabilities for receiving media based on the given extended
 * RTP capabilities.
 */
function getRecvRtpCapabilities(extendedRtpCapabilities) {
    var e_14, _a, e_15, _b;
    var rtpCapabilities = {
        codecs: [],
        headerExtensions: []
    };
    try {
        for (var _c = __values(extendedRtpCapabilities.codecs), _d = _c.next(); !_d.done; _d = _c.next()) {
            var extendedCodec = _d.value;
            var codec = {
                mimeType: extendedCodec.mimeType,
                kind: extendedCodec.kind,
                preferredPayloadType: extendedCodec.remotePayloadType,
                clockRate: extendedCodec.clockRate,
                channels: extendedCodec.channels,
                parameters: extendedCodec.localParameters,
                rtcpFeedback: extendedCodec.rtcpFeedback
            };
            rtpCapabilities.codecs.push(codec);
            // Add RTX codec.
            if (!extendedCodec.remoteRtxPayloadType)
                continue;
            var rtxCodec = {
                mimeType: extendedCodec.kind + "/rtx",
                kind: extendedCodec.kind,
                preferredPayloadType: extendedCodec.remoteRtxPayloadType,
                clockRate: extendedCodec.clockRate,
                parameters: {
                    apt: extendedCodec.remotePayloadType
                },
                rtcpFeedback: []
            };
            rtpCapabilities.codecs.push(rtxCodec);
            // TODO: In the future, we need to add FEC, CN, etc, codecs.
        }
    }
    catch (e_14_1) { e_14 = { error: e_14_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_14) throw e_14.error; }
    }
    try {
        for (var _e = __values(extendedRtpCapabilities.headerExtensions), _f = _e.next(); !_f.done; _f = _e.next()) {
            var extendedExtension = _f.value;
            // Ignore RTP extensions not valid for receiving.
            if (extendedExtension.direction !== 'sendrecv' &&
                extendedExtension.direction !== 'recvonly') {
                continue;
            }
            var ext = {
                kind: extendedExtension.kind,
                uri: extendedExtension.uri,
                preferredId: extendedExtension.recvId,
                preferredEncrypt: extendedExtension.encrypt,
                direction: extendedExtension.direction
            };
            rtpCapabilities.headerExtensions.push(ext);
        }
    }
    catch (e_15_1) { e_15 = { error: e_15_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_15) throw e_15.error; }
    }
    return rtpCapabilities;
}
exports.getRecvRtpCapabilities = getRecvRtpCapabilities;
/**
 * Generate RTP parameters of the given kind for sending media.
 * NOTE: mid, encodings and rtcp fields are left empty.
 */
function getSendingRtpParameters(kind, extendedRtpCapabilities) {
    var e_16, _a, e_17, _b;
    var rtpParameters = {
        mid: undefined,
        codecs: [],
        headerExtensions: [],
        encodings: [],
        rtcp: {}
    };
    try {
        for (var _c = __values(extendedRtpCapabilities.codecs), _d = _c.next(); !_d.done; _d = _c.next()) {
            var extendedCodec = _d.value;
            if (extendedCodec.kind !== kind)
                continue;
            var codec = {
                mimeType: extendedCodec.mimeType,
                payloadType: extendedCodec.localPayloadType,
                clockRate: extendedCodec.clockRate,
                channels: extendedCodec.channels,
                parameters: extendedCodec.localParameters,
                rtcpFeedback: extendedCodec.rtcpFeedback
            };
            rtpParameters.codecs.push(codec);
            // Add RTX codec.
            if (extendedCodec.localRtxPayloadType) {
                var rtxCodec = {
                    mimeType: extendedCodec.kind + "/rtx",
                    payloadType: extendedCodec.localRtxPayloadType,
                    clockRate: extendedCodec.clockRate,
                    parameters: {
                        apt: extendedCodec.localPayloadType
                    },
                    rtcpFeedback: []
                };
                rtpParameters.codecs.push(rtxCodec);
            }
        }
    }
    catch (e_16_1) { e_16 = { error: e_16_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_16) throw e_16.error; }
    }
    try {
        for (var _e = __values(extendedRtpCapabilities.headerExtensions), _f = _e.next(); !_f.done; _f = _e.next()) {
            var extendedExtension = _f.value;
            // Ignore RTP extensions of a different kind and those not valid for sending.
            if ((extendedExtension.kind && extendedExtension.kind !== kind) ||
                (extendedExtension.direction !== 'sendrecv' &&
                    extendedExtension.direction !== 'sendonly')) {
                continue;
            }
            var ext = {
                uri: extendedExtension.uri,
                id: extendedExtension.sendId,
                encrypt: extendedExtension.encrypt,
                parameters: {}
            };
            rtpParameters.headerExtensions.push(ext);
        }
    }
    catch (e_17_1) { e_17 = { error: e_17_1 }; }
    finally {
        try {
            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
        }
        finally { if (e_17) throw e_17.error; }
    }
    return rtpParameters;
}
exports.getSendingRtpParameters = getSendingRtpParameters;
/**
 * Generate RTP parameters of the given kind suitable for the remote SDP answer.
 */
function getSendingRemoteRtpParameters(kind, extendedRtpCapabilities) {
    var e_18, _a, e_19, _b, e_20, _c, e_21, _d, e_22, _e;
    var rtpParameters = {
        mid: undefined,
        codecs: [],
        headerExtensions: [],
        encodings: [],
        rtcp: {}
    };
    try {
        for (var _f = __values(extendedRtpCapabilities.codecs), _g = _f.next(); !_g.done; _g = _f.next()) {
            var extendedCodec = _g.value;
            if (extendedCodec.kind !== kind)
                continue;
            var codec = {
                mimeType: extendedCodec.mimeType,
                payloadType: extendedCodec.localPayloadType,
                clockRate: extendedCodec.clockRate,
                channels: extendedCodec.channels,
                parameters: extendedCodec.remoteParameters,
                rtcpFeedback: extendedCodec.rtcpFeedback
            };
            rtpParameters.codecs.push(codec);
            // Add RTX codec.
            if (extendedCodec.localRtxPayloadType) {
                var rtxCodec = {
                    mimeType: extendedCodec.kind + "/rtx",
                    payloadType: extendedCodec.localRtxPayloadType,
                    clockRate: extendedCodec.clockRate,
                    parameters: {
                        apt: extendedCodec.localPayloadType
                    },
                    rtcpFeedback: []
                };
                rtpParameters.codecs.push(rtxCodec);
            }
        }
    }
    catch (e_18_1) { e_18 = { error: e_18_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_a = _f.return)) _a.call(_f);
        }
        finally { if (e_18) throw e_18.error; }
    }
    try {
        for (var _h = __values(extendedRtpCapabilities.headerExtensions), _j = _h.next(); !_j.done; _j = _h.next()) {
            var extendedExtension = _j.value;
            // Ignore RTP extensions of a different kind and those not valid for sending.
            if ((extendedExtension.kind && extendedExtension.kind !== kind) ||
                (extendedExtension.direction !== 'sendrecv' &&
                    extendedExtension.direction !== 'sendonly')) {
                continue;
            }
            var ext = {
                uri: extendedExtension.uri,
                id: extendedExtension.sendId,
                encrypt: extendedExtension.encrypt,
                parameters: {}
            };
            rtpParameters.headerExtensions.push(ext);
        }
    }
    catch (e_19_1) { e_19 = { error: e_19_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_b = _h.return)) _b.call(_h);
        }
        finally { if (e_19) throw e_19.error; }
    }
    // Reduce codecs' RTCP feedback. Use Transport-CC if available, REMB otherwise.
    if (rtpParameters.headerExtensions.some(function (ext) { return (ext.uri === 'http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01'); })) {
        try {
            for (var _k = __values(rtpParameters.codecs), _l = _k.next(); !_l.done; _l = _k.next()) {
                var codec = _l.value;
                codec.rtcpFeedback = (codec.rtcpFeedback || [])
                    .filter(function (fb) { return fb.type !== 'goog-remb'; });
            }
        }
        catch (e_20_1) { e_20 = { error: e_20_1 }; }
        finally {
            try {
                if (_l && !_l.done && (_c = _k.return)) _c.call(_k);
            }
            finally { if (e_20) throw e_20.error; }
        }
    }
    else if (rtpParameters.headerExtensions.some(function (ext) { return (ext.uri === 'http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time'); })) {
        try {
            for (var _m = __values(rtpParameters.codecs), _o = _m.next(); !_o.done; _o = _m.next()) {
                var codec = _o.value;
                codec.rtcpFeedback = (codec.rtcpFeedback || [])
                    .filter(function (fb) { return fb.type !== 'transport-cc'; });
            }
        }
        catch (e_21_1) { e_21 = { error: e_21_1 }; }
        finally {
            try {
                if (_o && !_o.done && (_d = _m.return)) _d.call(_m);
            }
            finally { if (e_21) throw e_21.error; }
        }
    }
    else {
        try {
            for (var _p = __values(rtpParameters.codecs), _q = _p.next(); !_q.done; _q = _p.next()) {
                var codec = _q.value;
                codec.rtcpFeedback = (codec.rtcpFeedback || [])
                    .filter(function (fb) { return (fb.type !== 'transport-cc' &&
                    fb.type !== 'goog-remb'); });
            }
        }
        catch (e_22_1) { e_22 = { error: e_22_1 }; }
        finally {
            try {
                if (_q && !_q.done && (_e = _p.return)) _e.call(_p);
            }
            finally { if (e_22) throw e_22.error; }
        }
    }
    return rtpParameters;
}
exports.getSendingRemoteRtpParameters = getSendingRemoteRtpParameters;
/**
 * Reduce given codecs by returning an array of codecs "compatible" with the
 * given capability codec. If no capability codec is given, take the first
 * one(s).
 *
 * Given codecs must be generated by ortc.getSendingRtpParameters() or
 * ortc.getSendingRemoteRtpParameters().
 *
 * The returned array of codecs also include a RTX codec if available.
 */
function reduceCodecs(codecs, capCodec) {
    var filteredCodecs = [];
    // If no capability codec is given, take the first one (and RTX).
    if (!capCodec) {
        filteredCodecs.push(codecs[0]);
        if (isRtxCodec(codecs[1]))
            filteredCodecs.push(codecs[1]);
    }
    // Otherwise look for a compatible set of codecs.
    else {
        for (var idx = 0; idx < codecs.length; ++idx) {
            if (matchCodecs(codecs[idx], capCodec)) {
                filteredCodecs.push(codecs[idx]);
                if (isRtxCodec(codecs[idx + 1]))
                    filteredCodecs.push(codecs[idx + 1]);
                break;
            }
        }
        if (filteredCodecs.length === 0)
            throw new TypeError('no matching codec found');
    }
    return filteredCodecs;
}
exports.reduceCodecs = reduceCodecs;
/**
 * Create RTP parameters for a Consumer for the RTP probator.
 */
function generateProbatorRtpParameters(videoRtpParameters) {
    // Clone given reference video RTP parameters.
    videoRtpParameters = utils.clone(videoRtpParameters, {});
    // This may throw.
    validateRtpParameters(videoRtpParameters);
    var rtpParameters = {
        mid: RTP_PROBATOR_MID,
        codecs: [],
        headerExtensions: [],
        encodings: [{ ssrc: RTP_PROBATOR_SSRC }],
        rtcp: { cname: 'probator' }
    };
    rtpParameters.codecs.push(videoRtpParameters.codecs[0]);
    rtpParameters.codecs[0].payloadType = RTP_PROBATOR_CODEC_PAYLOAD_TYPE;
    rtpParameters.headerExtensions = videoRtpParameters.headerExtensions;
    return rtpParameters;
}
exports.generateProbatorRtpParameters = generateProbatorRtpParameters;
/**
 * Whether media can be sent based on the given RTP capabilities.
 */
function canSend(kind, extendedRtpCapabilities) {
    return extendedRtpCapabilities.codecs.
        some(function (codec) { return codec.kind === kind; });
}
exports.canSend = canSend;
/**
 * Whether the given RTP parameters can be received with the given RTP
 * capabilities.
 */
function canReceive(rtpParameters, extendedRtpCapabilities) {
    // This may throw.
    validateRtpParameters(rtpParameters);
    if (rtpParameters.codecs.length === 0)
        return false;
    var firstMediaCodec = rtpParameters.codecs[0];
    return extendedRtpCapabilities.codecs
        .some(function (codec) { return codec.remotePayloadType === firstMediaCodec.payloadType; });
}
exports.canReceive = canReceive;
function isRtxCodec(codec) {
    if (!codec)
        return false;
    return /.+\/rtx$/i.test(codec.mimeType);
}
function matchCodecs(aCodec, bCodec, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.strict, strict = _c === void 0 ? false : _c, _d = _b.modify, modify = _d === void 0 ? false : _d;
    var aMimeType = aCodec.mimeType.toLowerCase();
    var bMimeType = bCodec.mimeType.toLowerCase();
    if (aMimeType !== bMimeType)
        return false;
    if (aCodec.clockRate !== bCodec.clockRate)
        return false;
    if (aCodec.channels !== bCodec.channels)
        return false;
    // Per codec special checks.
    switch (aMimeType) {
        case 'video/h264':
            {
                var aPacketizationMode = aCodec.parameters['packetization-mode'] || 0;
                var bPacketizationMode = bCodec.parameters['packetization-mode'] || 0;
                if (aPacketizationMode !== bPacketizationMode)
                    return false;
                // If strict matching check profile-level-id.
                if (strict) {
                    if (!h264.isSameProfile(aCodec.parameters, bCodec.parameters))
                        return false;
                    var selectedProfileLevelId = void 0;
                    try {
                        selectedProfileLevelId =
                            h264.generateProfileLevelIdForAnswer(aCodec.parameters, bCodec.parameters);
                    }
                    catch (error) {
                        return false;
                    }
                    if (modify) {
                        if (selectedProfileLevelId) {
                            aCodec.parameters['profile-level-id'] = selectedProfileLevelId;
                            bCodec.parameters['profile-level-id'] = selectedProfileLevelId;
                        }
                        else {
                            delete aCodec.parameters['profile-level-id'];
                            delete bCodec.parameters['profile-level-id'];
                        }
                    }
                }
                break;
            }
        case 'video/vp9':
            {
                // If strict matching check profile-id.
                if (strict) {
                    var aProfileId = aCodec.parameters['profile-id'] || 0;
                    var bProfileId = bCodec.parameters['profile-id'] || 0;
                    if (aProfileId !== bProfileId)
                        return false;
                }
                break;
            }
    }
    return true;
}
function matchHeaderExtensions(aExt, bExt) {
    if (aExt.kind && bExt.kind && aExt.kind !== bExt.kind)
        return false;
    if (aExt.uri !== bExt.uri)
        return false;
    return true;
}
function reduceRtcpFeedback(codecA, codecB) {
    var e_23, _a;
    var reducedRtcpFeedback = [];
    var _loop_4 = function (aFb) {
        var matchingBFb = (codecB.rtcpFeedback || [])
            .find(function (bFb) { return (bFb.type === aFb.type &&
            (bFb.parameter === aFb.parameter || (!bFb.parameter && !aFb.parameter))); });
        if (matchingBFb)
            reducedRtcpFeedback.push(matchingBFb);
    };
    try {
        for (var _b = __values(codecA.rtcpFeedback || []), _c = _b.next(); !_c.done; _c = _b.next()) {
            var aFb = _c.value;
            _loop_4(aFb);
        }
    }
    catch (e_23_1) { e_23 = { error: e_23_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_23) throw e_23.error; }
    }
    return reducedRtcpFeedback;
}
//# sourceMappingURL=ortc.js.map