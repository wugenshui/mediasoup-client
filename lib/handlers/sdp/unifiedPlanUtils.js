"use strict";
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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLegacySimulcast = exports.getRtpEncodings = void 0;
function getRtpEncodings(_a) {
    var e_1, _b, e_2, _c, e_3, _d, e_4, _e;
    var offerMediaObject = _a.offerMediaObject;
    var ssrcs = new Set();
    try {
        for (var _f = __values(offerMediaObject.ssrcs || []), _g = _f.next(); !_g.done; _g = _f.next()) {
            var line = _g.value;
            var ssrc = line.id;
            ssrcs.add(ssrc);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
        }
        finally { if (e_1) throw e_1.error; }
    }
    if (ssrcs.size === 0)
        throw new Error('no a=ssrc lines found');
    var ssrcToRtxSsrc = new Map();
    try {
        // First assume RTX is used.
        for (var _h = __values(offerMediaObject.ssrcGroups || []), _j = _h.next(); !_j.done; _j = _h.next()) {
            var line = _j.value;
            if (line.semantics !== 'FID')
                continue;
            var _k = __read(line.ssrcs.split(/\s+/), 2), ssrc = _k[0], rtxSsrc = _k[1];
            ssrc = Number(ssrc);
            rtxSsrc = Number(rtxSsrc);
            if (ssrcs.has(ssrc)) {
                // Remove both the SSRC and RTX SSRC from the set so later we know that they
                // are already handled.
                ssrcs.delete(ssrc);
                ssrcs.delete(rtxSsrc);
                // Add to the map.
                ssrcToRtxSsrc.set(ssrc, rtxSsrc);
            }
        }
    }
    catch (e_2_1) { e_2 = { error: e_2_1 }; }
    finally {
        try {
            if (_j && !_j.done && (_c = _h.return)) _c.call(_h);
        }
        finally { if (e_2) throw e_2.error; }
    }
    try {
        // If the set of SSRCs is not empty it means that RTX is not being used, so take
        // media SSRCs from there.
        for (var ssrcs_1 = __values(ssrcs), ssrcs_1_1 = ssrcs_1.next(); !ssrcs_1_1.done; ssrcs_1_1 = ssrcs_1.next()) {
            var ssrc = ssrcs_1_1.value;
            // Add to the map.
            ssrcToRtxSsrc.set(ssrc, null);
        }
    }
    catch (e_3_1) { e_3 = { error: e_3_1 }; }
    finally {
        try {
            if (ssrcs_1_1 && !ssrcs_1_1.done && (_d = ssrcs_1.return)) _d.call(ssrcs_1);
        }
        finally { if (e_3) throw e_3.error; }
    }
    var encodings = [];
    try {
        for (var ssrcToRtxSsrc_1 = __values(ssrcToRtxSsrc), ssrcToRtxSsrc_1_1 = ssrcToRtxSsrc_1.next(); !ssrcToRtxSsrc_1_1.done; ssrcToRtxSsrc_1_1 = ssrcToRtxSsrc_1.next()) {
            var _l = __read(ssrcToRtxSsrc_1_1.value, 2), ssrc = _l[0], rtxSsrc = _l[1];
            var encoding = { ssrc: ssrc };
            if (rtxSsrc)
                encoding.rtx = { ssrc: rtxSsrc };
            encodings.push(encoding);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (ssrcToRtxSsrc_1_1 && !ssrcToRtxSsrc_1_1.done && (_e = ssrcToRtxSsrc_1.return)) _e.call(ssrcToRtxSsrc_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    return encodings;
}
exports.getRtpEncodings = getRtpEncodings;
/**
 * Adds multi-ssrc based simulcast into the given SDP media section offer.
 */
function addLegacySimulcast(_a) {
    var offerMediaObject = _a.offerMediaObject, numStreams = _a.numStreams;
    if (numStreams <= 1)
        throw new TypeError('numStreams must be greater than 1');
    // Get the SSRC.
    var ssrcMsidLine = (offerMediaObject.ssrcs || [])
        .find(function (line) { return line.attribute === 'msid'; });
    if (!ssrcMsidLine)
        throw new Error('a=ssrc line with msid information not found');
    var _b = __read(ssrcMsidLine.value.split(' ')[0], 2), streamId = _b[0], trackId = _b[1];
    var firstSsrc = ssrcMsidLine.id;
    var firstRtxSsrc;
    // Get the SSRC for RTX.
    (offerMediaObject.ssrcGroups || [])
        .some(function (line) {
        if (line.semantics !== 'FID')
            return false;
        var ssrcs = line.ssrcs.split(/\s+/);
        if (Number(ssrcs[0]) === firstSsrc) {
            firstRtxSsrc = Number(ssrcs[1]);
            return true;
        }
        else {
            return false;
        }
    });
    var ssrcCnameLine = offerMediaObject.ssrcs
        .find(function (line) { return line.attribute === 'cname'; });
    if (!ssrcCnameLine)
        throw new Error('a=ssrc line with cname information not found');
    var cname = ssrcCnameLine.value;
    var ssrcs = [];
    var rtxSsrcs = [];
    for (var i = 0; i < numStreams; ++i) {
        ssrcs.push(firstSsrc + i);
        if (firstRtxSsrc)
            rtxSsrcs.push(firstRtxSsrc + i);
    }
    offerMediaObject.ssrcGroups = [];
    offerMediaObject.ssrcs = [];
    offerMediaObject.ssrcGroups.push({
        semantics: 'SIM',
        ssrcs: ssrcs.join(' ')
    });
    for (var i = 0; i < ssrcs.length; ++i) {
        var ssrc = ssrcs[i];
        offerMediaObject.ssrcs.push({
            id: ssrc,
            attribute: 'cname',
            value: cname
        });
        offerMediaObject.ssrcs.push({
            id: ssrc,
            attribute: 'msid',
            value: streamId + " " + trackId
        });
    }
    for (var i = 0; i < rtxSsrcs.length; ++i) {
        var ssrc = ssrcs[i];
        var rtxSsrc = rtxSsrcs[i];
        offerMediaObject.ssrcs.push({
            id: rtxSsrc,
            attribute: 'cname',
            value: cname
        });
        offerMediaObject.ssrcs.push({
            id: rtxSsrc,
            attribute: 'msid',
            value: streamId + " " + trackId
        });
        offerMediaObject.ssrcGroups.push({
            semantics: 'FID',
            ssrcs: ssrc + " " + rtxSsrc
        });
    }
}
exports.addLegacySimulcast = addLegacySimulcast;
//# sourceMappingURL=unifiedPlanUtils.js.map