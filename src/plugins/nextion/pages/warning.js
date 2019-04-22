import request from "request-promise-native";

require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class Warning extends abstract {
    constructor(screenManager) {
        super(screenManager);
    }

    async init(options){
        await this.setScreen("warning");

        this.addListener("click_b1", () =>{
            _ = this.changePage("plates");
        });
    }
}