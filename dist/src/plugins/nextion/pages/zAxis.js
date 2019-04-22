"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");


var _ = null;

var ZAxis = function (_abstract) {
    _inherits(ZAxis, _abstract);

    function ZAxis(screenManager) {
        _classCallCheck(this, ZAxis);

        var _this = _possibleConstructorReturn(this, (ZAxis.__proto__ || Object.getPrototypeOf(ZAxis)).call(this, screenManager));

        _this.currentButton = 8;
        return _this;
    }

    _createClass(ZAxis, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.setScreen("zAxis");

                            case 2:
                                this.upTime = 0;

                                this.addListener("click_b17", function () {
                                    _ = _this2.changePage("settings");
                                });
                                this.addListener("click_b16", function () {
                                    _ = _this2.changePage("home");
                                });
                                this.addListener("click_b12", function () {
                                    if (_this2.currentButton === 7) {
                                        _this2.timeout = 100;
                                    } else if (_this2.currentButton === 9) {
                                        _this2.timeout = 1000;
                                    } else {
                                        _this2.timeout = 3000;
                                    }
                                    if (_this2.upTime === 0) {
                                        setTimeout(function () {
                                            _this2.upTime = 0;
                                        }, _this2.timeout);
                                        _this2.upTime = _this2.upTime + 1;
                                        _ = _this2.up();
                                    }
                                });
                                this.addListener("click_b13", function () {
                                    if (_this2.currentButton === 7) {
                                        _this2.timeout = 100;
                                    } else if (_this2.currentButton === 9) {
                                        _this2.timeout = 1000;
                                    } else {
                                        _this2.timeout = 3000;
                                    }
                                    if (_this2.upTime === 0) {
                                        setTimeout(function () {
                                            _this2.upTime = 0;
                                        }, _this2.timeout);
                                        _this2.upTime = _this2.upTime + 1;
                                        _ = _this2.down();
                                    }
                                });
                                this.addListener("click_b10", function () {
                                    return _this2.setBtn(10);
                                });
                                this.addListener("click_b9", function () {
                                    return _this2.setBtn(9);
                                });
                                this.addListener("click_b7", function () {
                                    return _this2.setBtn(7);
                                });
                                this.addListener("click_b4", function () {
                                    return _this2.nanoDLP.command("/z-axis/bottom");
                                });

                                _ = this.setBtn(10);

                            case 12:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));

            function init() {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: "up",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _ = this.moveUp();

                            case 1:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function up() {
                return _ref2.apply(this, arguments);
            }

            return up;
        }()
    }, {
        key: "down",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _ = this.moveDown();

                            case 1:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function down() {
                return _ref3.apply(this, arguments);
            }

            return down;
        }()
    }, {
        key: "moveDown",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                var currentMm;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                if (this.setup) {
                                    _context4.next = 4;
                                    break;
                                }

                                _context4.next = 3;
                                return this.nanoDLP.getSetup();

                            case 3:
                                this.setup = _context4.sent;

                            case 4:
                                currentMm = this.status.CurrentHeight / (360 / this.setup.MotorDegree * this.setup.MicroStep / this.setup.LeadscrewPitch);

                                if (!(currentMm !== 0)) {
                                    _context4.next = 53;
                                    break;
                                }

                                _context4.t0 = this.currentButton;
                                _context4.next = _context4.t0 === 11 ? 9 : _context4.t0 === 10 ? 16 : _context4.t0 === 9 ? 23 : _context4.t0 === 8 ? 30 : _context4.t0 === 7 ? 37 : _context4.t0 === 6 ? 44 : _context4.t0 === 5 ? 47 : _context4.t0 === 2 ? 50 : 53;
                                break;

                            case 9:
                                if (!(currentMm > 100)) {
                                    _context4.next = 14;
                                    break;
                                }

                                _context4.next = 12;
                                return this.nanoDLP.command("/z-axis/move/down/micron/100000");

                            case 12:
                                _context4.next = 15;
                                break;

                            case 14:
                                this.nanoDLP.command("/z-axis/bottom");

                            case 15:
                                return _context4.abrupt("break", 53);

                            case 16:
                                if (!(currentMm > 10)) {
                                    _context4.next = 21;
                                    break;
                                }

                                _context4.next = 19;
                                return this.nanoDLP.command("/z-axis/move/down/micron/10000");

                            case 19:
                                _context4.next = 22;
                                break;

                            case 21:
                                this.nanoDLP.command("/z-axis/bottom");

                            case 22:
                                return _context4.abrupt("break", 53);

                            case 23:
                                if (!(currentMm > 1)) {
                                    _context4.next = 28;
                                    break;
                                }

                                _context4.next = 26;
                                return this.nanoDLP.command("/z-axis/move/down/micron/1000");

                            case 26:
                                _context4.next = 29;
                                break;

                            case 28:
                                this.nanoDLP.command("/z-axis/bottom");

                            case 29:
                                return _context4.abrupt("break", 53);

                            case 30:
                                if (!(currentMm > 0.5)) {
                                    _context4.next = 35;
                                    break;
                                }

                                _context4.next = 33;
                                return this.nanoDLP.command("/z-axis/move/down/micron/500");

                            case 33:
                                _context4.next = 36;
                                break;

                            case 35:
                                this.nanoDLP.command("/z-axis/bottom");

                            case 36:
                                return _context4.abrupt("break", 53);

                            case 37:
                                if (!(currentMm > 0.1)) {
                                    _context4.next = 42;
                                    break;
                                }

                                _context4.next = 40;
                                return this.nanoDLP.command("/z-axis/move/down/micron/100");

                            case 40:
                                _context4.next = 43;
                                break;

                            case 42:
                                this.nanoDLP.command("/z-axis/bottom");

                            case 43:
                                return _context4.abrupt("break", 53);

                            case 44:
                                _context4.next = 46;
                                return this.nanoDLP.command("/z-axis/move/down/pulse/100");

                            case 46:
                                return _context4.abrupt("break", 53);

                            case 47:
                                _context4.next = 49;
                                return this.nanoDLP.command("/z-axis/move/down/pulse/10");

                            case 49:
                                return _context4.abrupt("break", 53);

                            case 50:
                                _context4.next = 52;
                                return this.nanoDLP.command("/z-axis/move/down/pulse/1");

                            case 52:
                                return _context4.abrupt("break", 53);

                            case 53:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function moveDown() {
                return _ref4.apply(this, arguments);
            }

            return moveDown;
        }()
    }, {
        key: "moveUp",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                var currentMm, z;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                if (this.setup) {
                                    _context5.next = 4;
                                    break;
                                }

                                _context5.next = 3;
                                return this.nanoDLP.getSetup();

                            case 3:
                                this.setup = _context5.sent;

                            case 4:
                                currentMm = this.status.CurrentHeight / (360 / this.setup.MotorDegree * this.setup.MicroStep / this.setup.LeadscrewPitch);

                                currentMm = currentMm < 0 ? 0 : Math.floor(currentMm * 10) / 10;
                                z = (150 - currentMm) * 1000;

                                z = z < 0 ? 0 : Math.floor(z * 10) / 10;

                                if (!(currentMm >= 150)) {
                                    _context5.next = 10;
                                    break;
                                }

                                return _context5.abrupt("return");

                            case 10:
                                _context5.t0 = this.currentButton;
                                _context5.next = _context5.t0 === 11 ? 13 : _context5.t0 === 10 ? 16 : _context5.t0 === 9 ? 24 : _context5.t0 === 8 ? 32 : _context5.t0 === 7 ? 35 : _context5.t0 === 6 ? 38 : _context5.t0 === 5 ? 41 : _context5.t0 === 2 ? 44 : 47;
                                break;

                            case 13:
                                _context5.next = 15;
                                return this.nanoDLP.command("/z-axis/move/up/micron/100000");

                            case 15:
                                return _context5.abrupt("break", 47);

                            case 16:
                                if (!(currentMm > 140)) {
                                    _context5.next = 21;
                                    break;
                                }

                                _context5.next = 19;
                                return this.nanoDLP.command("/z-axis/move/up/micron/" + z);

                            case 19:
                                _context5.next = 23;
                                break;

                            case 21:
                                _context5.next = 23;
                                return this.nanoDLP.command("/z-axis/move/up/micron/10000");

                            case 23:
                                return _context5.abrupt("break", 47);

                            case 24:
                                if (!(currentMm > 149)) {
                                    _context5.next = 29;
                                    break;
                                }

                                _context5.next = 27;
                                return this.nanoDLP.command("/z-axis/move/up/micron/" + z);

                            case 27:
                                _context5.next = 31;
                                break;

                            case 29:
                                _context5.next = 31;
                                return this.nanoDLP.command("/z-axis/move/up/micron/1000");

                            case 31:
                                return _context5.abrupt("break", 47);

                            case 32:
                                _context5.next = 34;
                                return this.nanoDLP.command("/z-axis/move/up/micron/500");

                            case 34:
                                return _context5.abrupt("break", 47);

                            case 35:
                                _context5.next = 37;
                                return this.nanoDLP.command("/z-axis/move/up/micron/100");

                            case 37:
                                return _context5.abrupt("break", 47);

                            case 38:
                                _context5.next = 40;
                                return this.nanoDLP.command("/z-axis/move/up/pulse/100");

                            case 40:
                                return _context5.abrupt("break", 47);

                            case 41:
                                _context5.next = 43;
                                return this.nanoDLP.command("/z-axis/move/up/pulse/10");

                            case 43:
                                return _context5.abrupt("break", 47);

                            case 44:
                                _context5.next = 46;
                                return this.nanoDLP.command("/z-axis/move/up/pulse/1");

                            case 46:
                                return _context5.abrupt("break", 47);

                            case 47:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function moveUp() {
                return _ref5.apply(this, arguments);
            }

            return moveUp;
        }()
    }, {
        key: "setBtn",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(id) {
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return this.nextion.setValue("bt" + this.currentButton, 0);

                            case 2:
                                this.currentButton = id;
                                _context6.next = 5;
                                return this.nextion.setValue("bt" + this.currentButton, 1);

                            case 5:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));

            function setBtn(_x) {
                return _ref6.apply(this, arguments);
            }

            return setBtn;
        }()
    }, {
        key: "update",
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(status) {
                var currentMm;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                this.status = status;

                                if (this.setup) {
                                    _context7.next = 5;
                                    break;
                                }

                                _context7.next = 4;
                                return this.nanoDLP.getSetup();

                            case 4:
                                this.setup = _context7.sent;

                            case 5:
                                currentMm = status.CurrentHeight / (360 / this.setup.MotorDegree * this.setup.MicroStep / this.setup.LeadscrewPitch);

                                currentMm = currentMm < 0 ? 0 : Math.floor(currentMm * 10) / 10;
                                //currentMm = (currentMm < 0) ? 0 : ((currentMm > 150) ? 150 : Math.floor(currentMm * 10) / 10);
                                _context7.next = 9;
                                return this.setText("t1", currentMm + "mm");

                            case 9:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function update(_x2) {
                return _ref7.apply(this, arguments);
            }

            return update;
        }()
    }]);

    return ZAxis;
}(_abstract3.default);

exports.default = ZAxis;
//# sourceMappingURL=zAxis.js.map