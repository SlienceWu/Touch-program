require("babel-polyfill");
import abstract from "./abstract.js";

let _ = null;

export default class ZAxis extends abstract {


    constructor(screenManager) {
        super(screenManager);

        this.currentButton = 8;
    }

    async init() {
        await this.setScreen("zAxis");
        this.upTime = 0;

        this.addListener("click_b17", () => {
            _ = this.changePage("settings");
        });
        this.addListener("click_b16", () => {
            _ = this.changePage("home");
        });
        this.addListener("click_b12", () => {
            if (this.currentButton === 7){
                this.timeout = 100;
            }else if (this.currentButton === 9){
                this.timeout = 1000;
            }else{
                this.timeout = 3000;
            }
            if (this.upTime === 0){
                setTimeout(() => {
                    this.upTime = 0;
                },this.timeout);
                this.upTime = this.upTime + 1;
                _ = this.up();
            }
        });
        this.addListener("click_b13", () => {
            if (this.currentButton === 7){
                this.timeout = 100;
            }else if (this.currentButton === 9){
                this.timeout = 1000;
            }else{
                this.timeout = 3000;
            }
            if (this.upTime === 0){
                setTimeout(() => {
                    this.upTime = 0;
                },this.timeout);
                this.upTime = this.upTime + 1;
                _ = this.down();
            }
        });
        this.addListener("click_b10", () => this.setBtn(10));
        this.addListener("click_b9", () => this.setBtn(9));
        this.addListener("click_b7", () => this.setBtn(7));
        this.addListener("click_b4", () => this.nanoDLP.command("/z-axis/bottom"));

        _ = this.setBtn(10);
    }

    async up() {
        _ = this.moveUp();
    }

    async down() {
        _ = this.moveDown();
    }

    async moveDown() {
        if (!this.setup) {
            this.setup = await this.nanoDLP.getSetup();
        }
        let currentMm = this.status.CurrentHeight / ((360 / this.setup.MotorDegree * this.setup.MicroStep) / this.setup.LeadscrewPitch);
        if (currentMm !== 0) {
            switch (this.currentButton) {
                case 11:
                    if (currentMm > 100) {
                        await this.nanoDLP.command(`/z-axis/move/down/micron/100000`);
                    } else {
                        this.nanoDLP.command("/z-axis/bottom");
                    }
                    break;
                case 10:
                    if (currentMm > 10) {
                        await this.nanoDLP.command(`/z-axis/move/down/micron/10000`);
                    } else {
                        this.nanoDLP.command("/z-axis/bottom");
                    }
                    break;
                case 9:
                    if (currentMm > 1) {
                        await this.nanoDLP.command(`/z-axis/move/down/micron/1000`);
                    } else {
                        this.nanoDLP.command("/z-axis/bottom");
                    }
                    break;
                case 8:
                    if (currentMm > 0.5) {
                        await this.nanoDLP.command(`/z-axis/move/down/micron/500`);
                    } else {
                        this.nanoDLP.command("/z-axis/bottom");
                    }
                    break;
                case 7:
                    if (currentMm > 0.1) {
                        await this.nanoDLP.command(`/z-axis/move/down/micron/100`);
                    } else {
                        this.nanoDLP.command("/z-axis/bottom");
                    }
                    break;
                case 6:
                    await this.nanoDLP.command(`/z-axis/move/down/pulse/100`);
                    break;
                case 5:
                    await this.nanoDLP.command(`/z-axis/move/down/pulse/10`);
                    break;
                case 2:
                    await this.nanoDLP.command(`/z-axis/move/down/pulse/1`);
                    break;
            }
        }
    }

    async moveUp() {
        if (!this.setup) {
            this.setup = await this.nanoDLP.getSetup();
        }
        let currentMm = this.status.CurrentHeight / ((360 / this.setup.MotorDegree * this.setup.MicroStep) / this.setup.LeadscrewPitch);
        currentMm = (currentMm < 0) ? 0 : Math.floor(currentMm * 10) / 10;
        let z = (150 - currentMm) * 1000;
        z = (z < 0) ? 0 : Math.floor(z * 10) / 10;
        if (currentMm >= 150){
            return;
        }
        switch (this.currentButton) {
            case 11:
                await this.nanoDLP.command(`/z-axis/move/up/micron/100000`);
                break;
            case 10:
                if (currentMm > 140){
                    await this.nanoDLP.command("/z-axis/move/up/micron/" + z);
                }else{
                    await this.nanoDLP.command(`/z-axis/move/up/micron/10000`);
                }
                break;
            case 9:
                if (currentMm > 149){
                    await this.nanoDLP.command("/z-axis/move/up/micron/" + z);
                }else{
                    await this.nanoDLP.command(`/z-axis/move/up/micron/1000`);
                }
                break;
            case 8:
                await this.nanoDLP.command(`/z-axis/move/up/micron/500`);
                break;
            case 7:
                await this.nanoDLP.command(`/z-axis/move/up/micron/100`);
                break;
            case 6:
                await this.nanoDLP.command(`/z-axis/move/up/pulse/100`);
                break;
            case 5:
                await this.nanoDLP.command(`/z-axis/move/up/pulse/10`);
                break;
            case 2:
                await this.nanoDLP.command(`/z-axis/move/up/pulse/1`);
                break;
        }
    }

    async setBtn(id) {
        await this.nextion.setValue(`bt${this.currentButton}`, 0);
        this.currentButton = id;
        await this.nextion.setValue(`bt${this.currentButton}`, 1);
    }


    async update(status) {
        this.status = status;

        if (!this.setup) {
            this.setup = await this.nanoDLP.getSetup();
        }

        let currentMm = status.CurrentHeight / ((360 / this.setup.MotorDegree * this.setup.MicroStep) / this.setup.LeadscrewPitch);
        currentMm = (currentMm < 0) ? 0 : Math.floor(currentMm * 10) / 10;
        //currentMm = (currentMm < 0) ? 0 : ((currentMm > 150) ? 150 : Math.floor(currentMm * 10) / 10);
        await this.setText("t1", currentMm + "mm");
    }
}
