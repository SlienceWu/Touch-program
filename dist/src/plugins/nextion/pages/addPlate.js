"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _abstract2 = require("./abstract.js");

var _abstract3 = _interopRequireDefault(_abstract2);

var _requestPromiseNative = require("request-promise-native");

var _requestPromiseNative2 = _interopRequireDefault(_requestPromiseNative);

var _config = require("../../../../config.json");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

require("babel-polyfill");
var fs = require("fs");
var path = require("path");


var _ = null;

var Home = function (_abstract) {
    _inherits(Home, _abstract);

    function Home(screenManager) {
        _classCallCheck(this, Home);

        return _possibleConstructorReturn(this, (Home.__proto__ || Object.getPrototypeOf(Home)).call(this, screenManager));
    }

    _createClass(Home, [{
        key: "init",
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(options) {
                var _this2 = this;

                var showPage, pageFirstIdx, showFileFirstIdx, profileId, devicePath, targetFile, fullPath, buffer, devicePaths, availableFiles, drivelist, lista, deviceFiles, j;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return this.setScreen("addPlate");

                            case 2:
                                _context3.next = 4;
                                return this.nanoDLP.getProfiles();

                            case 4:
                                this.profiles = _context3.sent;

                                this.config = _config2.default.plugins.plates;
                                this.pconfig = _config2.default.plugins.profiles;

                                showPage = 1;
                                pageFirstIdx = 0;
                                showFileFirstIdx = 0;


                                console.log("Selected Profile ID:" + this.profiles[this.pconfig.selectedIdx].ProfileID + ", Name: " + this.profiles[this.pconfig.selectedIdx].Title);
                                _context3.next = 13;
                                return this.setText("t3", this.profiles[this.pconfig.selectedIdx].ProfileID + ": " + this.profiles[this.pconfig.selectedIdx].Title);

                            case 13:
                                if (!options) {
                                    _context3.next = 27;
                                    break;
                                }

                                if (!(options.confirmResult && options.confirmType === "addplate")) {
                                    _context3.next = 26;
                                    break;
                                }

                                profileId = options.data0;
                                devicePath = options.data1;
                                targetFile = options.data2;
                                fullPath = devicePath + '/' + targetFile;

                                if (fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
                                    _context3.next = 21;
                                    break;
                                }

                                return _context3.abrupt("return", this.changePage("plates"));

                            case 21:
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
                                return _context3.abrupt("return", this.changePage("plates"));

                            case 26:
                                if (!options.confirmResult && options.confirmType === "addplate") {
                                    showPage = options.data3;
                                    showFileFirstIdx = (options.data3 - 1) * 4;
                                    pageFirstIdx = showFileFirstIdx;
                                }

                            case 27:

                                this.addListener("click_b1", function () {
                                    _ = _this2.changePage("home");
                                });
                                this.addListener("click_b2", function () {
                                    _ = _this2.changePage("plates");
                                });

                                devicePaths = [];
                                availableFiles = [];
                                drivelist = require('drivelist');
                                _context3.next = 34;
                                return drivelist.list();

                            case 34:
                                lista = _context3.sent;

                                lista.forEach(function (drive) {
                                    if (drive !== undefined && drive.mountpoints[0] !== undefined) {
                                        devicePaths.push(drive.mountpoints[0].path);
                                    }
                                });
                                console.log("Device count: " + devicePaths.length);
                                if (this.config.autoFetch === "true" && this.config.showAll === "false" && availableFiles.length === 0) {
                                    deviceFiles = [];

                                    for (j = 0; j < devicePaths.length; ++j) {
                                        this.tempPath = devicePaths[j];
                                        deviceFiles = fs.readdirSync(this.tempPath);
                                        deviceFiles = deviceFiles.map(this.completePath, this);
                                        deviceFiles = deviceFiles.filter(this.filterFile, this);
                                        console.log("Device" + (j + 1) + " -- Path: " + devicePaths[j] + ", Available file count: " + deviceFiles.length);
                                        availableFiles = availableFiles.concat(deviceFiles);
                                    }
                                }

                                this.current_page = showPage;
                                this.page_count = Math.ceil(availableFiles.length / 4.0);
                                _ = this.list(showFileFirstIdx, availableFiles);
                                _ = this.setText("t13", this.current_page + '/' + this.page_count);

                                /*await drivelist.list((error, drives) => {
                                    if (error) {
                                        throw error;
                                    }
                                    drives.forEach((drive) => {
                                        if (drive !== undefined && drive.mountpoints[0] !== undefined) {
                                            devicePaths.push(drive.mountpoints[0].path);
                                        }
                                    });
                                    console.log("Device count: " + devicePaths.length);
                                     if (this.config.autoFetch === "true" && this.config.showAll === "false" && availableFiles.length === 0) {
                                        let deviceFiles = [];
                                        for (let j = 0; j < devicePaths.length; ++j) {
                                            this.tempPath = devicePaths[j];
                                            deviceFiles = fs.readdirSync(this.tempPath);
                                            deviceFiles = deviceFiles.map(this.completePath, this);
                                            deviceFiles = deviceFiles.filter(this.filterFile, this);
                                            console.log("Device" + (j + 1) + " -- Path: " + devicePaths[j] + ", Available file count: " + deviceFiles.length);
                                            availableFiles = availableFiles.concat(deviceFiles);
                                        }
                                    }
                                     this.current_page = showPage;
                                    this.page_count = Math.ceil(availableFiles.length / 4.0);
                                    _ = this.list(showFileFirstIdx, availableFiles);
                                    _ = this.setText("t13", this.current_page + '/' + this.page_count);
                                });*/

                                this.addListener("click_b14", function () {
                                    _this2.current_page = (_this2.current_page - 2 + _this2.page_count) % _this2.page_count + 1;
                                    pageFirstIdx = (_this2.current_page - 1) * 4;
                                    _ = _this2.list(pageFirstIdx, availableFiles);
                                    _ = _this2.setText("t13", _this2.current_page + '/' + _this2.page_count);
                                });

                                this.addListener("click_b15", function () {
                                    _this2.current_page = _this2.current_page % _this2.page_count + 1;
                                    pageFirstIdx = (_this2.current_page - 1) * 4;
                                    _ = _this2.list(pageFirstIdx, availableFiles);
                                    _ = _this2.setText("t13", _this2.current_page + '/' + _this2.page_count);
                                });

                                this.addListener("click_b4", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                                    var config;
                                    return regeneratorRuntime.wrap(function _callee$(_context) {
                                        while (1) {
                                            switch (_context.prev = _context.next) {
                                                case 0:
                                                    _this2.pconfig = _config2.default.plugins.profiles;
                                                    _this2.pconfig.selectedIdx = (_this2.pconfig.selectedIdx - 1 + _this2.profiles.length) % _this2.profiles.length;
                                                    config = JSON.parse(fs.readFileSync("/home/pi/nextion/config.json"));

                                                    config.plugins.profiles.selectedIdx = _this2.pconfig.selectedIdx;
                                                    fs.writeFileSync("/home/pi/nextion/config.json", JSON.stringify(config));
                                                    _context.next = 7;
                                                    return _this2.setText("t3", _this2.profiles[_this2.pconfig.selectedIdx].ProfileID + ": " + _this2.profiles[_this2.pconfig.selectedIdx].Title);

                                                case 7:
                                                    console.log("Selected Profile -- ID: " + _this2.profiles[_this2.pconfig.selectedIdx].ProfileID + ", Name: " + _this2.profiles[_this2.pconfig.selectedIdx].Title);

                                                case 8:
                                                case "end":
                                                    return _context.stop();
                                            }
                                        }
                                    }, _callee, _this2);
                                })));

                                this.addListener("click_b5", _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
                                    var config;
                                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _this2.pconfig = _config2.default.plugins.profiles;
                                                    _this2.pconfig.selectedIdx = (_this2.pconfig.selectedIdx + 1) % _this2.profiles.length;
                                                    config = JSON.parse(fs.readFileSync("/home/pi/nextion/config.json"));

                                                    config.plugins.profiles.selectedIdx = _this2.pconfig.selectedIdx;
                                                    fs.writeFileSync("/home/pi/nextion/config.json", JSON.stringify(config));
                                                    _context2.next = 7;
                                                    return _this2.setText("t3", _this2.profiles[_this2.pconfig.selectedIdx].ProfileID + ": " + _this2.profiles[_this2.pconfig.selectedIdx].Title);

                                                case 7:
                                                    console.log("Selected Profile -- ID :" + _this2.profiles[_this2.pconfig.selectedIdx].ProfileID + ", Name: " + _this2.profiles[_this2.pconfig.selectedIdx].Title);

                                                case 8:
                                                case "end":
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, _this2);
                                })));

                                this.addListener("click_b9", function () {
                                    if (pageFirstIdx < availableFiles.length) {
                                        var targetPath = path.dirname(availableFiles[pageFirstIdx]);
                                        var _targetFile = path.basename(availableFiles[pageFirstIdx]);
                                        _ = _this2.changePage("confirm", {
                                            text: "addplate Profile:" + _this2.profiles[_this2.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + _targetFile,
                                            confirmType: "addplate",
                                            returnPage: "addPlate",
                                            data0: _this2.profiles[_this2.pconfig.selectedIdx].ProfileID,
                                            data1: targetPath,
                                            data2: _targetFile,
                                            data3: _this2.current_page
                                        });
                                    }
                                });

                                this.addListener("click_b10", function () {
                                    if (pageFirstIdx + 1 < availableFiles.length) {
                                        var targetPath = path.dirname(availableFiles[pageFirstIdx + 1]);
                                        var _targetFile2 = path.basename(availableFiles[pageFirstIdx + 1]);
                                        _ = _this2.changePage("confirm", {
                                            text: "addplate Profile:" + _this2.profiles[_this2.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + _targetFile2,
                                            confirmType: "addplate",
                                            returnPage: "addPlate",
                                            data0: _this2.profiles[_this2.pconfig.selectedIdx].ProfileID,
                                            data1: targetPath,
                                            data2: _targetFile2,
                                            data3: _this2.current_page
                                        });
                                    }
                                });

                                this.addListener("click_b11", function () {
                                    if (pageFirstIdx + 2 < availableFiles.length) {
                                        var targetPath = path.dirname(availableFiles[pageFirstIdx + 2]);
                                        var _targetFile3 = path.basename(availableFiles[pageFirstIdx + 2]);
                                        _ = _this2.changePage("confirm", {
                                            text: "addplate Profile:" + _this2.profiles[_this2.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + _targetFile3,
                                            confirmType: "addplate",
                                            returnPage: "addPlate",
                                            data0: _this2.profiles[_this2.pconfig.selectedIdx].ProfileID,
                                            data1: targetPath,
                                            data2: _targetFile3,
                                            data3: _this2.current_page
                                        });
                                    }
                                });

                                this.addListener("click_b12", function () {
                                    if (pageFirstIdx + 3 < availableFiles.length) {
                                        var targetPath = path.dirname(availableFiles[pageFirstIdx + 3]);
                                        var _targetFile4 = path.basename(availableFiles[pageFirstIdx + 3]);
                                        _ = _this2.changePage("confirm", {
                                            text: "addplate Profile:" + _this2.profiles[_this2.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + _targetFile4,
                                            confirmType: "addplate",
                                            returnPage: "addPlate",
                                            data0: _this2.profiles[_this2.pconfig.selectedIdx].ProfileID,
                                            data1: targetPath,
                                            data2: _targetFile4,
                                            data3: _this2.current_page
                                        });
                                    }
                                });

                            case 50:
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
        key: "list",
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(fileIdx, files) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _ = this.setText("b9", files.length > fileIdx ? fileIdx + 1 + '. ' + path.basename(files[fileIdx]) : "");
                                _ = this.setText("b10", files.length > fileIdx + 1 ? fileIdx + 2 + '. ' + path.basename(files[fileIdx + 1]) : "");
                                _ = this.setText("b11", files.length > fileIdx + 2 ? fileIdx + 3 + '. ' + path.basename(files[fileIdx + 2]) : "");
                                _ = this.setText("b12", files.length > fileIdx + 3 ? fileIdx + 4 + '. ' + path.basename(files[fileIdx + 3]) : "");

                            case 4:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));

            function list(_x2, _x3) {
                return _ref4.apply(this, arguments);
            }

            return list;
        }()
    }, {
        key: "checkFile",
        value: function checkFile(filename) {
            var exts = this.config.fileExt.split("|");

            for (var i = 0; i < exts.length; ++i) {
                if (path.extname(filename).substr(1).toLowerCase() === exts[i].toLowerCase()) {
                    return true;
                }
            }
            return false;
        }
    }, {
        key: "filterFile",
        value: function filterFile(file) {
            return this.checkFile(file) || this.config.showAll === "true";
        }
    }, {
        key: "completePath",
        value: function completePath(file) {
            return this.tempPath + '/' + file;
        }
    }]);

    return Home;
}(_abstract3.default);

exports.default = Home;
//# sourceMappingURL=addPlate.js.map