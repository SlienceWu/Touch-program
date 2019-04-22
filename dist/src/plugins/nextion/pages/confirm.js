"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");


var _ = null;

var Confirm = function (_abstract) {
    _inherits(Confirm, _abstract);

    function Confirm(screenManager) {
        _classCallCheck(this, Confirm);

        return _possibleConstructorReturn(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call(this, screenManager));
    }

    _createClass(Confirm, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
                var _this2 = this;

                var disk, diskFree;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.setScreen("confirm");

                            case 2:
                                _context.next = 4;
                                return this.setText("t0", options.text);

                            case 4:
                                disk = 3000;
                                _context.prev = 5;
                                _context.next = 8;
                                return this.nanoDLP.getIndex();

                            case 8:
                                diskFree = _context.sent;

                                if (diskFree.stat.DiskFree) {
                                    disk = diskFree.stat.DiskFree;
                                    console.log("diskfree: " + disk);
                                }
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context["catch"](5);

                                console.log("diskfree: " + _context.t0);

                            case 15:

                                this.addListener("click_b1", function () {
                                    if (options.confirmType === "deleteplate") {
                                        _this2.deleteJson(options.plateID);
                                    }
                                    if (disk < 500 && options.confirmType === "addplate") {
                                        _ = _this2.changePage("rom", {
                                            "diskFree": disk,
                                            confirmType: options.confirmType,
                                            confirmResult: false,
                                            data0: options.data0,
                                            data1: options.data1,
                                            data2: options.data2,
                                            data3: options.data3
                                        });
                                    } else {
                                        if (options.confirmType === "addplate") {
                                            _ = _this2.changePage("bar", {
                                                confirmType: options.confirmType,
                                                confirmResult: true,
                                                data0: options.data0,
                                                data1: options.data1,
                                                data2: options.data2,
                                                data3: options.data3
                                            });
                                        } else {
                                            _ = _this2.changePage(options.returnPage, {
                                                confirmType: options.confirmType,
                                                confirmResult: true,
                                                data0: options.data0,
                                                data1: options.data1,
                                                data2: options.data2,
                                                data3: options.data3
                                            });
                                        }
                                    }
                                });

                                this.addListener("click_b2", function () {
                                    if (options.data1 === "stopSlice") {
                                        _ = _this2.changePage("slice", options.data2);
                                        return;
                                    }
                                    _ = _this2.changePage(options.returnPage, {
                                        confirmType: options.confirmType,
                                        confirmResult: false,
                                        data0: options.data0,
                                        data1: options.data1,
                                        data2: options.data2,
                                        data3: options.data3
                                    });
                                });

                            case 17:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[5, 12]]);
            }));

            function init(_x) {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: "deleteJson",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(plateID) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _fs2.default.readFile("/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json", function () {
                                    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(err, data) {
                                        var plate, i, str;
                                        return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                            while (1) {
                                                switch (_context3.prev = _context3.next) {
                                                    case 0:
                                                        if (!err) {
                                                            _context3.next = 2;
                                                            break;
                                                        }

                                                        return _context3.abrupt("return", console.error(error));

                                                    case 2:
                                                        plate = data.toString();

                                                        plate = JSON.parse(plate);
                                                        for (i = 0; i < plate.data.length; i++) {
                                                            if (plateID == plate.data[i].PlateID) {
                                                                plate.data.splice(i, 1);
                                                            }
                                                        }
                                                        plate.total = plate.data.length;
                                                        str = JSON.stringify(plate);

                                                        _fs2.default.writeFile("/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json", str, function () {
                                                            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(err) {
                                                                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                                                    while (1) {
                                                                        switch (_context2.prev = _context2.next) {
                                                                            case 0:
                                                                                if (err) {
                                                                                    console.error(err);
                                                                                }
                                                                                console.log('----------删除成功-------------');

                                                                            case 2:
                                                                            case "end":
                                                                                return _context2.stop();
                                                                        }
                                                                    }
                                                                }, _callee2, this);
                                                            }));

                                                            return function (_x5) {
                                                                return _ref4.apply(this, arguments);
                                                            };
                                                        }());

                                                    case 8:
                                                    case "end":
                                                        return _context3.stop();
                                                }
                                            }
                                        }, _callee3, this);
                                    }));

                                    return function (_x3, _x4) {
                                        return _ref3.apply(this, arguments);
                                    };
                                }());

                            case 1:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function deleteJson(_x2) {
                return _ref2.apply(this, arguments);
            }

            return deleteJson;
        }()
    }]);

    return Confirm;
}(_abstract3.default);

exports.default = Confirm;
//# sourceMappingURL=confirm.js.map