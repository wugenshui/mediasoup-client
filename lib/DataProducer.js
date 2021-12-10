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
exports.DataProducer = void 0;
var Logger_1 = require("./Logger");
var EnhancedEventEmitter_1 = require("./EnhancedEventEmitter");
var errors_1 = require("./errors");
var logger = new Logger_1.Logger('DataProducer');
var DataProducer = /** @class */ (function (_super) {
    __extends(DataProducer, _super);
    /**
     * @emits transportclose
     * @emits open
     * @emits error - (error: Error)
     * @emits close
     * @emits bufferedamountlow
     * @emits @close
     */
    function DataProducer(_a) {
        var id = _a.id, dataChannel = _a.dataChannel, sctpStreamParameters = _a.sctpStreamParameters, appData = _a.appData;
        var _this = _super.call(this) || this;
        // Closed flag.
        _this._closed = false;
        // Observer instance.
        _this._observer = new EnhancedEventEmitter_1.EnhancedEventEmitter();
        logger.debug('constructor()');
        _this._id = id;
        _this._dataChannel = dataChannel;
        _this._sctpStreamParameters = sctpStreamParameters;
        _this._appData = appData;
        _this._handleDataChannel();
        return _this;
    }
    Object.defineProperty(DataProducer.prototype, "id", {
        /**
         * DataProducer id.
         */
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "closed", {
        /**
         * Whether the DataProducer is closed.
         */
        get: function () {
            return this._closed;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "sctpStreamParameters", {
        /**
         * SCTP stream parameters.
         */
        get: function () {
            return this._sctpStreamParameters;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "readyState", {
        /**
         * DataChannel readyState.
         */
        get: function () {
            return this._dataChannel.readyState;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "label", {
        /**
         * DataChannel label.
         */
        get: function () {
            return this._dataChannel.label;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "protocol", {
        /**
         * DataChannel protocol.
         */
        get: function () {
            return this._dataChannel.protocol;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "bufferedAmount", {
        /**
         * DataChannel bufferedAmount.
         */
        get: function () {
            return this._dataChannel.bufferedAmount;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "bufferedAmountLowThreshold", {
        /**
         * DataChannel bufferedAmountLowThreshold.
         */
        get: function () {
            return this._dataChannel.bufferedAmountLowThreshold;
        },
        /**
         * Set DataChannel bufferedAmountLowThreshold.
         */
        set: function (bufferedAmountLowThreshold) {
            this._dataChannel.bufferedAmountLowThreshold = bufferedAmountLowThreshold;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DataProducer.prototype, "appData", {
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
    Object.defineProperty(DataProducer.prototype, "observer", {
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
     * Closes the DataProducer.
     */
    DataProducer.prototype.close = function () {
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
    DataProducer.prototype.transportClosed = function () {
        if (this._closed)
            return;
        logger.debug('transportClosed()');
        this._closed = true;
        this._dataChannel.close();
        this.safeEmit('transportclose');
        // Emit observer event.
        this._observer.safeEmit('close');
    };
    /**
     * Send a message.
     *
     * @param {String|Blob|ArrayBuffer|ArrayBufferView} data.
     */
    DataProducer.prototype.send = function (data) {
        logger.debug('send()');
        if (this._closed)
            throw new errors_1.InvalidStateError('closed');
        this._dataChannel.send(data);
    };
    DataProducer.prototype._handleDataChannel = function () {
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
        this._dataChannel.addEventListener('message', function () {
            if (_this._closed)
                return;
            logger.warn('DataChannel "message" event in a DataProducer, message discarded');
        });
        this._dataChannel.addEventListener('bufferedamountlow', function () {
            if (_this._closed)
                return;
            _this.safeEmit('bufferedamountlow');
        });
    };
    return DataProducer;
}(EnhancedEventEmitter_1.EnhancedEventEmitter));
exports.DataProducer = DataProducer;
//# sourceMappingURL=DataProducer.js.map