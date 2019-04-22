import request from "request-promise-native";

require("babel-polyfill");
import abstract from "./abstract.js";

let _ = null;

export default class Rom extends abstract {

    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("rom");
        await this.setText("t1", options.diskFree + "M");
        //this.nextion.displayImage(await request({ url: "http://192.168.2.118/static/plates/11/10.png", encoding: null }));

        this.addListener("click_b1", () => {
            _ = this.changePage("addPlate");
        });
    }

}