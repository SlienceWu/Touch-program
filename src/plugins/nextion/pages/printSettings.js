require("babel-polyfill");

import abstract from "./abstract.js";
import lodash from "lodash";

let _ = null;

export default class PrintSettings extends abstract {

    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("prtSettings");

        try {
            if (options && options.confirmResult && options.confirmResult) {
                switch (options.confirmType) {
                    case "pause":
                        this.nanoDLP.pause();
                        _ = this.changePage("home");
                        break;

                    case "stop":
                        this.nanoDLP.stop();
                        _ = this.changePage("home");
                        break;
                }
            }
        } catch (e) {
        }

        this.addListener("click_b4", () => {
            _ = this.changePage("home");
        });

        this.addListener("click_b3", () => {
            _ = this.changePage("confirm", {
                text: "Are you sure you want to pause\r printing?\rIt will pause after the current\rlayer completed."
                , confirmType: "pause"
                , returnPage: "printSettings"
            })
        });

        this.addListener("click_b2", () => {
            _ = this.changePage("confirm", {
                text: "Are you sure you want to stop\r printing?\rIt will stop after the current\rlayer completed."
                , confirmType: "stop"
                , returnPage: "printSettings"
            });
        });

        this.addListener("string", async (string) => {
            this.history = {};

            if (string !== "cancel") {
                this.profile.CureTime = Number(string);
                this.nanoDLP.setCureTime(this.profile.ProfileID, this.profile);
                _ = this.changePage("home");
            }
        });

        this.setCureTime = false;
    }

    async update(status) {
        this.status = status;

        if (this.setCureTime === false) {
            this.setCureTime = true;
            this.plates = await this.nanoDLP.getPlates();
            this.plate = this.plates[lodash.findIndex(this.plates, {PlateID: this.status.PlateID})];

            this.profiles = await this.nanoDLP.getProfiles();
            this.profile = this.profiles[lodash.findIndex(this.profiles, {ProfileID: this.plate.ProfileID})];
        }
    }

}
