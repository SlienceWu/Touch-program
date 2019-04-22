"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _config = require("../../../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var _ = null;

var PrintingHome = function (_abstract) {
    _inherits(PrintingHome, _abstract);

    function PrintingHome(screenManager) {
        _classCallCheck(this, PrintingHome);

        var _this = _possibleConstructorReturn(this, (PrintingHome.__proto__ || Object.getPrototypeOf(PrintingHome)).call(this, screenManager));

        _this.isPause = null;
        _this.isLifted = false;
        return _this;
    }

    _createClass(PrintingHome, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(options) {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (this.setup) {
                                    _context2.next = 4;
                                    break;
                                }

                                _context2.next = 3;
                                return this.nanoDLP.getSetup();

                            case 3:
                                this.setup = _context2.sent;

                            case 4:
                                if (this.status) {
                                    _context2.next = 8;
                                    break;
                                }

                                _context2.next = 7;
                                return this.nanoDLP.getStatus();

                            case 7:
                                this.status = _context2.sent;

                            case 8:
                                _context2.prev = 8;

                                if (!(options && options.confirmResult && options.confirmResult)) {
                                    _context2.next = 18;
                                    break;
                                }

                                _context2.t0 = options.confirmType;
                                _context2.next = _context2.t0 === "pause" ? 13 : _context2.t0 === "stop" ? 15 : 18;
                                break;

                            case 13:
                                this.nanoDLP.pause();
                                return _context2.abrupt("break", 18);

                            case 15:
                                this.nanoDLP.stop();
                                _ = this.changePage("home");
                                return _context2.abrupt("break", 18);

                            case 18:
                                _context2.next = 22;
                                break;

                            case 20:
                                _context2.prev = 20;
                                _context2.t1 = _context2["catch"](8);

                            case 22:
                                console.log("printing status :" + this.status.Printing);
                                this.addListener("click_b3", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    console.log("-----------------pause");

                                                    if (!_this2.isPause) {
                                                        _context.next = 9;
                                                        break;
                                                    }

                                                    if (!_this2.isLifted) {
                                                        _context.next = 6;
                                                        break;
                                                    }

                                                    _context.next = 5;
                                                    return _this2.nanoDLP.command("/z-axis/move/down/micron/" + _this2.liftedHeight);

                                                case 5:
                                                    _this2.isLifted = false;

                                                case 6:
                                                    _this2.manager.nanoDLP.unpause();
                                                    _context.next = 10;
                                                    break;

                                                case 9:
                                                    _ = _this2.changePage("confirm", {
                                                        text: "pause",
                                                        confirmType: "pause",
                                                        returnPage: "printingHome"
                                                    });

                                                case 10:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this2);
                                })));

                                this.addListener("click_b2", function () {
                                    console.log("-----------------stop");
                                    _ = _this2.changePage("confirm", {
                                        text: "stop",
                                        confirmType: "stop",
                                        returnPage: "printingHome"
                                    });
                                });

                                this.addListener("click_b1", function () {
                                    _ = _this2.changePage("home");
                                });

                                this.addListener("click_b19", function () {
                                    _ = _this2.changePage("plates");
                                });

                            case 27:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[8, 20]]);
            }));

            function init(_x) {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: "update",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(status, log) {
                var currentMm, reg, result, targetProfile, remaining_time, total_time, image;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (status.Printing) {
                                    _context3.next = 2;
                                    break;
                                }

                                return _context3.abrupt("return", this.changePage("home"));

                            case 2:

                                this.imageX = 0x5C; //0x08;
                                this.imageY = 0x12; //0x3C;
                                this.imageWidth = 0x89;

                                if (!(this.isPause == null || this.isPause !== status.Pause)) {
                                    _context3.next = 16;
                                    break;
                                }

                                this.isPause = status.Pause;
                                _context3.next = 9;
                                return this.setScreen("printing");

                            case 9:
                                if (!this.isPause) {
                                    _context3.next = 14;
                                    break;
                                }

                                _context3.next = 12;
                                return this.setValue("b3", 1);

                            case 12:
                                _context3.next = 16;
                                break;

                            case 14:
                                _context3.next = 16;
                                return this.setValue("b3", 0);

                            case 16:
                                if (this.setup) {
                                    _context3.next = 20;
                                    break;
                                }

                                _context3.next = 19;
                                return this.nanoDLP.getSetup();

                            case 19:
                                this.setup = _context3.sent;

                            case 20:
                                currentMm = status.CurrentHeight / (360 / this.setup.MotorDegree * this.setup.MicroStep / this.setup.LeadscrewPitch);

                                if (currentMm < 0) {
                                    currentMm = 0;
                                }

                                if (!(this.isPause && log.msg.indexOf("Position set to") !== -1)) {
                                    _context3.next = 27;
                                    break;
                                }

                                this.liftedHeight = Math.floor((150 - currentMm) * 1000 * 10) / 10;
                                _context3.next = 26;
                                return this.nanoDLP.command("/z-axis/move/up/micron/" + this.liftedHeight);

                            case 26:
                                this.isLifted = true;

                            case 27:
                                reg = /Curing for (\d+\.\d+) seconds/;
                                result = log.msg.match(reg);

                                if (result !== null) {
                                    log.msg = "Curing for " + Math.floor(parseFloat(result[1])) + " seconds";
                                }

                                _context3.next = 32;
                                return this.setText("t6", this.isPause ? "Pause" : "Printing");

                            case 32:

                                this.config = _config2.default.plugins.profiles;

                                if (this.profiles) {
                                    _context3.next = 37;
                                    break;
                                }

                                _context3.next = 36;
                                return this.nanoDLP.getProfiles();

                            case 36:
                                this.profiles = _context3.sent;

                            case 37:
                                targetProfile = this.profiles[this.config.selectedIdx];
                                remaining_time = Math.round((status.LayersCount - status.LayerID) * (targetProfile.CureTime + 5) / 60);
                                total_time = Math.round(status.LayersCount * (targetProfile.CureTime + 5) / 60);
                                _context3.next = 42;
                                return this.setText("t0", status.LayerID + "/" + status.LayersCount);

                            case 42:
                                _context3.next = 44;
                                return this.setValue("j0", Math.floor(status.LayerID / status.LayersCount * 100));

                            case 44:
                                _context3.next = 46;
                                return this.setText("t1", remaining_time + "/" + total_time + "m");

                            case 46:
                                _context3.next = 48;
                                return this.setText("t2", log.msg);

                            case 48:
                                _context3.next = 50;
                                return this.setText("t7", status.Path);

                            case 50:
                                if (!(this.history.layer !== status.LayerID)) {
                                    _context3.next = 58;
                                    break;
                                }

                                this.history.layer = status.LayerID;
                                _context3.next = 54;
                                return this.nanoDLP.getCurrentPlateLayer(status.PlateID, status.LayerID);

                            case 54:
                                image = _context3.sent;

                                if (!this.enabled) {
                                    _context3.next = 58;
                                    break;
                                }

                                _context3.next = 58;
                                return this.nextion.displayBlackWhiteImage(image, this.imageX, this.imageY, this.imageWidth).catch(function (e) {
                                    return console.error(e);
                                });

                            case 58:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function update(_x2, _x3) {
                return _ref3.apply(this, arguments);
            }

            return update;
        }()
    }]);

    return PrintingHome;
}(_abstract3.default);

exports.default = PrintingHome;
//# sourceMappingURL=printingHome.js.map