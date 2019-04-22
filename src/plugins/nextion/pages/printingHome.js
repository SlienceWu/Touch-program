require("babel-polyfill");

import abstract from "./abstract.js";
import config from "../../../../config.json";

let _ = null;

export default class PrintingHome extends abstract {


    constructor(screenManager) {
        super(screenManager);
        this.isPause = null;
        this.isLifted = false;
    }

    async init(options) {
        if (!this.setup) {
            this.setup = await this.nanoDLP.getSetup();
        }

        if (!this.status) {
            this.status = await this.nanoDLP.getStatus();
        }

        try {
            if (options && options.confirmResult && options.confirmResult) {
                switch (options.confirmType) {
                    case "pause":
                        this.nanoDLP.pause();
                        break;

                    case "stop":
                        this.nanoDLP.stop();
                        _ = this.changePage("home");
                        break;
                }
            }
        } catch (e) {
        }
        console.log("printing status :"+this.status.Printing);
        this.addListener("click_b3", async () => {
            console.log("-----------------pause");
            if (this.isPause) {
                if (this.isLifted) {
                    await this.nanoDLP.command(`/z-axis/move/down/micron/` + this.liftedHeight);
                    this.isLifted = false;
                }
                this.manager.nanoDLP.unpause();
            } else {
                _ = this.changePage("confirm", {
                    text: "pause"
                    , confirmType: "pause"
                    , returnPage: "printingHome"
                })
            }
        });

        this.addListener("click_b2", () => {
            console.log("-----------------stop");
            _ = this.changePage("confirm", {
                text: "stop"
                , confirmType: "stop"
                , returnPage: "printingHome"
            });
        });

        this.addListener("click_b1", () => {
            _ = this.changePage("home");
        });

        this.addListener("click_b19", () => {
            _ = this.changePage("plates");
        });
    }

    async update(status, log) {
        if (!status.Printing) {
            return this.changePage("home");
        }

        this.imageX = 0x5C;//0x08;
        this.imageY = 0x12;//0x3C;
        this.imageWidth = 0x89;

        if (this.isPause == null || this.isPause !== status.Pause) {
            this.isPause = status.Pause;
            await this.setScreen("printing");
            if (this.isPause) {
                await this.setValue("b3", 1);
            } else {
                await this.setValue("b3", 0);
            }
        }

        if (!this.setup) {
            this.setup = await this.nanoDLP.getSetup();
        }

        let currentMm = status.CurrentHeight / ((360 / this.setup.MotorDegree * this.setup.MicroStep) / this.setup.LeadscrewPitch);
        if (currentMm < 0) {
            currentMm = 0;
        }


        if (this.isPause && log.msg.indexOf("Position set to") !== -1) {
            this.liftedHeight = Math.floor((150 - currentMm) * 1000 * 10) / 10;
            await this.nanoDLP.command(`/z-axis/move/up/micron/` + this.liftedHeight);
            this.isLifted = true;
        }

        let reg = /Curing for (\d+\.\d+) seconds/;
        let result = log.msg.match(reg);
        if (result !== null) {
            log.msg = "Curing for " + Math.floor(parseFloat(result[1])) + " seconds";
        }

        await this.setText("t6", this.isPause ? "Pause" : "Printing");

        this.config = config.plugins.profiles;

        if (!this.profiles) {
            this.profiles = await this.nanoDLP.getProfiles();
        }
        let targetProfile = this.profiles[this.config.selectedIdx];

        var remaining_time = Math.round((status.LayersCount - status.LayerID) * (targetProfile.CureTime + 5) / 60);
        var total_time = Math.round(status.LayersCount * (targetProfile.CureTime + 5) / 60);

        await this.setText("t0", status.LayerID + "/" + status.LayersCount);
        await this.setValue("j0", Math.floor((status.LayerID / status.LayersCount) * 100));
        await this.setText("t1", remaining_time + "/" + total_time + "m");
        await this.setText("t2", log.msg);
        await this.setText("t7", status.Path);

        if (this.history.layer !== status.LayerID) {
            this.history.layer = status.LayerID;
            let image = await this.nanoDLP.getCurrentPlateLayer(status.PlateID, status.LayerID);
            if (this.enabled) {
                await this.nextion.displayBlackWhiteImage(image, this.imageX, this.imageY, this.imageWidth).catch(e => console.error(e));
            }
        }

    }
}
