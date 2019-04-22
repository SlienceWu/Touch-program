"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");


var _ = null;

var Slice = function (_abstract) {
    _inherits(Slice, _abstract);

    function Slice(screenManager) {
        _classCallCheck(this, Slice);

        return _possibleConstructorReturn(this, (Slice.__proto__ || Object.getPrototypeOf(Slice)).call(this, screenManager));
    }

    _createClass(Slice, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
                var _this3 = this;

                var _this;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.setScreen("slice");

                            case 2:
                                _this = this;

                                this.sliceCheck = setInterval(function () {
                                    _this.reqSlice(options);
                                }, 1000);

                                this.addListener("click_b1", function () {
                                    clearInterval(_this3.sliceCheck);
                                    _ = _this3.changePage("confirm", {
                                        text: "slice",
                                        confirmType: "deleteplate",
                                        data0: options.PlateID,
                                        data1: "stopSlice",
                                        data2: options,
                                        returnPage: "plates"
                                    });
                                });

                            case 5:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function init(_x) {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: "reqSlice",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var data;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.nanoDLP.getSlice();

                            case 2:
                                data = _context2.sent;

                                //data.percentage === "100" &&
                                if (data.running === "0") {
                                    clearInterval(this.sliceCheck);
                                    options.LayersCount = data.layerCount;
                                    this.changePage("plate", options);
                                } else if (data.percentage === "100" && data.running === "1") {
                                    this.setText("t1", 0 + "%");
                                    this.setText("t2", 0 + "/" + options.LayersCount);
                                } else {
                                    this.setText("t1", data.percentage + "%");
                                    this.setText("t2", data.layerID + "/" + data.layerCount);
                                }

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function reqSlice(_x2) {
                return _ref2.apply(this, arguments);
            }

            return reqSlice;
        }()
    }, {
        key: "update",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(status) {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _ = this.setText("t3", "cpu:" + status.proc + " mem:" + status.mem + " temp:" + Math.ceil(parseInt(status.temp)) + "C"); //

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function update(_x3) {
                return _ref3.apply(this, arguments);
            }

            return update;
        }()
    }]);

    return Slice;
}(_abstract3.default);

exports.default = Slice;
//# sourceMappingURL=slice.js.map