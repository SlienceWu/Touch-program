require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class Projector extends abstract {


    constructor(screenManager) {
        super(screenManager);
    }

    async init() {
        await this.setScreen("projector");

        if (!this.profiles) {
            this.profiles = await this.nanoDLP.getProfiles();
        }

        this.addListener("click_b3", () => {
            this.nanoDLP.command("/projector/blank");
            _ = this.changePage("settings");
        });
        this.addListener("click_b2", () => {
            this.nanoDLP.command("/projector/blank");
            _ = this.changePage("home");
        });

        this.addListener("click_b7", () => {
            if (!this.status.Projecting) {
                this.nanoDLP.command("/projector/generate/white");
                _ = this.setText("b22", this.status.Projecting);
            }
        });
        this.addListener("click_b6", () => {
            if (this.status.Projecting) {
                this.nanoDLP.command("/projector/blank");
                _ = this.setText("b22", this.status.Projecting);
            }
        });
        /*this.addListener("click_b6", () => {
            if (this.status.Projecting) {
                this.nanoDLP.command("/projector/blank");
            } else {
                this.nanoDLP.command("/projector/generate/white");
            }
            _ = this.setText("b22", this.status.Projecting);
        });*/
    }

    async update(status) {
        this.status = status;
    }
}
