require("babel-polyfill");

const fs = require("fs");

import abstract from "./abstract.js";
import lodash from "lodash";
import config from "../../../../config.json";

let _ = null;

export default class Plate extends abstract {


    constructor(screenManager) {
        super(screenManager);
    }

    async init(plate) {
        await this.setScreen("plate");

        this.plate = plate;
        this.profiles = await this.nanoDLP.getProfiles();

        this.imageX = 0x48;//0x1E;
        this.imageY = 0x18;//0x3C;
        this.imageWidth = 0xb3;

        _ = this.setText("t0", this.plate.Path);
        _ = this.setText("t1", this.profiles[lodash.findIndex(this.profiles, {ProfileID:this.plate.ProfileID})].Title);
        _ = this.setText("t7", `${this.plate.LayersCount} layers`);

        console.log("Printing Ready -- Plate ID: " + this.plate.PlateID + ", Plate Name: " + this.plate.Path, ", Profile ID: " + this.plate.ProfileID);

        this.addListener("click_b1",() => {
            _ = this.changePage("home");
        });
        this.addListener("click_b2", () => {
            if (plate.Type === "stl"){
                _ = this.changePage("plates",{
                    type: "stl",
                    PlateID: plate.PlateID
                });
            }else{
                _ = this.changePage("plates",{
                    type: "zip",
                    PlateID: plate.PlateID
                });
            }
        });

        this.addListener("click_b9", async () => {
            await this.nanoDLP.command("/printer/start/" + this.plate.PlateID);
        });

        this.addListener("click_b15", async () => {
            _ = this.changePage("confirm", {
                text: "delete plate:" + this.plate.Path,
                confirmType: "deleteplate",
                data0: this.plate.PlateID,
                returnPage: "plates"
            });
        });

        this.gap = 100 / (this.plate.LayersCount);

        this.addListener("number", (index) => {
            index = Math.floor((index) / this.gap);
            _ = this.setLayer(index);
        });

        await this.setLayer(1);
    }

    async setLayer(index) {
        this.index = index === 0 ? 1 : index;
        await this.setText("t12", `Loading ${this.index}/${this.plate.LayersCount}`);
        let image = await this.nanoDLP.getCurrentPlateLayer(this.plate.PlateID, this.index);
        if (this.enabled) {
            await this.nextion.displayBlackWhiteImage(image, this.imageX, this.imageY, this.imageWidth).catch(e => console.error(e));
        }
    }
}
