import request from "request-promise-native";

require("babel-polyfill");
import abstract from "./abstract.js";
import fs from "fs";

let _ = null;

export default class SetModel extends abstract {

    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("setmodel");
        if (options.Processed){
            await this.setText("t11","yes");
        }else{
            await this.setText("t11","no");
        }
        await this.isExist(options,this);
        this.serverURL = global.SERVER_URL;

        if (options.Preview){
            let image = await request({ url: `${this.serverURL}/static/plates/${options.PlateID}/3d.png`, encoding: null });
            await this.nextion.displayImage(image);
        }

        this.addListener("click_b1", () => {
            this.saveXYZ(options);
        });
        this.addListener("click_b2", () => {
            _ = this.requestTest(`${this.serverURL}/plate/regenerate`,{"PlateID": options.PlateID,"XRes": this.XRes,"YRes": this.YRes,"ZRes": this.ZRes});
            _ = this.changePage("slice",options);
        });
        this.addListener("click_b3", () => {
            _ = this.changePage("plates",{type:"stl",PlateID:options.PlateID});
        });

        this.addListener("click_b4", async () => {
            if (options.Processed){
                await this.nanoDLP.command("/printer/start/" + options.PlateID);
            }
        });
        this.addListener("click_b5", async () => {
            _ = this.changePage("confirm", {
                text: "delete plate:" + options.Path,
                confirmType: "deleteplate",
                data0: options.PlateID,
                returnPage: "plates"
            });
        });
    }

    async requestTest(url, data) {
        return request.post({
            uri: url,
            form: data,
            headers:  { Cookie: `${this.auth ?  this.session : ""}`},
            timeout: 3000
        });
    }

    async saveXYZ(options){
        let x = await this.getValue("x");
        let y = await this.getValue("y");
        let z = await this.getValue("z");

        this.XRes = await this.transform(options,x,"x");
        this.YRes = await this.transform(options,y,"y");
        this.ZRes = await this.transform(options,z,"z");
        let params = {
            "PlateID": options.PlateID,
            "XRes": this.XRes,
            "YRes": this.YRes,
            "ZRes": this.ZRes
        };
        this.writeJson(params);
    }

    async writeJson(params){ //先将json文件读出来
        fs.readFile(`/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json`,async function(err,data){
            if(err){
                return console.error(err);
            }
            let plate = data.toString();
            plate = JSON.parse(plate);
            for(let i = 0; i < plate.data.length;i++){
                if(params.PlateID == plate.data[i].PlateID){
                    console.log('id is exist');
                    for(let key in params){
                        if(plate.data[i][key]){
                            plate.data[i][key] = params[key];
                        }
                    }
                    let str = JSON.stringify(plate);
                    fs.writeFile(`/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json`,str,async function(err){
                        if(err){
                            console.error(err);
                        }
                        console.log('----------修改成功-------------');
                    });
                    return;
                }
            }
            plate.data.push(params);
            plate.total = plate.data.length;
            let str = JSON.stringify(plate);
            fs.writeFile(`/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json`,str,async function(err){
                if(err){
                    console.error(err);
                }
                console.log('----------新增成功-------------');
            })
        });
    }

    async isExist(options,_this){
        fs.readFile(`/home/pi/nextion/bin/plugins/nextion/pages/setmodel.json`,async function(err,data){
            if(err){
                console.error(err);
            }
            let plate = data.toString();
            plate = JSON.parse(plate);
            for(let i = 0; i < plate.data.length;i++){
                if(options.PlateID == plate.data[i].PlateID){
                    console.log('set is Exist');
                    _this.setText("t1", await _this.transform(options, plate.data[i].XRes, "x"));
                    _this.setText("t2", await _this.transform(options, plate.data[i].YRes, "y"));
                    _this.setText("t3", await _this.transform(options, plate.data[i].ZRes, "z"));
                    _this.XRes = plate.data[i].XRes;
                    _this.YRes = plate.data[i].YRes;
                    _this.ZRes = plate.data[i].ZRes;
                    return;
                }
            }
            _this.setText("t1", (options.Boundries.Xmax - options.Boundries.Xmin));
            _this.setText("t2", (options.Boundries.Ymax - options.Boundries.Ymin));
            _this.setText("t3", (options.Boundries.Zmax - options.Boundries.Zmin));
            _this.XRes = options.XRes;
            _this.YRes = options.YRes;
            _this.ZRes = options.ZRes;
        })
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
    
    async transform(options, va, str){
        if ( str === "x"){
            let x = options.Boundries.Xmax - options.Boundries.Xmin;
            let xr = options.XRes;
            let xReal = (xr * x) / va;
            return xReal;
        } else if ( str === "y" ){
            let y = options.Boundries.Ymax - options.Boundries.Ymin;
            let yr = options.YRes;
            let yReal = (yr * y) / va;
            return yReal;
        } else {
            let z = options.Boundries.Zmax - options.Boundries.Zmin;
            let zr = options.ZRes;
            let zReal = (zr * z) / va;
            return zReal;
        }
    }
}