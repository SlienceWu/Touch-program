"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _nextionService = require("./nextion/nextionService.js");

var _nextionService2 = _interopRequireDefault(_nextionService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var Confirm = function (_abstract) {
    _inherits(Confirm, _abstract);

    function Confirm(manager) {
        _classCallCheck(this, Confirm);

        var _this = _possibleConstructorReturn(this, (Confirm.__proto__ || Object.getPrototypeOf(Confirm)).call(this, manager));

        _this.isPrinting = null;

        _this.nextion = new _nextionService2.default(_this.config.plugins.nextion);

        _this.nextion.on("disconnect", function () {
            _this.init().catch(function (e) {
                return console.error(e);
            });
        });
        return _this;
    }

    _createClass(Confirm, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                this.isPrinting = null;
                                this.currentPageId = null;

                                _context.next = 4;
                                return this.nextion.connect();

                            case 4:

                                this.update(this.status, this.log).catch(function (e) {
                                    return console.error(e);
                                });

                            case 5:
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
        key: "update",
        value: function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(status, log) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                if (status) {
                                    _context2.next = 2;
                                    break;
                                }

                                return _context2.abrupt("return");

                            case 2:

                                this.status = status;
                                this.log = log;

                                clearTimeout(this.updateTimeOut);

                                if (!(status.Printing !== this.isPrinting)) {
                                    _context2.next = 14;
                                    break;
                                }

                                this.isPrinting = status.Printing;

                                if (!this.isPrinting) {
                                    _context2.next = 12;
                                    break;
                                }

                                _context2.next = 10;
                                return this.setPage("printingHome");

                            case 10:
                                _context2.next = 14;
                                break;

                            case 12:
                                _context2.next = 14;
                                return this.setPage("home");

                            case 14:
                                this.isPrinting = status.Printing;

                                _context2.next = 17;
                                return this.currentPage.update(status, log).catch(function (e) {
                                    return console.error(e);
                                });

                            case 17:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));

            function update(_x, _x2) {
                return _ref2.apply(this, arguments);
            }

            return update;
        }()
    }, {
        key: "setPage",
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(page, options) {
                var PageClass;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.t0 = page;
                                _context3.next = _context3.t0 === "addPlate" ? 3 : _context3.t0 === "plate" ? 5 : _context3.t0 === "setmodel" ? 7 : _context3.t0 === "zAxis" ? 9 : _context3.t0 === "projector" ? 11 : _context3.t0 === "config" ? 13 : _context3.t0 === "printingHome" ? 15 : 17;
                                break;

                            case 3:
                                if (this.isPrinting) {
                                    page = "nooperation";
                                    options = "plates";
                                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                                } else {
                                    page = "addPlate";
                                    console.log("Initialize 'Page addPlate'");
                                }
                                return _context3.abrupt("break", 17);

                            case 5:
                                if (this.isPrinting) {
                                    page = "nooperation";
                                    options = "plates";
                                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                                } else {
                                    page = "plate";
                                    console.log("Initialize 'Page plate'");
                                }
                                return _context3.abrupt("break", 17);

                            case 7:
                                if (this.isPrinting) {
                                    page = "nooperation";
                                    options = "plates";
                                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                                } else {
                                    page = "setmodel";
                                    console.log("Initialize 'Page setmodel'");
                                }
                                return _context3.abrupt("break", 17);

                            case 9:
                                if (this.isPrinting) {
                                    page = "nooperation";
                                    options = "settings";
                                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                                } else {
                                    page = "zAxis";
                                    console.log("Initialize 'Page zAxis'");
                                }
                                return _context3.abrupt("break", 17);

                            case 11:
                                if (this.isPrinting) {
                                    page = "nooperation";
                                    options = "settings";
                                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                                } else {
                                    page = "projector";
                                    console.log("Initialize 'Page projector'");
                                }
                                return _context3.abrupt("break", 17);

                            case 13:
                                if (this.isPrinting) {
                                    page = "nooperation";
                                    options = "settings";
                                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                                } else {
                                    page = "config";
                                    console.log("Initialize 'Page config'");
                                }
                                return _context3.abrupt("break", 17);

                            case 15:
                                if (options === "back") {
                                    if (this.isPrinting) {
                                        page = "printingHome";
                                        console.log("Printing task is running, initialize 'Page PrintingHome' first");
                                    } else {
                                        page = "home";
                                        console.log("Initialize 'Page home'");
                                    }
                                } else {
                                    page = "printingHome";
                                    console.log("Initialize 'Page printingHome'");
                                }
                                return _context3.abrupt("break", 17);

                            case 17:
                                if (!(this.currentPageId === page)) {
                                    _context3.next = 19;
                                    break;
                                }

                                return _context3.abrupt("return");

                            case 19:
                                PageClass = null;
                                _context3.prev = 20;

                                PageClass = require("./nextion/pages/" + page + ".js").default;
                                console.log("Load 'Pageclass " + page + "'");
                                _context3.next = 28;
                                break;

                            case 25:
                                _context3.prev = 25;
                                _context3.t1 = _context3["catch"](20);
                                return _context3.abrupt("return");

                            case 28:

                                if (this.currentPage) {
                                    try {
                                        this.currentPage.dispose();
                                    } catch (e) {
                                        console.error(e);
                                    }
                                }

                                this.currentPageId = page;
                                this.currentPage = new PageClass(this);

                                _context3.next = 33;
                                return new Promise(function (resolve) {
                                    return setTimeout(resolve, 100);
                                });

                            case 33:
                                this.currentPage.init(options).catch(function (e) {
                                    return console.error(e);
                                });

                                _context3.next = 36;
                                return this.update(this.status, this.log);

                            case 36:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[20, 25]]);
            }));

            function setPage(_x3, _x4) {
                return _ref3.apply(this, arguments);
            }

            return setPage;
        }()
    }]);

    return Confirm;
}(_abstract3.default);

exports.default = Confirm;
//# sourceMappingURL=nextion.js.map