require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class Information extends abstract {

    constructor(screenManager) {
        super(screenManager);
    }

    async init() {
        await this.setScreen("information");

        this.addListener("click_b15", () => {
            _ = this.changePage("system");
        });

        this.ipState = "0";
        setTimeout(async () => {
            this.ipState = "2";
            await this.setText("t1", "----");
        },30000);
        /*let ip = require("ip");
        await this.setText("t1", ip.address());
        console.log((new Date()).toGMTString() + " IP Address: " + ip.address());*/
        this.addListener("click_b19", () => {
            _ = this.changePage("printingHome","back");
        });
    }

    async update(status) {
        _ = this.setText("t5", status.proc);
        _ = this.setText("t6", status.mem);
        _ = this.setText("t7", Math.ceil(parseInt(status.temp)) + "C");
        _ = this.setText("t8", status.disk);
        //_ = this.setText("t2", "cpu:" + status.proc + " mem:" + status.mem + " temp:" + Math.ceil(parseInt(status.temp)) + "C"); //
        let ip = require("ip");
        if (ip.address() === "127.0.0.1"){
            if (this.ipState !== "2"){
                this.ipState = "0";
                await this.setText("t1", "xxxx");
            }
        } else{
            this.ipState = "1";
            await this.setText("t1", ip.address() + "   ");
        }
    }
}