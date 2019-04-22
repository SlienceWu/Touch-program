import request from "request-promise-native";

require("babel-polyfill");

import abstract from "./abstract.js";
const fs = require("fs");

let _ = null;

export default class Bar extends abstract {
    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("bar");
        let _this = this;
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
                let last = targetFile.toLowerCase().slice(-3);
                if (last.indexOf("zip") !== -1){
                    let num = 0;
                    this.prog = setInterval( () => {
                        num = num + 20;
                        _this.setText("t1",num);
                        if (num >= 100){
                            clearInterval(_this.prog);
                            return _this.changePage("plates");
                        }
                    },2000);
                    return;
                }
                this.num = 0;
                this.lastLog = "";
                this.prog = setInterval(() => {
                    _this.progress();
                },2000);
            }
        }
    }

    async progress(){
        this.log = await this.nanoDLP.getLog();
        let logArr = this.log.split("\n");
        let msg = logArr[logArr.length-1];
        //console.log(msg);
        if (msg.indexOf("Plate file being processed") !== -1){
            if (this.lastLog !== msg){
                this.lastLog = msg;
                this.num = this.num + 10;
                return this.setText("t1",this.num);
            }
        }else if (msg.indexOf("Plate copied") !== -1){
            if (this.lastLog !== msg){
                this.lastLog = msg;
                this.num = this.num + 10;
                return this.setText("t1",this.num);
            }
        }else if (msg.indexOf("Plate has been added") !== -1){
            if (this.lastLog !== msg){
                this.lastLog = msg;
                this.num = this.num + 10;
                return this.setText("t1",this.num);
            }
        }else if (msg.indexOf("Plate file has been uploaded") !== -1){
            if (this.lastLog !== msg){
                this.lastLog = msg;
                this.num = this.num + 10;
                return this.setText("t1",this.num);
            }
        }else if (msg.indexOf("Generating plate 3D preview") !== -1){
            if (this.lastLog !== msg){
                this.lastLog = msg;
                this.num = this.num + 40;
                return this.setText("t1",this.num);
            }
        }else if (msg.indexOf("Timeout on 3D preview generator") !== -1){
            this.setText("t1",100);
            clearInterval(this.prog);
            return this.changePage("warning");
        }else if (msg.indexOf("3D preview has been generated") !== -1){
            this.setText("t1",100);
            clearInterval(this.prog);
            return this.changePage("plates");
        }
    }
}