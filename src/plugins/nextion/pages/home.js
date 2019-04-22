import request from "request-promise-native";

require("babel-polyfill");
import abstract from "./abstract.js";
import gconfig from "../../../../config";

let _ = null;

export default class Home extends abstract {


    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("home");

        if (options) {
            if (options.confirmResult) {
                if (options.confirmType === "shutdown") {
                    let exec1 = require('child_process').exec;
                    _ = this.setScreen("progress");
                    exec1("shutdown now");
                    return;
                }
            }
            if (options.confirmResult) {
                if (options.confirmType === "reboot") {
                    let exec2 = require('child_process').exec;
                    _ = this.setScreen("progress");
                    exec2("shutdown -r now");
                    return;
                }
            }
        }

        this.addListener("click_b3", () => {
            _ = this.changePage("settings");
        });

        this.addListener("click_b1", () => {
            //console.log(234213421);
            _ = this.changePage("plates");
        });

        this.addListener("click_b8", () => {
            _ = this.changePage("system");
        });

        this.addListener("click_b19", () => {
            _ = this.changePage("printingHome","back");
        });
    }

    async update(status, log) {
        /*if (status.Printing) {
            return this.changePage("home");
        }*/
    }
}
