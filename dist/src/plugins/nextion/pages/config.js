"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract");

var _abstract3 = _interopRequireDefault(_abstract2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");
var fs = require("fs");

var _ = null;

var Config = function (_abstract) {
    _inherits(Config, _abstract);

    function Config(screenManager) {
        _classCallCheck(this, Config);

        var _this = _possibleConstructorReturn(this, (Config.__proto__ || Object.getPrototypeOf(Config)).call(this, screenManager));

        _this.selectedIdx = 0;
        return _this;
    }

    _createClass(Config, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {
                var _this2 = this;

                var targetProfile;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return this.setScreen("config");

                            case 2:
                                if (this.profiles) {
                                    _context7.next = 6;
                                    break;
                                }

                                _context7.next = 5;
                                return this.nanoDLP.getProfiles();

                            case 5:
                                this.profiles = _context7.sent;

                            case 6:
                                targetProfile = this.profiles[this.selectedIdx];


                                _ = this.setText("t1", targetProfile.Title);
                                _ = this.setText("t2", targetProfile.SupportLayerNumber);
                                _ = this.setText("t3", targetProfile.SupportCureTime);
                                _ = this.setText("t4", targetProfile.Depth);
                                _ = this.setText("t5", targetProfile.CureTime);

                                this.addListener("click_b0", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _this2.selectedIdx = (_this2.selectedIdx - 1 + _this2.profiles.length) % _this2.profiles.length;
                                                    _this2.indexChange();

                                                case 2:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this2);
                                })));

                                this.addListener("click_b1", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _this2.selectedIdx = (_this2.selectedIdx + 1) % _this2.profiles.length;
                                                    _this2.indexChange();

                                                case 2:
                                                case "end":
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this2);
                                })));

                                this.addListener("click_b2", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
                                    var profiles;
                                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                                        while (1) {
                                            switch (_context3.prev = _context3.next) {
                                                case 0:
                                                    profiles = JSON.parse(fs.readFileSync("/home/pi/printer/db/profiles.json"));
                                                    _context3.next = 3;
                                                    return _this2.nextion.getValue("t2.r");

                                                case 3:
                                                    profiles[_this2.selectedIdx].SupportLayerNumber = _context3.sent;
                                                    _context3.next = 6;
                                                    return _this2.nextion.getValue("t3.r");

                                                case 6:
                                                    profiles[_this2.selectedIdx].SupportCureTime = _context3.sent;
                                                    _context3.next = 9;
                                                    return _this2.nextion.getValue("t5.r");

                                                case 9:
                                                    profiles[_this2.selectedIdx].CureTime = _context3.sent;

                                                    fs.writeFileSync("/home/pi/printer/db/profiles.json", JSON.stringify(profiles));
                                                    console.log("Save profile -- SupportLayerNumber: " + profiles[_this2.selectedIdx].SupportLayerNumber + ", SupportCureTime: " + profiles[_this2.selectedIdx].SupportCureTime + ", CureTime: " + profiles[_this2.selectedIdx].CureTime);

                                                case 12:
                                                case "end":
                                                    return _context3.stop();
                                            }
                                        }
                                    }, _callee3, _this2);
                                })));

                                this.addListener("click_b3", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
                                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    _this2.changePage("home");

                                                case 1:
                                                case "end":
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, _this2);
                                })));

                                this.addListener("click_b4", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
                                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                                        while (1) {
                                            switch (_context5.prev = _context5.next) {
                                                case 0:
                                                    _this2.changePage("settings");

                                                case 1:
                                                case "end":
                                                    return _context5.stop();
                                            }
                                        }
                                    }, _callee5, _this2);
                                })));

                                this.addListener("click_b5", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
                                    var initProfiles, profiles;
                                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                        while (1) {
                                            switch (_context6.prev = _context6.next) {
                                                case 0:
                                                    initProfiles = JSON.parse(fs.readFileSync("/home/pi/printer/db/initProfiles.json"));

                                                    _ = _this2.setText("t2", initProfiles[_this2.selectedIdx].SupportLayerNumber);
                                                    _ = _this2.setText("t3", initProfiles[_this2.selectedIdx].SupportCureTime);
                                                    _ = _this2.setText("t5", initProfiles[_this2.selectedIdx].CureTime);

                                                    profiles = JSON.parse(fs.readFileSync("/home/pi/printer/db/profiles.json"));
                                                    _context6.next = 7;
                                                    return _this2.nextion.getValue("t2.r");

                                                case 7:
                                                    profiles[_this2.selectedIdx].SupportLayerNumber = _context6.sent;
                                                    _context6.next = 10;
                                                    return _this2.nextion.getValue("t3.r");

                                                case 10:
                                                    profiles[_this2.selectedIdx].SupportCureTime = _context6.sent;
                                                    _context6.next = 13;
                                                    return _this2.nextion.getValue("t5.r");

                                                case 13:
                                                    profiles[_this2.selectedIdx].CureTime = _context6.sent;

                                                    fs.writeFileSync("/home/pi/printer/db/profiles.json", JSON.stringify(profiles));

                                                case 15:
                                                case "end":
                                                    return _context6.stop();
                                            }
                                        }
                                    }, _callee6, _this2);
                                })));

                            case 18:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));

            function init() {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: "indexChange",
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
                var targetProfile;
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return this.nanoDLP.getProfiles();

                            case 2:
                                this.profiles = _context8.sent;
                                targetProfile = this.profiles[this.selectedIdx];


                                _ = this.setText("t1", targetProfile.Title);
                                _ = this.setText("t2", targetProfile.SupportLayerNumber);
                                _ = this.setText("t3", targetProfile.SupportCureTime);
                                _ = this.setText("t4", targetProfile.Depth);
                                _ = this.setText("t5", targetProfile.CureTime);

                            case 9:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));

            function indexChange() {
                return _ref8.apply(this, arguments);
            }

            return indexChange;
        }()
    }, {
        key: "update",
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(status) {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function update(_x) {
                return _ref9.apply(this, arguments);
            }

            return update;
        }()
    }]);

    return Config;
}(_abstract3.default);

exports.default = Config;
//# sourceMappingURL=config.js.map