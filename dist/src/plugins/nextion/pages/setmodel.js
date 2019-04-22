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

var SetModel = function (_abstract) {
    _inherits(SetModel, _abstract);

    function SetModel(screenManager) {
        _classCallCheck(this, SetModel);

        return _possibleConstructorReturn(this, (SetModel.__proto__ || Object.getPrototypeOf(SetModel)).call(this, screenManager));
    }

    _createClass(SetModel, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
                var _this3 = this;

                var image;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.setScreen("setmodel");

                            case 2:
                                if (!options.Processed) {
                                    _context3.next = 7;
                                    break;
                                }

                                _context3.next = 5;
                                return this.setText("t11", "yes");

                            case 5:
                                _context3.next = 9;
                                break;

                            case 7:
                                _context3.next = 9;
                                return this.setText("t11", "no");

                            case 9:
                                _context3.next = 11;
                                return this.isExist(options, this);

                            case 11:
                                this.serverURL = global.SERVER_URL;

                                if (!options.Preview) {
                                    _context3.next = 18;
                                    break;
                                }

                                _context3.next = 15;
                                return (0, _requestPromiseNative2.default)({ url: this.serverURL + "/static/plates/" + options.PlateID + "/3d.png", encoding: null });

                            case 15:
                                image = _context3.sent;
                                _context3.next = 18;
                                return this.nextion.displayImage(image);

                            case 18:

                                this.addListener("click_b1", function () {
                                    _this3.saveXYZ(options);
                                });
                                this.addListener("click_b2", function () {
                                    _ = _this3.requestTest(_this3.serverURL + "/plate/regenerate", { "PlateID": options.PlateID, "XRes": _this3.XRes, "YRes": _this3.YRes, "ZRes": _this3.ZRes });
                                    _ = _this3.changePage("slice", options);
                                });
                                this.addListener("click_b3", function () {
                                    _ = _this3.changePage("plates", { type: "stl", PlateID: options.PlateID });
                                });

                                this.addListener("click_b4", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    if (!options.Processed) {
                                                        _context.next = 3;
                                                        break;
                                                    }

                                                    _context.next = 3;
                                                    return _this3.nanoDLP.command("/printer/start/" + options.PlateID);

                                                case 3:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this3);
                                })));
                                this.addListener("click_b5", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _ = _this3.changePage("confirm", {
                                                        text: "delete plate:" + options.Path,
                                                        confirmType: "deleteplate",
                                                        data0: options.PlateID,
                                                        returnPage: "plates"
                                                    });

                                                case 1:
                                                case "end":
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this3);
                                })));

                            case 23:
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
        key: "requestTest",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(url, data) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                return _context4.abrupt("return", _requestPromiseNative2.default.post({
                                    uri: url,
                                    form: data,
                                    headers: { Cookie: "" + (this.auth ? this.session : "") },
                                    timeout: 3000
                                }));

                            case 1:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function requestTest(_x2, _x3) {
                return _ref4.apply(this, arguments);
            }

            return requestTest;
        }()
    }, {
        key: "saveXYZ",
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(options) {
                var x, y, z, params;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return this.getValue("x");

                            case 2:
                                x = _context5.sent;
                                _context5.next = 5;
                                return this.getValue("y");

                            case 5:
                                y = _context5.sent;
                                _context5.next = 8;
                                return this.getValue("z");

                            case 8:
                                z = _context5.sent;
                                _context5.next = 11;
                                return this.transform(options, x, "x");

                            case 11:
                                this.XRes = _context5.sent;
                                _context5.next = 14;
                                return this.transform(options, y, "y");

                            case 14:
                                this.YRes = _context5.sent;
                                _context5.next = 17;
                                return this.transform(options, z, "z");

                            case 17:
                                this.ZRes = _context5.sent;
                                params = {
                                    "PlateID": options.PlateID,
                                    "XRes": this.XRes,
                                    "YRes": this.YRes,
                                    "ZRes": this.ZRes
                                };

                                this.writeJson(params);

                            case 20:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));

            function saveXYZ(_x4) {
                return _ref5.apply(this, arguments);
            }

            return saveXYZ;
        }()
    }, {
        key: "writeJson",
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(params) {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                //先将json文件读出来
                                _fs2.default.readFile("/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json", function () {
                                    var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(err, data) {
                                        var plate, i, key, _str, str;

                                        return regeneratorRuntime.wrap(function _callee8$(_context8) {
                                            while (1) {
                                                switch (_context8.prev = _context8.next) {
                                                    case 0:
                                                        if (!err) {
                                                            _context8.next = 2;
                                                            break;
                                                        }

                                                        return _context8.abrupt("return", console.error(err));

                                                    case 2:
                                                        plate = data.toString();

                                                        plate = JSON.parse(plate);
                                                        i = 0;

                                                    case 5:
                                                        if (!(i < plate.data.length)) {
                                                            _context8.next = 15;
                                                            break;
                                                        }

                                                        if (!(params.PlateID == plate.data[i].PlateID)) {
                                                            _context8.next = 12;
                                                            break;
                                                        }

                                                        console.log('id is exist');
                                                        for (key in params) {
                                                            if (plate.data[i][key]) {
                                                                plate.data[i][key] = params[key];
                                                            }
                                                        }
                                                        _str = JSON.stringify(plate);

                                                        _fs2.default.writeFile("/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json", _str, function () {
                                                            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(err) {
                                                                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                                                                    while (1) {
                                                                        switch (_context6.prev = _context6.next) {
                                                                            case 0:
                                                                                if (err) {
                                                                                    console.error(err);
                                                                                }
                                                                                console.log('----------修改成功-------------');

                                                                            case 2:
                                                                            case "end":
                                                                                return _context6.stop();
                                                                        }
                                                                    }
                                                                }, _callee6, this);
                                                            }));

                                                            return function (_x8) {
                                                                return _ref8.apply(this, arguments);
                                                            };
                                                        }());
                                                        return _context8.abrupt("return");

                                                    case 12:
                                                        i++;
                                                        _context8.next = 5;
                                                        break;

                                                    case 15:
                                                        plate.data.push(params);
                                                        plate.total = plate.data.length;
                                                        str = JSON.stringify(plate);

                                                        _fs2.default.writeFile("/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json", str, function () {
                                                            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(err) {
                                                                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                                                                    while (1) {
                                                                        switch (_context7.prev = _context7.next) {
                                                                            case 0:
                                                                                if (err) {
                                                                                    console.error(err);
                                                                                }
                                                                                console.log('----------新增成功-------------');

                                                                            case 2:
                                                                            case "end":
                                                                                return _context7.stop();
                                                                        }
                                                                    }
                                                                }, _callee7, this);
                                                            }));

                                                            return function (_x9) {
                                                                return _ref9.apply(this, arguments);
                                                            };
                                                        }());

                                                    case 19:
                                                    case "end":
                                                        return _context8.stop();
                                                }
                                            }
                                        }, _callee8, this);
                                    }));

                                    return function (_x6, _x7) {
                                        return _ref7.apply(this, arguments);
                                    };
                                }());

                            case 1:
                            case "end":
                                return _context9.stop();
                        }
                    }
                }, _callee9, this);
            }));

            function writeJson(_x5) {
                return _ref6.apply(this, arguments);
            }

            return writeJson;
        }()
    }, {
        key: "isExist",
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(options, _this) {
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while (1) {
                        switch (_context11.prev = _context11.next) {
                            case 0:
                                _fs2.default.readFile("/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json", function () {
                                    var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(err, data) {
                                        var plate, i;
                                        return regeneratorRuntime.wrap(function _callee10$(_context10) {
                                            while (1) {
                                                switch (_context10.prev = _context10.next) {
                                                    case 0:
                                                        if (err) {
                                                            console.error(err);
                                                        }
                                                        plate = data.toString();

                                                        plate = JSON.parse(plate);
                                                        i = 0;

                                                    case 4:
                                                        if (!(i < plate.data.length)) {
                                                            _context10.next = 29;
                                                            break;
                                                        }

                                                        if (!(options.PlateID == plate.data[i].PlateID)) {
                                                            _context10.next = 26;
                                                            break;
                                                        }

                                                        console.log('set is Exist');
                                                        _context10.t0 = _this;
                                                        _context10.next = 10;
                                                        return _this.transform(options, plate.data[i].XRes, "x");

                                                    case 10:
                                                        _context10.t1 = _context10.sent;

                                                        _context10.t0.setText.call(_context10.t0, "t1", _context10.t1);

                                                        _context10.t2 = _this;
                                                        _context10.next = 15;
                                                        return _this.transform(options, plate.data[i].YRes, "y");

                                                    case 15:
                                                        _context10.t3 = _context10.sent;

                                                        _context10.t2.setText.call(_context10.t2, "t2", _context10.t3);

                                                        _context10.t4 = _this;
                                                        _context10.next = 20;
                                                        return _this.transform(options, plate.data[i].ZRes, "z");

                                                    case 20:
                                                        _context10.t5 = _context10.sent;

                                                        _context10.t4.setText.call(_context10.t4, "t3", _context10.t5);

                                                        _this.XRes = plate.data[i].XRes;
                                                        _this.YRes = plate.data[i].YRes;
                                                        _this.ZRes = plate.data[i].ZRes;
                                                        return _context10.abrupt("return");

                                                    case 26:
                                                        i++;
                                                        _context10.next = 4;
                                                        break;

                                                    case 29:
                                                        _this.setText("t1", options.Boundries.Xmax - options.Boundries.Xmin);
                                                        _this.setText("t2", options.Boundries.Ymax - options.Boundries.Ymin);
                                                        _this.setText("t3", options.Boundries.Zmax - options.Boundries.Zmin);
                                                        _this.XRes = options.XRes;
                                                        _this.YRes = options.YRes;
                                                        _this.ZRes = options.ZRes;

                                                    case 35:
                                                    case "end":
                                                        return _context10.stop();
                                                }
                                            }
                                        }, _callee10, this);
                                    }));

                                    return function (_x12, _x13) {
                                        return _ref11.apply(this, arguments);
                                    };
                                }());

                            case 1:
                            case "end":
                                return _context11.stop();
                        }
                    }
                }, _callee11, this);
            }));

            function isExist(_x10, _x11) {
                return _ref10.apply(this, arguments);
            }

            return isExist;
        }()
    }, {
        key: "deleteJson",
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14(plateID) {
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while (1) {
                        switch (_context14.prev = _context14.next) {
                            case 0:
                                _fs2.default.readFile("/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json", function () {
                                    var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13(err, data) {
                                        var plate, i, str;
                                        return regeneratorRuntime.wrap(function _callee13$(_context13) {
                                            while (1) {
                                                switch (_context13.prev = _context13.next) {
                                                    case 0:
                                                        if (!err) {
                                                            _context13.next = 2;
                                                            break;
                                                        }

                                                        return _context13.abrupt("return", console.error(error));

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
                                                            var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12(err) {
                                                                return regeneratorRuntime.wrap(function _callee12$(_context12) {
                                                                    while (1) {
                                                                        switch (_context12.prev = _context12.next) {
                                                                            case 0:
                                                                                if (err) {
                                                                                    console.error(err);
                                                                                }
                                                                                console.log('----------删除成功-------------');

                                                                            case 2:
                                                                            case "end":
                                                                                return _context12.stop();
                                                                        }
                                                                    }
                                                                }, _callee12, this);
                                                            }));

                                                            return function (_x17) {
                                                                return _ref14.apply(this, arguments);
                                                            };
                                                        }());

                                                    case 8:
                                                    case "end":
                                                        return _context13.stop();
                                                }
                                            }
                                        }, _callee13, this);
                                    }));

                                    return function (_x15, _x16) {
                                        return _ref13.apply(this, arguments);
                                    };
                                }());

                            case 1:
                            case "end":
                                return _context14.stop();
                        }
                    }
                }, _callee14, this);
            }));

            function deleteJson(_x14) {
                return _ref12.apply(this, arguments);
            }

            return deleteJson;
        }()
    }, {
        key: "transform",
        value: function () {
            var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(options, va, str) {
                var x, xr, xReal, y, yr, yReal, z, zr, zReal;
                return regeneratorRuntime.wrap(function _callee15$(_context15) {
                    while (1) {
                        switch (_context15.prev = _context15.next) {
                            case 0:
                                if (!(str === "x")) {
                                    _context15.next = 7;
                                    break;
                                }

                                x = options.Boundries.Xmax - options.Boundries.Xmin;
                                xr = options.XRes;
                                xReal = xr * x / va;
                                return _context15.abrupt("return", xReal);

                            case 7:
                                if (!(str === "y")) {
                                    _context15.next = 14;
                                    break;
                                }

                                y = options.Boundries.Ymax - options.Boundries.Ymin;
                                yr = options.YRes;
                                yReal = yr * y / va;
                                return _context15.abrupt("return", yReal);

                            case 14:
                                z = options.Boundries.Zmax - options.Boundries.Zmin;
                                zr = options.ZRes;
                                zReal = zr * z / va;
                                return _context15.abrupt("return", zReal);

                            case 18:
                            case "end":
                                return _context15.stop();
                        }
                    }
                }, _callee15, this);
            }));

            function transform(_x18, _x19, _x20) {
                return _ref15.apply(this, arguments);
            }

            return transform;
        }()
    }]);

    return SetModel;
}(_abstract3.default);

exports.default = SetModel;
//# sourceMappingURL=setmodel.js.map