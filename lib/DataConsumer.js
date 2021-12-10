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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataConsumer = void 0;
var Logger_1 = require("./Logger");
var EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
var logger = new Logger_1.Logger('DataConsumer');
var DataConsumer = /** @class */ (function (_super) {
    __extends(DataConsumer, _super);
    /**
     * @emits transportclose
     * @emits open
     * @emits error - (error: Error)
     * @emits close
     * @emits message - (message: any)
     * @emits @close
     */
    function DataConsumer(_a) {
        var id = _a.id, dataProducerId = _a.dataProducerId, dataChannel = _a.dataChannel, sctpStreamParameters = _a.sctpStreamParameters, appData = _a.appData;
        var _this = _super.call(this) || this;
        // Closed flag.
        _this._closed = false;
        // Observer instance.
        _this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
        logger.debug('constructor()');
        _this._id = id;
        _this._dataProducerId = dataProducerId;
        _this._dataChannel = dataChannel;
        _this._sctpStreamParameters = sctpStreamParameters;
        _this._appData = appData;
        _this._handleDataChannel();
        return _this;
    }
    Object.defineProperty(DataConsumer.prototype, "id", {
        /**
         * DataConsumer id.
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "dataProducerId", {
        /**
         * Associated DataProducer id.
         */
        get: function () {
            return this._dataProducerId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "closed", {
        /**
         * Whether the DataConsumer is closed.
         */
        get: function () {
            return this._closed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "sctpStreamParameters", {
        /**
         * SCTP stream parameters.
         */
        get: function () {
            return this._sctpStreamParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "readyState", {
        /**
         * DataChannel readyState.
         */
        get: function () {
            return this._dataChannel.readyState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "label", {
        /**
         * DataChannel label.
         */
        get: function () {
            return this._dataChannel.label;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "protocol", {
        /**
         * DataChannel protocol.
         */
        get: function () {
            return this._dataChannel.protocol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "binaryType", {
        /**
         * DataChannel binaryType.
         */
        get: function () {
            return this._dataChannel.binaryType;
        },
        /**
         * Set DataChannel binaryType.
         */
        set: function (binaryType) {
            this._dataChannel.binaryType = binaryType;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "appData", {
        /**
         * App custom data.
         */
        get: function () {
            return this._appData;
        },
        /**
         * Invalid setter.
         */
        set: function (appData) {
            throw new Error('cannot override appData object');
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataConsumer.prototype, "observer", {
        /**
         * Observer.
         *
         * @emits close
         */
        get: function () {
            return this._observer;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Closes the DataConsumer.
     */
    DataConsumer.prototype.close = function () {
        if (this._closed)
            return;
        logger.debug('close()');
        this._closed = true;
        this._dataChannel.close();
        this.emit('@close');
        // Emit observer event.
        this._observer.safeEmit('close');
    };
    /**
     * Transport was closed.
     */
    DataConsumer.prototype.transportClosed = function () {
        if (this._closed)
            return;
        logger.debug('transportClosed()');
        this._closed = true;
        this._dataChannel.close();
        this.safeEmit('transportclose');
        // Emit observer event.
        this._observer.safeEmit('close');
    };
    DataConsumer.prototype._handleDataChannel = function () {
        var _this = this;
        this._dataChannel.addEventListener('open', function () {
            if (_this._closed)
                return;
            logger.debug('DataChannel "open" event');
            _this.safeEmit('open');
        });
        this._dataChannel.addEventListener('error', function (event) {
            if (_this._closed)
                return;
            var error = event.error;
            if (!error)
                error = new Error('unknown DataChannel error');
            if (error.errorDetail === 'sctp-failure') {
                logger.error('DataChannel SCTP error [sctpCauseCode:%s]: %s', error.sctpCauseCode, error.message);
            }
            else {
                logger.error('DataChannel "error" event: %o', error);
            }
            _this.safeEmit('error', error);
        });
        this._dataChannel.addEventListener('close', function () {
            if (_this._closed)
                return;
            logger.warn('DataChannel "close" event');
            _this._closed = true;
            _this.emit('@close');
            _this.safeEmit('close');
        });
        this._dataChannel.addEventListener('message', function (event) {
            if (_this._closed)
                return;
            _this.safeEmit('message', event.data);
        });
    };
    return DataConsumer;
}(EnhancedEventEmitter_1.EnhancedEventEmitter));
exports.DataConsumer = DataConsumer;
//# sourceMappingURL=DataConsumer.js.map