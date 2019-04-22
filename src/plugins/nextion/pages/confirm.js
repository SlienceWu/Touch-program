import request from "request-promise-native";

require("babel-polyfill");
import abstract from "./abstract.js";
import fs from "fs";

let _ = null;

export default class Confirm extends abstract {

    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("confirm");
        await this.setText("t0", options.text);

        let disk = 3000;
        try{
            let diskFree = await this.nanoDLP.getIndex();
            if (diskFree.stat.DiskFree){
                disk = diskFree.stat.DiskFree;
                console.log("diskfree: " + disk);
            }
        }catch (e) {
            console.log("diskfree: " + e);
        }

        this.addListener("click_b1", () => {
            if ( options.confirmType === "deleteplate"){
                this.deleteJson(options.plateID);
            }
            if (disk < 500 && options.confirmType === "addplate"){
                _ = this.changePage("rom",{
                    "diskFree": disk,
                    confirmType: options.confirmType,
                    confirmResult: false,
                    data0: options.data0,
                    data1: options.data1,
                    data2: options.data2,
                    data3: options.data3
                });
            }else{
                if (options.confirmType === "addplate"){
                    _ = this.changePage("bar", {
                        confirmType: options.confirmType,
                        confirmResult: true,
                        data0: options.data0,
                        data1: options.data1,
                        data2: options.data2,
                        data3: options.data3
                    });
                }else{
                    _ = this.changePage(options.returnPage, {
                        confirmType: options.confirmType,
                        confirmResult: true,
                        data0: options.data0,
                        data1: options.data1,
                        data2: options.data2,
                        data3: options.data3
                    });
                }
            }
        });

        this.addListener("click_b2", () => {
            if (options.data1 === "stopSlice"){
                _ = this.changePage("slice",options.data2);
                return;
            }
            _ = this.changePage(options.returnPage, {
                confirmType: options.confirmType,
                confirmResult: false,
                data0: options.data0,
                data1: options.data1,
                data2: options.data2,
                data3: options.data3
            });
        });
    }

    async deleteJson(plateID){
        fs.readFile(`/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json`,async function(err,data){
            if(err){
                return console.error(error);
            }
            let plate = data.toString();
            plate = JSON.parse(plate);
            for(let i = 0; i < plate.data.length;i++) {
                if (plateID == plate.data[i].PlateID){
                    plate.data.splice(i,1);
                }
            }
            plate.total = plate.data.length;
            let str = JSON.stringify(plate);
            fs.writeFile(`/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json`,str,async function(err){
                if(err){
                    console.error(err);
                }
                console.log('----------删除成功-------------');
            })
        })
    }
}
