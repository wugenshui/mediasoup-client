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
exports.mangleRtpParameters = exports.getCapabilities = void 0;
var utils = __importStar(require("../../utils"));
/**
 * Normalize ORTC based Edge's RTCRtpReceiver.getCapabilities() to produce a full
 * compliant ORTC RTCRtpCapabilities.
 */
function getCapabilities() {
    var e_1, _a, e_2, _b;
    var nativeCaps = RTCRtpReceiver.getCapabilities();
    var caps = utils.clone(nativeCaps, {});
    try {
        for (var _c = __values(caps.codecs), _d = _c.next(); !_d.done; _d = _c.next()) {
            var codec = _d.value;
            // Rename numChannels to channels.
            codec.channels = codec.numChannels;
            delete codec.numChannels;
            // Add mimeType.
            codec.mimeType = codec.mimeType || codec.kind + "/" + codec.name;
            // NOTE: Edge sets some numeric parameters as string rather than number. Fix them.
            if (codec.parameters) {
                var parameters = codec.parameters;
                if (parameters.apt)
                    parameters.apt = Number(parameters.apt);
                if (parameters['packetization-mode'])
                    parameters['packetization-mode'] = Number(parameters['packetization-mode']);
            }
            try {
                // Delete emty parameter String in rtcpFeedback.
                for (var _e = (e_2 = void 0, __values(codec.rtcpFeedback || [])), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var feedback = _f.value;
                    if (!feedback.parameter)
                        feedback.parameter = '';
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
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return caps;
}
exports.getCapabilities = getCapabilities;
/**
 * Generate RTCRtpParameters as ORTC based Edge likes.
 */
function mangleRtpParameters(rtpParameters) {
    var e_3, _a;
    var params = utils.clone(rtpParameters, {});
    // Rename mid to muxId.
    if (params.mid) {
        params.muxId = params.mid;
        delete params.mid;
    }
    try {
        for (var _b = __values(params.codecs), _c = _b.next(); !_c.done; _c = _b.next()) {
            var codec = _c.value;
            // Rename channels to numChannels.
            if (codec.channels) {
                codec.numChannels = codec.channels;
                delete codec.channels;
            }
            // Add codec.name (requried by Edge).
            if (codec.mimeType && !codec.name)
                codec.name = codec.mimeType.split('/')[1];
            // Remove mimeType.
            delete codec.mimeType;
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_3) throw e_3.error; }
    }
    return params;
}
exports.mangleRtpParameters = mangleRtpParameters;
//# sourceMappingURL=edgeUtils.js.map