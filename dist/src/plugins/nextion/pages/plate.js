"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _config = require("../../../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");

var fs = require("fs");

var _ = null;

var Plate = function (_abstract) {
    _inherits(Plate, _abstract);

    function Plate(screenManager) {
        _classCallCheck(this, Plate);

        return _possibleConstructorReturn(this, (Plate.__proto__ || Object.getPrototypeOf(Plate)).call(this, screenManager));
    }

    _createClass(Plate, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(plate) {
                var _this2 = this;

                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.setScreen("plate");

                            case 2:

                                this.plate = plate;
                                _context3.next = 5;
                                return this.nanoDLP.getProfiles();

                            case 5:
                                this.profiles = _context3.sent;


                                this.imageX = 0x48; //0x1E;
                                this.imageY = 0x18; //0x3C;
                                this.imageWidth = 0xb3;

                                _ = this.setText("t0", this.plate.Path);
                                _ = this.setText("t1", this.profiles[_lodash2.default.findIndex(this.profiles, { ProfileID: this.plate.ProfileID })].Title);
                                _ = this.setText("t7", this.plate.LayersCount + " layers");

                                console.log("Printing Ready -- Plate ID: " + this.plate.PlateID + ", Plate Name: " + this.plate.Path, ", Profile ID: " + this.plate.ProfileID);

                                this.addListener("click_b1", function () {
                                    _ = _this2.changePage("home");
                                });
                                this.addListener("click_b2", function () {
                                    if (plate.Type === "stl") {
                                        _ = _this2.changePage("plates", {
                                            type: "stl",
                                            PlateID: plate.PlateID
                                        });
                                    } else {
                                        _ = _this2.changePage("plates", {
                                            type: "zip",
                                            PlateID: plate.PlateID
                                        });
                                    }
                                });

                                this.addListener("click_b9", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _context.next = 2;
                                                    return _this2.nanoDLP.command("/printer/start/" + _this2.plate.PlateID);

                                                case 2:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this2);
                                })));

                                this.addListener("click_b15", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _ = _this2.changePage("confirm", {
                                                        text: "delete plate:" + _this2.plate.Path,
                                                        confirmType: "deleteplate",
                                                        data0: _this2.plate.PlateID,
                                                        returnPage: "plates"
                                                    });

                                                case 1:
                                                case "end":
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this2);
                                })));

                                this.gap = 100 / this.plate.LayersCount;

                                this.addListener("number", function (index) {
                                    index = Math.floor(index / _this2.gap);
                                    _ = _this2.setLayer(index);
                                });

                                _context3.next = 21;
                                return this.setLayer(1);

                            case 21:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));

            function init(_x) {
                return _ref.apply(this, arguments);
            }

            return init;
        }()
    }, {
        key: "setLayer",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(index) {
                var image;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                this.index = index === 0 ? 1 : index;
                                _context4.next = 3;
                                return this.setText("t12", "Loading " + this.index + "/" + this.plate.LayersCount);

                            case 3:
                                _context4.next = 5;
                                return this.nanoDLP.getCurrentPlateLayer(this.plate.PlateID, this.index);

                            case 5:
                                image = _context4.sent;

                                if (!this.enabled) {
                                    _context4.next = 9;
                                    break;
                                }

                                _context4.next = 9;
                                return this.nextion.displayBlackWhiteImage(image, this.imageX, this.imageY, this.imageWidth).catch(function (e) {
                                    return console.error(e);
                                });

                            case 9:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function setLayer(_x2) {
                return _ref4.apply(this, arguments);
            }

            return setLayer;
        }()
    }]);

    return Plate;
}(_abstract3.default);

exports.default = Plate;
//# sourceMappingURL=plate.js.map