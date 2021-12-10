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
exports.RemoteSdp = void 0;
var sdpTransform = __importStar(require("sdp-transform"));
var Logger_1 = require("../../Logger");
var MediaSection_1 = require("./MediaSection");
var logger = new Logger_1.Logger('RemoteSdp');
var RemoteSdp = /** @class */ (function () {
    function RemoteSdp(_a) {
        var iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, plainRtpParameters = _a.plainRtpParameters, _b = _a.planB, planB = _b === void 0 ? false : _b;
        // MediaSection instances with same order as in the SDP.
        this._mediaSections = [];
        // MediaSection indices indexed by MID.
        this._midToIndex = new Map();
        this._iceParameters = iceParameters;
        this._iceCandidates = iceCandidates;
        this._dtlsParameters = dtlsParameters;
        this._sctpParameters = sctpParameters;
        this._plainRtpParameters = plainRtpParameters;
        this._planB = planB;
        this._sdpObject =
            {
                version: 0,
                origin: {
                    address: '0.0.0.0',
                    ipVer: 4,
                    netType: 'IN',
                    sessionId: 10000,
                    sessionVersion: 0,
                    username: 'mediasoup-client'
                },
                name: '-',
                timing: { start: 0, stop: 0 },
                media: []
            };
        // If ICE parameters are given, add ICE-Lite indicator.
        if (iceParameters && iceParameters.iceLite) {
            this._sdpObject.icelite = 'ice-lite';
        }
        // If DTLS parameters are given, assume WebRTC and BUNDLE.
        if (dtlsParameters) {
            this._sdpObject.msidSemantic = { semantic: 'WMS', token: '*' };
            // NOTE: We take the latest fingerprint.
            var numFingerprints = this._dtlsParameters.fingerprints.length;
            this._sdpObject.fingerprint =
                {
                    type: dtlsParameters.fingerprints[numFingerprints - 1].algorithm,
                    hash: dtlsParameters.fingerprints[numFingerprints - 1].value
                };
            this._sdpObject.groups = [{ type: 'BUNDLE', mids: '' }];
        }
        // If there are plain RPT parameters, override SDP origin.
        if (plainRtpParameters) {
            this._sdpObject.origin.address = plainRtpParameters.ip;
            this._sdpObject.origin.ipVer = plainRtpParameters.ipVersion;
        }
    }
    RemoteSdp.prototype.updateIceParameters = function (iceParameters) {
        var e_1, _a;
        logger.debug('updateIceParameters() [iceParameters:%o]', iceParameters);
        this._iceParameters = iceParameters;
        this._sdpObject.icelite = iceParameters.iceLite ? 'ice-lite' : undefined;
        try {
            for (var _b = __values(this._mediaSections), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mediaSection = _c.value;
                mediaSection.setIceParameters(iceParameters);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    RemoteSdp.prototype.updateDtlsRole = function (role) {
        var e_2, _a;
        logger.debug('updateDtlsRole() [role:%s]', role);
        this._dtlsParameters.role = role;
        try {
            for (var _b = __values(this._mediaSections), _c = _b.next(); !_c.done; _c = _b.next()) {
                var mediaSection = _c.value;
                mediaSection.setDtlsRole(role);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    };
    RemoteSdp.prototype.getNextMediaSectionIdx = function () {
        // If a closed media section is found, return its index.
        for (var idx = 0; idx < this._mediaSections.length; ++idx) {
            var mediaSection = this._mediaSections[idx];
            if (mediaSection.closed)
                return { idx: idx, reuseMid: mediaSection.mid };
        }
        // If no closed media section is found, return next one.
        return { idx: this._mediaSections.length };
    };
    RemoteSdp.prototype.send = function (_a) {
        var offerMediaObject = _a.offerMediaObject, reuseMid = _a.reuseMid, offerRtpParameters = _a.offerRtpParameters, answerRtpParameters = _a.answerRtpParameters, codecOptions = _a.codecOptions, _b = _a.extmapAllowMixed, extmapAllowMixed = _b === void 0 ? false : _b;
        var mediaSection = new MediaSection_1.AnswerMediaSection({
            iceParameters: this._iceParameters,
            iceCandidates: this._iceCandidates,
            dtlsParameters: this._dtlsParameters,
            plainRtpParameters: this._plainRtpParameters,
            planB: this._planB,
            offerMediaObject: offerMediaObject,
            offerRtpParameters: offerRtpParameters,
            answerRtpParameters: answerRtpParameters,
            codecOptions: codecOptions,
            extmapAllowMixed: extmapAllowMixed
        });
        // Unified-Plan with closed media section replacement.
        if (reuseMid) {
            this._replaceMediaSection(mediaSection, reuseMid);
        }
        // Unified-Plan or Plan-B with different media kind.
        else if (!this._midToIndex.has(mediaSection.mid)) {
            this._addMediaSection(mediaSection);
        }
        // Plan-B with same media kind.
        else {
            this._replaceMediaSection(mediaSection);
        }
    };
    RemoteSdp.prototype.receive = function (_a) {
        var mid = _a.mid, kind = _a.kind, offerRtpParameters = _a.offerRtpParameters, streamId = _a.streamId, trackId = _a.trackId;
        var idx = this._midToIndex.get(mid);
        var mediaSection;
        if (idx !== undefined)
            mediaSection = this._mediaSections[idx];
        // Unified-Plan or different media kind.
        if (!mediaSection) {
            mediaSection = new MediaSection_1.OfferMediaSection({
                iceParameters: this._iceParameters,
                iceCandidates: this._iceCandidates,
                dtlsParameters: this._dtlsParameters,
                plainRtpParameters: this._plainRtpParameters,
                planB: this._planB,
                mid: mid,
                kind: kind,
                offerRtpParameters: offerRtpParameters,
                streamId: streamId,
                trackId: trackId
            });
            // Let's try to recycle a closed media section (if any).
            // NOTE: Yes, we can recycle a closed m=audio section with a new m=video.
            var oldMediaSection = this._mediaSections.find(function (m) { return (m.closed); });
            if (oldMediaSection) {
                this._replaceMediaSection(mediaSection, oldMediaSection.mid);
            }
            else {
                this._addMediaSection(mediaSection);
            }
        }
        // Plan-B.
        else {
            mediaSection.planBReceive({ offerRtpParameters: offerRtpParameters, streamId: streamId, trackId: trackId });
            this._replaceMediaSection(mediaSection);
        }
    };
    RemoteSdp.prototype.disableMediaSection = function (mid) {
        var idx = this._midToIndex.get(mid);
        if (idx === undefined) {
            throw new Error("no media section found with mid '" + mid + "'");
        }
        var mediaSection = this._mediaSections[idx];
        mediaSection.disable();
    };
    RemoteSdp.prototype.closeMediaSection = function (mid) {
        var idx = this._midToIndex.get(mid);
        if (idx === undefined) {
            throw new Error("no media section found with mid '" + mid + "'");
        }
        var mediaSection = this._mediaSections[idx];
        // NOTE: Closing the first m section is a pain since it invalidates the
        // bundled transport, so let's avoid it.
        if (mid === this._firstMid) {
            logger.debug('closeMediaSection() | cannot close first media section, disabling it instead [mid:%s]', mid);
            this.disableMediaSection(mid);
            return;
        }
        mediaSection.close();
        // Regenerate BUNDLE mids.
        this._regenerateBundleMids();
    };
    RemoteSdp.prototype.planBStopReceiving = function (_a) {
        var mid = _a.mid, offerRtpParameters = _a.offerRtpParameters;
        var idx = this._midToIndex.get(mid);
        if (idx === undefined) {
            throw new Error("no media section found with mid '" + mid + "'");
        }
        var mediaSection = this._mediaSections[idx];
        mediaSection.planBStopReceiving({ offerRtpParameters: offerRtpParameters });
        this._replaceMediaSection(mediaSection);
    };
    RemoteSdp.prototype.sendSctpAssociation = function (_a) {
        var offerMediaObject = _a.offerMediaObject;
        var mediaSection = new MediaSection_1.AnswerMediaSection({
            iceParameters: this._iceParameters,
            iceCandidates: this._iceCandidates,
            dtlsParameters: this._dtlsParameters,
            sctpParameters: this._sctpParameters,
            plainRtpParameters: this._plainRtpParameters,
            offerMediaObject: offerMediaObject
        });
        this._addMediaSection(mediaSection);
    };
    RemoteSdp.prototype.receiveSctpAssociation = function (_a) {
        var _b = (_a === void 0 ? {} : _a).oldDataChannelSpec, oldDataChannelSpec = _b === void 0 ? false : _b;
        var mediaSection = new MediaSection_1.OfferMediaSection({
            iceParameters: this._iceParameters,
            iceCandidates: this._iceCandidates,
            dtlsParameters: this._dtlsParameters,
            sctpParameters: this._sctpParameters,
            plainRtpParameters: this._plainRtpParameters,
            mid: 'datachannel',
            kind: 'application',
            oldDataChannelSpec: oldDataChannelSpec
        });
        this._addMediaSection(mediaSection);
    };
    RemoteSdp.prototype.getSdp = function () {
        // Increase SDP version.
        this._sdpObject.origin.sessionVersion++;
        return sdpTransform.write(this._sdpObject);
    };
    RemoteSdp.prototype._addMediaSection = function (newMediaSection) {
        if (!this._firstMid)
            this._firstMid = newMediaSection.mid;
        // Add to the vector.
        this._mediaSections.push(newMediaSection);
        // Add to the map.
        this._midToIndex.set(newMediaSection.mid, this._mediaSections.length - 1);
        // Add to the SDP object.
        this._sdpObject.media.push(newMediaSection.getObject());
        // Regenerate BUNDLE mids.
        this._regenerateBundleMids();
    };
    RemoteSdp.prototype._replaceMediaSection = function (newMediaSection, reuseMid) {
        // Store it in the map.
        if (typeof reuseMid === 'string') {
            var idx = this._midToIndex.get(reuseMid);
            if (idx === undefined) {
                throw new Error("no media section found for reuseMid '" + reuseMid + "'");
            }
            var oldMediaSection = this._mediaSections[idx];
            // Replace the index in the vector with the new media section.
            this._mediaSections[idx] = newMediaSection;
            // Update the map.
            this._midToIndex.delete(oldMediaSection.mid);
            this._midToIndex.set(newMediaSection.mid, idx);
            // Update the SDP object.
            this._sdpObject.media[idx] = newMediaSection.getObject();
            // Regenerate BUNDLE mids.
            this._regenerateBundleMids();
        }
        else {
            var idx = this._midToIndex.get(newMediaSection.mid);
            if (idx === undefined) {
                throw new Error("no media section found with mid '" + newMediaSection.mid + "'");
            }
            // Replace the index in the vector with the new media section.
            this._mediaSections[idx] = newMediaSection;
            // Update the SDP object.
            this._sdpObject.media[idx] = newMediaSection.getObject();
        }
    };
    RemoteSdp.prototype._regenerateBundleMids = function () {
        if (!this._dtlsParameters)
            return;
        this._sdpObject.groups[0].mids = this._mediaSections
            .filter(function (mediaSection) { return !mediaSection.closed; })
            .map(function (mediaSection) { return mediaSection.mid; })
            .join(' ');
    };
    return RemoteSdp;
}());
exports.RemoteSdp = RemoteSdp;
//# sourceMappingURL=RemoteSdp.js.map