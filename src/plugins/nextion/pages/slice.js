import request from "request-promise-native";

require("babel-polyfill");
import abstract from "./abstract.js";

let _ = null;

export default class Slice extends abstract{

    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("slice");
        let _this = this;
        this.sliceCheck = setInterval( ()=> {
            _this.reqSlice(options);
        },1000);

        this.addListener("click_b1", () => {
            clearInterval(this.sliceCheck);
            _ = this.changePage("confirm", {
                text: "slice",
                confirmType: "deleteplate",
                data0: options.PlateID,
                data1: "stopSlice",
                data2: options,
                returnPage: "plates"
            });
        });
    }

    async reqSlice(options){
        let data = await this.nanoDLP.getSlice();
        //data.percentage === "100" &&
        if (data.running === "0"){
            clearInterval(this.sliceCheck);
            options.LayersCount = data.layerCount;
            this.changePage("plate",options);
        }else if (data.percentage === "100" && data.running === "1"){
            this.setText("t1", 0 + "%");
            this.setText("t2", 0 + "/" + options.LayersCount);
        }else{
            this.setText("t1", data.percentage + "%");
            this.setText("t2", data.layerID + "/" + data.layerCount);
        }
    }

    async update(status){
        _ = this.setText("t3", "cpu:" + status.proc + " mem:" + status.mem + " temp:" + Math.ceil(parseInt(status.temp)) + "C"); //
    }
}