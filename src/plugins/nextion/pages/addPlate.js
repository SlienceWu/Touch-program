require("babel-polyfill");
const fs = require("fs");
const path = require("path");
import abstract from "./abstract.js";
import request from "request-promise-native";
import gconfig from "../../../../config.json";

let _ = null;

export default class Home extends abstract {


    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("addPlate");
        this.profiles = await this.nanoDLP.getProfiles();
        this.config = gconfig.plugins.plates;
        this.pconfig = gconfig.plugins.profiles;

        let showPage = 1;
        let pageFirstIdx = 0;
        let showFileFirstIdx = 0;

        console.log("Selected Profile ID:" + this.profiles[this.pconfig.selectedIdx].ProfileID + ", Name: " + this.profiles[this.pconfig.selectedIdx].Title);
        await this.setText("t3", this.profiles[this.pconfig.selectedIdx].ProfileID + ": " + this.profiles[this.pconfig.selectedIdx].Title);

        if (options) {
            if (options.confirmResult && options.confirmType === "addplate") {
                let profileId = options.data0;
                let devicePath = options.data1;
                let targetFile = options.data2;

                let fullPath = devicePath + '/' + targetFile;
                if (!(fs.existsSync(fullPath) && fs.statSync(fullPath).isFile())) {
                    return this.changePage("plates");
                }
                let buffer = fs.readFileSync(fullPath);

                _ = request({
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
                return this.changePage("plates");
            } else if (!options.confirmResult && options.confirmType === "addplate") {
                showPage = options.data3;
                showFileFirstIdx = (options.data3 - 1) * 4;
                pageFirstIdx = showFileFirstIdx;
            }
        }

        this.addListener("click_b1", () => {
            _ = this.changePage("home");
        });
        this.addListener("click_b2", () => {
            _ = this.changePage("plates");
        });

        let devicePaths = [];
        let availableFiles = [];

        const drivelist = require('drivelist');
        let lista = await drivelist.list();
        lista.forEach((drive) => {
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

        this.addListener("click_b14", () => {
            this.current_page = ((this.current_page - 2 + this.page_count) % this.page_count) + 1;
            pageFirstIdx = (this.current_page - 1) * 4;
            _ = this.list(pageFirstIdx, availableFiles);
            _ = this.setText("t13", this.current_page + '/' + this.page_count);

        });

        this.addListener("click_b15", () => {
            this.current_page = (this.current_page % this.page_count) + 1;
            pageFirstIdx = (this.current_page - 1) * 4;
            _ = this.list(pageFirstIdx, availableFiles);
            _ = this.setText("t13", this.current_page + '/' + this.page_count);
        });

        this.addListener("click_b4", async () => {
            this.pconfig = gconfig.plugins.profiles;
            this.pconfig.selectedIdx = (this.pconfig.selectedIdx - 1 + this.profiles.length) % this.profiles.length;
            let config = JSON.parse(fs.readFileSync("/home/pi/nextion/config.json"));
            config.plugins.profiles.selectedIdx = this.pconfig.selectedIdx;
            fs.writeFileSync("/home/pi/nextion/config.json", JSON.stringify(config));
            await this.setText("t3", this.profiles[this.pconfig.selectedIdx].ProfileID + ": " + this.profiles[this.pconfig.selectedIdx].Title);
            console.log("Selected Profile -- ID: " + this.profiles[this.pconfig.selectedIdx].ProfileID + ", Name: " + this.profiles[this.pconfig.selectedIdx].Title);
        });

        this.addListener("click_b5", async () => {
            this.pconfig = gconfig.plugins.profiles;
            this.pconfig.selectedIdx = (this.pconfig.selectedIdx + 1) % this.profiles.length;
            let config = JSON.parse(fs.readFileSync("/home/pi/nextion/config.json"));
            config.plugins.profiles.selectedIdx = this.pconfig.selectedIdx;
            fs.writeFileSync("/home/pi/nextion/config.json", JSON.stringify(config));
            await this.setText("t3", this.profiles[this.pconfig.selectedIdx].ProfileID + ": " + this.profiles[this.pconfig.selectedIdx].Title);
            console.log("Selected Profile -- ID :" + this.profiles[this.pconfig.selectedIdx].ProfileID + ", Name: " + this.profiles[this.pconfig.selectedIdx].Title);
        });

        this.addListener("click_b9", () => {
            if (pageFirstIdx < availableFiles.length) {
                let targetPath = path.dirname(availableFiles[pageFirstIdx]);
                let targetFile = path.basename(availableFiles[pageFirstIdx]);
                _ = this.changePage("confirm", {
                    text: "addplate Profile:" + this.profiles[this.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + targetFile,
                    confirmType: "addplate",
                    returnPage: "addPlate",
                    data0: this.profiles[this.pconfig.selectedIdx].ProfileID,
                    data1: targetPath,
                    data2: targetFile,
                    data3: this.current_page
                });
            }
        });

        this.addListener("click_b10", () => {
            if ((pageFirstIdx + 1) < availableFiles.length) {
                let targetPath = path.dirname(availableFiles[pageFirstIdx + 1]);
                let targetFile = path.basename(availableFiles[pageFirstIdx + 1]);
                _ = this.changePage("confirm", {
                    text: "addplate Profile:" + this.profiles[this.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + targetFile,
                    confirmType: "addplate",
                    returnPage: "addPlate",
                    data0: this.profiles[this.pconfig.selectedIdx].ProfileID,
                    data1: targetPath,
                    data2: targetFile,
                    data3: this.current_page
                });
            }
        });

        this.addListener("click_b11", () => {
            if ((pageFirstIdx + 2) < availableFiles.length) {
                let targetPath = path.dirname(availableFiles[pageFirstIdx + 2]);
                let targetFile = path.basename(availableFiles[pageFirstIdx + 2]);
                _ = this.changePage("confirm", {
                    text: "addplate Profile:" + this.profiles[this.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + targetFile,
                    confirmType: "addplate",
                    returnPage: "addPlate",
                    data0: this.profiles[this.pconfig.selectedIdx].ProfileID,
                    data1: targetPath,
                    data2: targetFile,
                    data3: this.current_page
                });
            }
        });

        this.addListener("click_b12", () => {
            if ((pageFirstIdx + 3) < availableFiles.length) {
                let targetPath = path.dirname(availableFiles[pageFirstIdx + 3]);
                let targetFile = path.basename(availableFiles[pageFirstIdx + 3]);
                _ = this.changePage("confirm", {
                    text: "addplate Profile:" + this.profiles[this.pconfig.selectedIdx].Title + ";Path:" + targetPath + ";File:" + targetFile,
                    confirmType: "addplate",
                    returnPage: "addPlate",
                    data0: this.profiles[this.pconfig.selectedIdx].ProfileID,
                    data1: targetPath,
                    data2: targetFile,
                    data3: this.current_page
                });
            }
        });

    }

    async list(fileIdx, files) {
        _ = this.setText("b9", files.length > fileIdx ? (fileIdx + 1) + '. ' + path.basename(files[fileIdx]) : "");
        _ = this.setText("b10", files.length > fileIdx + 1 ? (fileIdx + 2) + '. ' + path.basename(files[fileIdx + 1]) : "");
        _ = this.setText("b11", files.length > fileIdx + 2 ? (fileIdx + 3) + '. ' + path.basename(files[fileIdx + 2]) : "");
        _ = this.setText("b12", files.length > fileIdx + 3 ? (fileIdx + 4) + '. ' + path.basename(files[fileIdx + 3]) : "");
    }

    checkFile(filename) {
        let exts = this.config.fileExt.split("|");

        for (let i = 0; i < exts.length; ++i) {
            if (path.extname(filename).substr(1).toLowerCase() === exts[i].toLowerCase()) {
                return true;
            }
        }
        return false;

    }

    filterFile(file) {
        return this.checkFile(file) || this.config.showAll === "true";
    }

    completePath(file) {
        return this.tempPath + '/' + file;
    }
}
