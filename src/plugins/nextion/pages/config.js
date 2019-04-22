require("babel-polyfill");
const fs = require("fs");

import abstract from "./abstract";

let _ = null;

export default class Config extends abstract {

    constructor(screenManager) {
        super(screenManager);

        this.selectedIdx = 0;
    }

    async init() {
        await this.setScreen("config");

        if (!this.profiles) {
            this.profiles = await this.nanoDLP.getProfiles();
        }
        let targetProfile = this.profiles[this.selectedIdx];

        _ = this.setText("t1", targetProfile.Title);
        _ = this.setText("t2", targetProfile.SupportLayerNumber);
        _ = this.setText("t3", targetProfile.SupportCureTime);
        _ = this.setText("t4", targetProfile.Depth);
        _ = this.setText("t5", targetProfile.CureTime);

        this.addListener("click_b0", async () => {
            this.selectedIdx = (this.selectedIdx - 1 + this.profiles.length) % this.profiles.length;
            this.indexChange();
        });

        this.addListener("click_b1", async () => {
            this.selectedIdx = (this.selectedIdx + 1) % this.profiles.length;
            this.indexChange();
        });

        this.addListener("click_b2", async () => {
            let profiles = JSON.parse(fs.readFileSync("/home/pi/printer/db/profiles.json"));
            profiles[this.selectedIdx].SupportLayerNumber = await this.nextion.getValue("t2.r");
            profiles[this.selectedIdx].SupportCureTime = await this.nextion.getValue("t3.r");
            profiles[this.selectedIdx].CureTime = await this.nextion.getValue("t5.r");
            fs.writeFileSync("/home/pi/printer/db/profiles.json", JSON.stringify(profiles));
            console.log("Save profile -- SupportLayerNumber: " + profiles[this.selectedIdx].SupportLayerNumber + ", SupportCureTime: " + profiles[this.selectedIdx].SupportCureTime + ", CureTime: " + profiles[this.selectedIdx].CureTime);
        });

        this.addListener("click_b3", async () => {
            this.changePage("home");
        });

        this.addListener("click_b4", async () => {
            this.changePage("settings");
        });

        this.addListener("click_b5", async () => {
            let initProfiles = JSON.parse(fs.readFileSync("/home/pi/printer/db/initProfiles.json"));
            _ = this.setText("t2", initProfiles[this.selectedIdx].SupportLayerNumber);
            _ = this.setText("t3", initProfiles[this.selectedIdx].SupportCureTime);
            _ = this.setText("t5", initProfiles[this.selectedIdx].CureTime);

            let profiles = JSON.parse(fs.readFileSync("/home/pi/printer/db/profiles.json"));
            profiles[this.selectedIdx].SupportLayerNumber = await this.nextion.getValue("t2.r");
            profiles[this.selectedIdx].SupportCureTime = await this.nextion.getValue("t3.r");
            profiles[this.selectedIdx].CureTime = await this.nextion.getValue("t5.r");
            fs.writeFileSync("/home/pi/printer/db/profiles.json", JSON.stringify(profiles));
        });
    }

    async indexChange(){
        this.profiles = await this.nanoDLP.getProfiles();

        let targetProfile = this.profiles[this.selectedIdx];

        _ = this.setText("t1", targetProfile.Title);
        _ = this.setText("t2", targetProfile.SupportLayerNumber);
        _ = this.setText("t3", targetProfile.SupportCureTime);
        _ = this.setText("t4", targetProfile.Depth);
        _ = this.setText("t5", targetProfile.CureTime);
    }
    async update(status) {
        /*this.profiles = await this.nanoDLP.getProfiles();

        let targetProfile = this.profiles[this.selectedIdx];

        _ = this.setText("t1", targetProfile.Title);
        _ = this.setText("t2", targetProfile.SupportLayerNumber);
        _ = this.setText("t3", targetProfile.SupportCureTime);
        _ = this.setText("t4", targetProfile.Depth);
        _ = this.setText("t5", targetProfile.CureTime);*/
    }
}