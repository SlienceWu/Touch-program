require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class Settings extends abstract {

    constructor(screenManager) {
        super(screenManager);
    }

    async init() {
        await this.setScreen("settings");

        this.addListener("click_b4", () => {
            _ = this.changePage("home");
        });
        this.addListener("click_b2", () => {
            _ = this.changePage("zAxis");
        });
        this.addListener("click_b3", () => {
            _ = this.changePage("projector");
        });
        this.addListener("click_b5", () => {
            _ = this.changePage("config");
        });
        this.addListener("click_b19", () => {
            _ = this.changePage("printingHome","back");
        });
    }
}
