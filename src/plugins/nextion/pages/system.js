require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class System extends abstract {

    constructor(screenManager) {
        super(screenManager);
    }

    async init() {
        await this.setScreen("system");

        this.addListener("click_b14", () => {
            _ = this.changePage("home");
        });

        this.addListener("click_b11", () => {
            _ = this.changePage("information");
        });

        this.addListener("click_b19", () => {
            _ = this.changePage("printingHome","back");
        });
    }
}
