"use strict";
/* global RTCRtpTransceiver */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = exports.detectDevice = void 0;
var bowser_1 = __importDefault(require("bowser"));
var Logger_1 = require("./Logger");
var EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
var errors_1 = require("./errors");
var utils = __importStar(require("./utils"));
var ortc = __importStar(require("./ortc"));
var Transport_1 = require("./Transport");
var Chrome74_1 = require("./handlers/Chrome74");
var Chrome70_1 = require("./handlers/Chrome70");
var Chrome67_1 = require("./handlers/Chrome67");
var Chrome55_1 = require("./handlers/Chrome55");
var Firefox60_1 = require("./handlers/Firefox60");
var Safari12_1 = require("./handlers/Safari12");
var Safari11_1 = require("./handlers/Safari11");
var Edge11_1 = require("./handlers/Edge11");
var ReactNative_1 = require("./handlers/ReactNative");
var logger = new Logger_1.Logger('Device');
function detectDevice() {
    // React-Native.
    // NOTE: react-native-webrtc >= 1.75.0 is required.
    if (typeof navigator === 'object' && navigator.product === 'ReactNative') {
        if (typeof RTCPeerConnection === 'undefined') {
            logger.warn('this._detectDevice() | unsupported ReactNative without RTCPeerConnection');
            return undefined;
        }
        logger.debug('this._detectDevice() | ReactNative handler chosen');
        return 'ReactNative';
    }
    // Browser.
    else if (typeof navigator === 'object' && typeof navigator.userAgent === 'string') {
        var ua = navigator.userAgent;
        var browser = bowser_1.default.getParser(ua);
        var engine = browser.getEngine();
        // Chrome and Chromium.
        if (browser.satisfies({ chrome: '>=74', chromium: '>=74' })) {
            return 'Chrome74';
        }
        else if (browser.satisfies({ chrome: '>=70', chromium: '>=70' })) {
            return 'Chrome70';
        }
        else if (browser.satisfies({ chrome: '>=67', chromium: '>=67' })) {
            return 'Chrome67';
        }
        else if (browser.satisfies({ chrome: '>=55', chromium: '>=55' })) {
            return 'Chrome55';
        }
        // Firefox.
        else if (browser.satisfies({ firefox: '>=60' })) {
            return 'Firefox60';
        }
        // Safari with Unified-Plan support enabled.
        else if (browser.satisfies({ safari: '>=12.0' }) &&
            typeof RTCRtpTransceiver !== 'undefined' &&
            RTCRtpTransceiver.prototype.hasOwnProperty('currentDirection')) {
            return 'Safari12';
        }
        // Safari with Plab-B support.
        else if (browser.satisfies({ safari: '>=11' })) {
            return 'Safari11';
        }
        // Old Edge with ORTC support.
        else if (browser.satisfies({ 'microsoft edge': '>=11' }) &&
            browser.satisfies({ 'microsoft edge': '<=18' })) {
            return 'Edge11';
        }
        // Best effort for Chromium based browsers.
        else if (engine.name && engine.name.toLowerCase() === 'blink') {
            var match = ua.match(/(?:(?:Chrome|Chromium))[ /](\w+)/i);
            if (match) {
                var version = Number(match[1]);
                if (version >= 74) {
                    return 'Chrome74';
                }
                else if (version >= 70) {
                    return 'Chrome70';
                }
                else if (version >= 67) {
                    return 'Chrome67';
                }
                else {
                    return 'Chrome55';
                }
            }
            else {
                return 'Chrome74';
            }
        }
        // Unsupported browser.
        else {
            logger.warn('this._detectDevice() | browser not supported [name:%s, version:%s]', browser.getBrowserName(), browser.getBrowserVersion());
            return undefined;
        }
    }
    // Unknown device.
    else {
        logger.warn('this._detectDevice() | unknown device');
        return undefined;
    }
}
exports.detectDevice = detectDevice;
var Device = /** @class */ (function () {
    /**
     * Create a new Device to connect to mediasoup server.
     *
     * @throws {UnsupportedError} if device is not supported.
     */
    function Device(_a) {
        var _b = _a === void 0 ? {} : _a, handlerName = _b.handlerName, handlerFactory = _b.handlerFactory, Handler = _b.Handler;
        // Loaded flag.
        this._loaded = false;
        // Observer instance.
        this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
        logger.debug('constructor()');
        // Handle deprecated option.
        if (Handler) {
            logger.warn('constructor() | Handler option is DEPRECATED, use handlerName or handlerFactory instead');
            if (typeof Handler === 'string')
                handlerName = Handler;
            else
                throw new TypeError('non string Handler option no longer supported, use handlerFactory instead');
        }
        if (handlerName && handlerFactory) {
            throw new TypeError('just one of handlerName or handlerInterface can be given');
        }
        if (handlerFactory) {
            this._handlerFactory = handlerFactory;
        }
        else {
            if (handlerName) {
                logger.debug('constructor() | handler given: %s', handlerName);
            }
            else {
                handlerName = detectDevice();
                if (handlerName)
                    logger.debug('constructor() | detected handler: %s', handlerName);
                else
                    throw new errors_1.UnsupportedError('device not supported');
            }
            switch (handlerName) {
                case 'Chrome74':
                    this._handlerFactory = Chrome74_1.Chrome74.createFactory();
                    break;
                case 'Chrome70':
                    this._handlerFactory = Chrome70_1.Chrome70.createFactory();
                    break;
                case 'Chrome67':
                    this._handlerFactory = Chrome67_1.Chrome67.createFactory();
                    break;
                case 'Chrome55':
                    this._handlerFactory = Chrome55_1.Chrome55.createFactory();
                    break;
                case 'Firefox60':
                    this._handlerFactory = Firefox60_1.Firefox60.createFactory();
                    break;
                case 'Safari12':
                    this._handlerFactory = Safari12_1.Safari12.createFactory();
                    break;
                case 'Safari11':
                    this._handlerFactory = Safari11_1.Safari11.createFactory();
                    break;
                case 'Edge11':
                    this._handlerFactory = Edge11_1.Edge11.createFactory();
                    break;
                case 'ReactNative':
                    this._handlerFactory = ReactNative_1.ReactNative.createFactory();
                    break;
                default:
                    throw new TypeError("unknown handlerName \"" + handlerName + "\"");
            }
        }
        // Create a temporal handler to get its name.
        var handler = this._handlerFactory();
        this._handlerName = handler.name;
        handler.close();
        this._extendedRtpCapabilities = undefined;
        this._recvRtpCapabilities = undefined;
        this._canProduceByKind =
            {
                audio: false,
                video: false
            };
        this._sctpCapabilities = undefined;
    }
    Object.defineProperty(Device.prototype, "handlerName", {
        /**
         * The RTC handler name.
         */
        get: function () {
            return this._handlerName;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "loaded", {
        /**
         * Whether the Device is loaded.
         */
        get: function () {
            return this._loaded;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "rtpCapabilities", {
        /**
         * RTP capabilities of the Device for receiving media.
         *
         * @throws {InvalidStateError} if not loaded.
         */
        get: function () {
            if (!this._loaded)
                throw new errors_1.InvalidStateError('not loaded');
            return this._recvRtpCapabilities;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "sctpCapabilities", {
        /**
         * SCTP capabilities of the Device.
         *
         * @throws {InvalidStateError} if not loaded.
         */
        get: function () {
            if (!this._loaded)
                throw new errors_1.InvalidStateError('not loaded');
            return this._sctpCapabilities;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Device.prototype, "observer", {
        /**
         * Observer.
         *
         * @emits newtransport - (transport: Transport)
         */
        get: function () {
            return this._observer;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Initialize the Device.
     */
    Device.prototype.load = function (_a) {
        var routerRtpCapabilities = _a.routerRtpCapabilities;
        return __awaiter(this, void 0, void 0, function () {
            var handler, nativeRtpCapabilities, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        logger.debug('load() [routerRtpCapabilities:%o]', routerRtpCapabilities);
                        routerRtpCapabilities = utils.clone(routerRtpCapabilities, undefined);
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 4, , 5]);
                        if (this._loaded)
                            throw new errors_1.InvalidStateError('already loaded');
                        // This may throw.
                        ortc.validateRtpCapabilities(routerRtpCapabilities);
                        handler = this._handlerFactory();
                        return [4 /*yield*/, handler.getNativeRtpCapabilities()];
                    case 2:
                        nativeRtpCapabilities = _c.sent();
                        logger.debug('load() | got native RTP capabilities:%o', nativeRtpCapabilities);
                        // This may throw.
                        ortc.validateRtpCapabilities(nativeRtpCapabilities);
                        // Get extended RTP capabilities.
                        this._extendedRtpCapabilities = ortc.getExtendedRtpCapabilities(nativeRtpCapabilities, routerRtpCapabilities);
                        logger.debug('load() | got extended RTP capabilities:%o', this._extendedRtpCapabilities);
                        // Check whether we can produce audio/video.
                        this._canProduceByKind.audio =
                            ortc.canSend('audio', this._extendedRtpCapabilities);
                        this._canProduceByKind.video =
                            ortc.canSend('video', this._extendedRtpCapabilities);
                        // Generate our receiving RTP capabilities for receiving media.
                        this._recvRtpCapabilities =
                            ortc.getRecvRtpCapabilities(this._extendedRtpCapabilities);
                        // This may throw.
                        ortc.validateRtpCapabilities(this._recvRtpCapabilities);
                        logger.debug('load() | got receiving RTP capabilities:%o', this._recvRtpCapabilities);
                        // Generate our SCTP capabilities.
                        _b = this;
                        return [4 /*yield*/, handler.getNativeSctpCapabilities()];
                    case 3:
                        // Generate our SCTP capabilities.
                        _b._sctpCapabilities = _c.sent();
                        logger.debug('load() | got native SCTP capabilities:%o', this._sctpCapabilities);
                        // This may throw.
                        ortc.validateSctpCapabilities(this._sctpCapabilities);
                        logger.debug('load() succeeded');
                        this._loaded = true;
                        handler.close();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _c.sent();
                        if (handler)
                            handler.close();
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Whether we can produce audio/video.
     *
     * @throws {InvalidStateError} if not loaded.
     * @throws {TypeError} if wrong arguments.
     */
    Device.prototype.canProduce = function (kind) {
        if (!this._loaded)
            throw new errors_1.InvalidStateError('not loaded');
        else if (kind !== 'audio' && kind !== 'video')
            throw new TypeError("invalid kind \"" + kind + "\"");
        return this._canProduceByKind[kind];
    };
    /**
     * Creates a Transport for sending media.
     *
     * @throws {InvalidStateError} if not loaded.
     * @throws {TypeError} if wrong arguments.
     */
    Device.prototype.createSendTransport = function (_a) {
        var id = _a.id, iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy, additionalSettings = _a.additionalSettings, proprietaryConstraints = _a.proprietaryConstraints, _b = _a.appData, appData = _b === void 0 ? {} : _b;
        logger.debug('createSendTransport()');
        return this._createTransport({
            direction: 'send',
            id: id,
            iceParameters: iceParameters,
            iceCandidates: iceCandidates,
            dtlsParameters: dtlsParameters,
            sctpParameters: sctpParameters,
            iceServers: iceServers,
            iceTransportPolicy: iceTransportPolicy,
            additionalSettings: additionalSettings,
            proprietaryConstraints: proprietaryConstraints,
            appData: appData
        });
    };
    /**
     * Creates a Transport for receiving media.
     *
     * @throws {InvalidStateError} if not loaded.
     * @throws {TypeError} if wrong arguments.
     */
    Device.prototype.createRecvTransport = function (_a) {
        var id = _a.id, iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy, additionalSettings = _a.additionalSettings, proprietaryConstraints = _a.proprietaryConstraints, _b = _a.appData, appData = _b === void 0 ? {} : _b;
        logger.debug('createRecvTransport()');
        return this._createTransport({
            direction: 'recv',
            id: id,
            iceParameters: iceParameters,
            iceCandidates: iceCandidates,
            dtlsParameters: dtlsParameters,
            sctpParameters: sctpParameters,
            iceServers: iceServers,
            iceTransportPolicy: iceTransportPolicy,
            additionalSettings: additionalSettings,
            proprietaryConstraints: proprietaryConstraints,
            appData: appData
        });
    };
    Device.prototype._createTransport = function (_a) {
        var direction = _a.direction, id = _a.id, iceParameters = _a.iceParameters, iceCandidates = _a.iceCandidates, dtlsParameters = _a.dtlsParameters, sctpParameters = _a.sctpParameters, iceServers = _a.iceServers, iceTransportPolicy = _a.iceTransportPolicy, additionalSettings = _a.additionalSettings, proprietaryConstraints = _a.proprietaryConstraints, _b = _a.appData, appData = _b === void 0 ? {} : _b;
        if (!this._loaded)
            throw new errors_1.InvalidStateError('not loaded');
        else if (typeof id !== 'string')
            throw new TypeError('missing id');
        else if (typeof iceParameters !== 'object')
            throw new TypeError('missing iceParameters');
        else if (!Array.isArray(iceCandidates))
            throw new TypeError('missing iceCandidates');
        else if (typeof dtlsParameters !== 'object')
            throw new TypeError('missing dtlsParameters');
        else if (sctpParameters && typeof sctpParameters !== 'object')
            throw new TypeError('wrong sctpParameters');
        else if (appData && typeof appData !== 'object')
            throw new TypeError('if given, appData must be an object');
        // Create a new Transport.
        var transport = new Transport_1.Transport({
            direction: direction,
            id: id,
            iceParameters: iceParameters,
            iceCandidates: iceCandidates,
            dtlsParameters: dtlsParameters,
            sctpParameters: sctpParameters,
            iceServers: iceServers,
            iceTransportPolicy: iceTransportPolicy,
            additionalSettings: additionalSettings,
            proprietaryConstraints: proprietaryConstraints,
            appData: appData,
            handlerFactory: this._handlerFactory,
            extendedRtpCapabilities: this._extendedRtpCapabilities,
            canProduceByKind: this._canProduceByKind
        });
        // Emit observer event.
        this._observer.safeEmit('newtransport', transport);
        return transport;
    };
    return Device;
}());
exports.Device = Device;
//# sourceMappingURL=Device.js.map