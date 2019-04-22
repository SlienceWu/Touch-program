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

var Information = function (_abstract) {
    _inherits(Information, _abstract);

    function Information(screenManager) {
        _classCallCheck(this, Information);

        return _possibleConstructorReturn(this, (Information.__proto__ || Object.getPrototypeOf(Information)).call(this, screenManager));
    }

    _createClass(Information, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.setScreen("information");

                            case 2:

                                this.addListener("click_b15", function () {
                                    _ = _this2.changePage("system");
                                });

                                this.ipState = "0";
                                setTimeout(_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _this2.ipState = "2";
                                                    _context.next = 3;
                                                    return _this2.setText("t1", "----");

                                                case 3:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this2);
                                })), 30000);
                                /*let ip = require("ip");
                                await this.setText("t1", ip.address());
                                console.log((new Date()).toGMTString() + " IP Address: " + ip.address());*/
                                this.addListener("click_b19", function () {
                                    _ = _this2.changePage("printingHome", "back");
                                });

                            case 6:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function init() {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: "update",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(status) {
                var ip;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _ = this.setText("t5", status.proc);
                                _ = this.setText("t6", status.mem);
                                _ = this.setText("t7", Math.ceil(parseInt(status.temp)) + "C");
                                _ = this.setText("t8", status.disk);
                                //_ = this.setText("t2", "cpu:" + status.proc + " mem:" + status.mem + " temp:" + Math.ceil(parseInt(status.temp)) + "C"); //
                                ip = require("ip");

                                if (!(ip.address() === "127.0.0.1")) {
                                    _context3.next = 12;
                                    break;
                                }

                                if (!(this.ipState !== "2")) {
                                    _context3.next = 10;
                                    break;
                                }

                                this.ipState = "0";
                                _context3.next = 10;
                                return this.setText("t1", "xxxx");

                            case 10:
                                _context3.next = 15;
                                break;

                            case 12:
                                this.ipState = "1";
                                _context3.next = 15;
                                return this.setText("t1", ip.address() + "   ");

                            case 15:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function update(_x) {
                return _ref3.apply(this, arguments);
            }

            return update;
        }()
    }]);

    return Information;
}(_abstract3.default);

exports.default = Information;
//# sourceMappingURL=information.js.map