require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class Nooperation extends abstract {
    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("nooperation");

        this.addListener("click_b1", () => {
            if (options){
                _ = this.changePage(options);
            }
        });
    }
}