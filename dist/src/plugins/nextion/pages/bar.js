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

var fs = require("fs");

var _ = null;

var Bar = function (_abstract) {
    _inherits(Bar, _abstract);

    function Bar(screenManager) {
        _classCallCheck(this, Bar);

        return _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, screenManager));
    }

    _createClass(Bar, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(options) {
                var _this, profileId, devicePath, targetFile, fullPath, buffer, last, num;

                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.next = 2;
                                return this.setScreen("bar");

                            case 2:
                                _this = this;

                                if (!options) {
                                    _context.next = 21;
                                    break;
                                }

                                if (!(options.confirmResult && options.confirmType === "addplate")) {
                                    _context.next = 21;
                                    break;
                                }

                                profileId = options.data0;
                                devicePath = options.data1;
                                targetFile = options.data2;
                                fullPath = devicePath + '/' + targetFile;

                                if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
                                    _context.next = 11;
                                    break;
                                }

                                return _context.abrupt("return", this.changePage("plates"));

                            case 11:
                                buffer = fs.readFileSync(fullPath);


                                _ = (0, _requestPromiseNative2.default)({
                                    uri: global.SERVER_URL + "/plate/add",
                                    formData: {
                                        'ZipFile': {
                                            value: buffer,
                                            options: {
                                                filename: targetFile
                                            }
                                        },
                                        'Path': targetFile,
                                        'ProfileID': profileId
                                    },
                                    method: 'POST'
                                });
                                last = targetFile.toLowerCase().slice(-3);

                                if (!(last.indexOf("zip") !== -1)) {
                                    _context.next = 18;
                                    break;
                                }

                                num = 0;

                                this.prog = setInterval(function () {
                                    num = num + 20;
                                    _this.setText("t1", num);
                                    if (num >= 100) {
                                        clearInterval(_this.prog);
                                        return _this.changePage("plates");
                                    }
                                }, 2000);
                                return _context.abrupt("return");

                            case 18:
                                this.num = 0;
                                this.lastLog = "";
                                this.prog = setInterval(function () {
                                    _this.progress();
                                }, 2000);

                            case 21:
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
        key: "progress",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                var logArr, msg;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return this.nanoDLP.getLog();

                            case 2:
                                this.log = _context2.sent;
                                logArr = this.log.split("\n");
                                msg = logArr[logArr.length - 1];
                                //console.log(msg);

                                if (!(msg.indexOf("Plate file being processed") !== -1)) {
                                    _context2.next = 12;
                                    break;
                                }

                                if (!(this.lastLog !== msg)) {
                                    _context2.next = 10;
                                    break;
                                }

                                this.lastLog = msg;
                                this.num = this.num + 10;
                                return _context2.abrupt("return", this.setText("t1", this.num));

                            case 10:
                                _context2.next = 50;
                                break;

                            case 12:
                                if (!(msg.indexOf("Plate copied") !== -1)) {
                                    _context2.next = 19;
                                    break;
                                }

                                if (!(this.lastLog !== msg)) {
                                    _context2.next = 17;
                                    break;
                                }

                                this.lastLog = msg;
                                this.num = this.num + 10;
                                return _context2.abrupt("return", this.setText("t1", this.num));

                            case 17:
                                _context2.next = 50;
                                break;

                            case 19:
                                if (!(msg.indexOf("Plate has been added") !== -1)) {
                                    _context2.next = 26;
                                    break;
                                }

                                if (!(this.lastLog !== msg)) {
                                    _context2.next = 24;
                                    break;
                                }

                                this.lastLog = msg;
                                this.num = this.num + 10;
                                return _context2.abrupt("return", this.setText("t1", this.num));

                            case 24:
                                _context2.next = 50;
                                break;

                            case 26:
                                if (!(msg.indexOf("Plate file has been uploaded") !== -1)) {
                                    _context2.next = 33;
                                    break;
                                }

                                if (!(this.lastLog !== msg)) {
                                    _context2.next = 31;
                                    break;
                                }

                                this.lastLog = msg;
                                this.num = this.num + 10;
                                return _context2.abrupt("return", this.setText("t1", this.num));

                            case 31:
                                _context2.next = 50;
                                break;

                            case 33:
                                if (!(msg.indexOf("Generating plate 3D preview") !== -1)) {
                                    _context2.next = 40;
                                    break;
                                }

                                if (!(this.lastLog !== msg)) {
                                    _context2.next = 38;
                                    break;
                                }

                                this.lastLog = msg;
                                this.num = this.num + 40;
                                return _context2.abrupt("return", this.setText("t1", this.num));

                            case 38:
                                _context2.next = 50;
                                break;

                            case 40:
                                if (!(msg.indexOf("Timeout on 3D preview generator") !== -1)) {
                                    _context2.next = 46;
                                    break;
                                }

                                this.setText("t1", 100);
                                clearInterval(this.prog);
                                return _context2.abrupt("return", this.changePage("warning"));

                            case 46:
                                if (!(msg.indexOf("3D preview has been generated") !== -1)) {
                                    _context2.next = 50;
                                    break;
                                }

                                this.setText("t1", 100);
                                clearInterval(this.prog);
                                return _context2.abrupt("return", this.changePage("plates"));

                            case 50:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function progress() {
                return _ref2.apply(this, arguments);
            }

            return progress;
        }()
    }]);

    return Bar;
}(_abstract3.default);

exports.default = Bar;
//# sourceMappingURL=bar.js.map