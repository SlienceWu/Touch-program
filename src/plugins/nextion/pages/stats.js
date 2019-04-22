require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class Stats extends abstract {

    constructor(screenManager) {
        super(screenManager)
    }

    async init() {
        await this.setScreen("stats");

        this.addListener("click_b11", () => {
            _ = this.changePage("home");
        });
    }

    async update(status) {
        _ = this.setText("t1", status.proc);
        _ = this.setText("t2", status.mem);
        _ = this.setText("t5", Math.ceil(parseInt(status.temp)) + "°C");

        _ = this.nextion.addToWaveForm(3, 0, parseInt(status.proc));
        _ = this.nextion.addToWaveForm(5, 0, parseInt(status.mem));
        _ = this.nextion.addToWaveForm(6, 0, Math.ceil(parseInt(status.temp)));
    }
}
