"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRtpEncodings = exports.extractPlainRtpParameters = void 0;
function extractPlainRtpParameters(_a) {
    var sdpObject = _a.sdpObject, kind = _a.kind;
    var mediaObject = (sdpObject.media || [])
        .find(function (m) { return m.type === kind; });
    if (!mediaObject)
        throw new Error("m=" + kind + " section not found");
    var connectionObject = mediaObject.connection || sdpObject.connection;
    return {
        ip: connectionObject.ip,
        ipVersion: connectionObject.version,
        port: mediaObject.port
    };
}
exports.extractPlainRtpParameters = extractPlainRtpParameters;
function getRtpEncodings(_a) {
    var sdpObject = _a.sdpObject, kind = _a.kind;
    var mediaObject = (sdpObject.media || [])
        .find(function (m) { return m.type === kind; });
    if (!mediaObject)
        throw new Error("m=" + kind + " section not found");
    var ssrcCnameLine = (mediaObject.ssrcs || [])[0];
    var ssrc = ssrcCnameLine ? ssrcCnameLine.id : null;
    if (ssrc)
        return [{ ssrc: ssrc }];
    else
        return [];
}
exports.getRtpEncodings = getRtpEncodings;
//# sourceMappingURL=plainRtpUtils.js.map