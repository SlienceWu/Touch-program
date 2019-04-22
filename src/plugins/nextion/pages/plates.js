import request from "request-promise-native";

require("babel-polyfill");

import abstract from "./abstract.js";

let _ = null;

export default class Plates extends abstract {
    constructor(screenManager) {
        super(screenManager);
    }

    async init(options) {
        await this.setScreen("plates");

        if (options && options.confirmResult) {
            if (options.confirmType === "deleteplate" && options.data0) {
                await this.nanoDLP.command("/plate/delete/" + options.data0);
            }
        }

        this.addListener("click_b2", () => {
            console.log("plates click home");
            _ = this.changePage("home");
        });
        this.addListener("click_b9", () => {
            console.log("plates click addPlate");
            _ = this.changePage("addPlate");
        });
        this.addListener("click_b12", () => {
            console.log("refresh plates");
            _ = this.init(options);
        });

        this.platesIndex = await this.nanoDLP.getPlatesIndex();
        this.platesAll = this.platesIndex.Plates;
        this.platesStl = [];
        this.platesZip = [];
        if (this.platesAll === undefined){
            this.platesAll = [];
        }else{
            for(let i=0;i<this.platesAll.length;i++){
                if (this.platesAll[i].Type === "stl"){
                    this.platesStl.push(this.platesAll[i]);
                }else{
                    this.platesZip.push(this.platesAll[i]);
                }
            }
        }

        if (options && options.type){
            if (options.type === "stl"){
                this.current_page_type = "stl";
                this.current_page_zip = 1;
                if (options.PlateID){
                    let a = 0;
                    for (let i=0;i<this.platesStl.length;i++){
                        if (this.platesStl[i].PlateID === options.PlateID){
                            a = i;
                            break;
                        }
                    }
                    this.current_page_stl = Math.ceil((a + 1) / 4.0);
                }else{
                    this.current_page_stl = 1;
                }
            }else{
                this.current_page_type = "zip";
                this.current_page_stl = 1;
                if (options.PlateID){
                    let a = 0;
                    for (let i=0;i<this.platesZip.length;i++){
                        if (this.platesZip[i].PlateID === options.PlateID){
                            a = i;
                            break;
                        }
                    }
                    this.current_page_zip = Math.ceil((a + 1) / 4.0);
                }else{
                    this.current_page_zip = 1;
                }
            }
        }else{
            this.current_page_type = "zip";
            this.current_page_stl = 1;
            this.current_page_zip = 1;
        }
        this.page_count_stl = Math.ceil(this.platesStl.length / 4.0);
        this.page_count_zip = Math.ceil(this.platesZip.length / 4.0);

        //this.plates = await this.nanoDLP.getPlates();
        /*if (this.plates === undefined) {
            this.plates = [];
            _ = this.changePage("home");
        }*/

        //this.current_page = 1;
        //this.page_count = Math.ceil(this.plates.length / 5.0);

        this.addListener("click_b4", () => {
            if (this.current_page_type === "stl"){
                if (this.currentIndex < this.platesStl.length) _ = this.changePage("setmodel",this.platesStl[this.currentIndex]);
            }else{
                if (this.currentIndex < this.platesZip.length) _ = this.changePage("plate", this.platesZip[this.currentIndex]);
            }
        });
        this.addListener("click_b5", () => {
            //if ((this.currentIndex + 1) < this.plates.length) _ = this.changePage("plate", this.plates[this.currentIndex + 1]);

            if (this.current_page_type === "stl"){
                if (this.currentIndex + 1 < this.platesStl.length) _ = this.changePage("setmodel",this.platesStl[this.currentIndex + 1]);
            }else{
                if (this.currentIndex + 1 < this.platesZip.length) _ = this.changePage("plate", this.platesZip[this.currentIndex + 1]);
            }
        });
        this.addListener("click_b6", () => {

            if (this.current_page_type === "stl"){
                if (this.currentIndex + 2 < this.platesStl.length) _ = this.changePage("setmodel",this.platesStl[this.currentIndex + 2]);
            }else{
                if (this.currentIndex + 2 < this.platesZip.length) _ = this.changePage("plate", this.platesZip[this.currentIndex + 2]);
            }
        });
        this.addListener("click_b7", () => {

            if (this.current_page_type === "stl"){
                if (this.currentIndex + 3 < this.platesStl.length) _ = this.changePage("setmodel",this.platesStl[this.currentIndex + 3]);
            }else{
                if (this.currentIndex + 3 < this.platesZip.length) _ = this.changePage("plate", this.platesZip[this.currentIndex + 3]);
            }
        });
        this.addListener("click_b8", () => {

            if (this.current_page_type === "stl"){
                if (this.currentIndex + 4 < this.platesStl.length) _ = this.changePage("setmodel",this.platesStl[this.currentIndex + 4]);
            }else{
                if (this.currentIndex + 4 < this.platesZip.length) _ = this.changePage("plate", this.platesZip[this.currentIndex + 4]);
            }
        });
        

        this.addListener("click_b10", () => {
            //this.current_page = ((this.current_page - 2 + this.page_count) % this.page_count) + 1;
            //_ = this.updateList((this.current_page - 1) * 5);
            //_ = this.setText("t13", this.current_page + '/' + this.page_count);

            if (this.current_page_type === "stl"){
                this.current_page_stl = ((this.current_page_stl - 2 + this.page_count_stl) % this.page_count_stl) + 1;
                _ = this.updateListAll((this.current_page_stl - 1) * 4, "stl");
                _ = this.setText("t13", this.current_page_stl + '/' + this.page_count_stl);
            }else{
                this.current_page_zip = ((this.current_page_zip - 2 + this.page_count_zip) % this.page_count_zip) + 1;
                _ = this.updateListAll((this.current_page_zip - 1) * 4, "zip");
                _ = this.setText("t13", this.current_page_zip + '/' + this.page_count_zip);
            }
        });

        this.addListener("click_b11", () => {
            //this.current_page = (this.current_page % this.page_count) + 1;
            //_ = this.updateList((this.current_page - 1) * 5);
            //_ = this.setText("t13", this.current_page + '/' + this.page_count);

            if (this.current_page_type === "stl"){
                this.current_page_stl = (this.current_page_stl % this.page_count_stl) + 1;
                _ = this.updateListAll((this.current_page_stl - 1) * 4, "stl");
                _ = this.setText("t13", this.current_page_stl + '/' + this.page_count_stl);
            }else{
                this.current_page_zip = (this.current_page_zip % this.page_count_zip) + 1;
                _ = this.updateListAll((this.current_page_zip - 1) * 4, "zip");
                _ = this.setText("t13", this.current_page_zip + '/' + this.page_count_zip);
            }
        });

        /*this.addListener("click_b12", async () => {
            this.plates = await this.nanoDLP.getPlates();

            if (this.plates === undefined) {
                _ = this.changePage("home");
            }

            this.current_page = 1;
            this.page_count = Math.ceil(this.plates.length / 5.0);
            _ = this.setText("t13", this.current_page + '/' + this.page_count);
            _ = this.updateList(0);
        });*/

        this.addListener("click_b14", async () => {
            if (this.current_page_type === "zip"){
                return;
            }
            this.current_page_type = "zip";
            _ = this.setText("t13", this.current_page_zip + '/' + this.page_count_zip);
            _ = this.updateListAll(0, "zip");
        });

        this.addListener("click_b15", async () =>
            if (this.current_page_type === "stl"){
                return;
            }
            this.current_page_type = "stl";
            _ = this.setText("t13", this.current_page_stl + '/' + this.page_count_stl);
            _ = this.updateListAll(0, "stl");
        });

        //_ = this.setText("t13", this.current_page + '/' + this.page_count);
        //_ = this.updateList(0);

        if (options && options.type){
            if (options.type === "stl"){
                _ = this.setText("t13", this.current_page_stl + '/' + this.page_count_stl);
                _ = this.updateListAll((this.current_page_stl - 1) * 4, "stl");
            }else{
                _ = this.setText("t13", this.current_page_zip + '/' + this.page_count_zip);
                _ = this.updateListAll((this.current_page_zip - 1) * 4, "zip");
            }
        }else{
            _ = this.setText("t13", this.current_page_zip + '/' + this.page_count_zip);
            _ = this.updateListAll(0, "zip");
        }

        this.addListener("click_b19", () => {
            _ = this.changePage("printingHome","back");
        });
    }

    async updateList(pageFirstIdx) {
        this.currentIndex = pageFirstIdx;
        _ = this.setText("b4", this.plates.length > pageFirstIdx ? (pageFirstIdx + 1) + ". " + this.plates[pageFirstIdx].Path : "");
        _ = this.setText("b5", this.plates.length > pageFirstIdx + 1 ? (pageFirstIdx + 2) + ". " + this.plates[pageFirstIdx + 1].Path : "");
        _ = this.setText("b6", this.plates.length > pageFirstIdx + 2 ? (pageFirstIdx + 3) + ". " + this.plates[pageFirstIdx + 2].Path : "");
        _ = this.setText("b7", this.plates.length > pageFirstIdx + 3 ? (pageFirstIdx + 4) + ". " + this.plates[pageFirstIdx + 3].Path : "");
        _ = this.setText("b8", this.plates.length > pageFirstIdx + 4 ? (pageFirstIdx + 5) + ". " + this.plates[pageFirstIdx + 4].Path : "");
    }

    async updateListAll(pageFirstIdx, type){
        this.platesIndex = await this.nanoDLP.getPlatesIndex();
        this.platesAll = this.platesIndex.Plates;
        this.platesStl = [];
        this.platesZip = [];
        if (this.platesAll === undefined){
            this.platesAll = [];
        }else{
            for(let i=0;i<this.platesAll.length;i++){
                if (this.platesAll[i].Type === "stl"){
                    this.platesStl.push(this.platesAll[i]);
                }else{
                    this.platesZip.push(this.platesAll[i]);
                }
            }
        }
        this.currentIndex = pageFirstIdx;
        if (type === "stl"){
            _ = this.setText("b4", this.platesStl.length > pageFirstIdx ? (pageFirstIdx + 1) + ". " + this.platesStl[pageFirstIdx].Path : "");
            _ = this.setText("b5", this.platesStl.length > pageFirstIdx + 1 ? (pageFirstIdx + 2) + ". " + this.platesStl[pageFirstIdx + 1].Path : "");
            _ = this.setText("b6", this.platesStl.length > pageFirstIdx + 2 ? (pageFirstIdx + 3) + ". " + this.platesStl[pageFirstIdx + 2].Path : "");
            _ = this.setText("b7", this.platesStl.length > pageFirstIdx + 3 ? (pageFirstIdx + 4) + ". " + this.platesStl[pageFirstIdx + 3].Path : "");
            //_ = this.setText("b8", this.platesStl.length > pageFirstIdx + 4 ? (pageFirstIdx + 5) + ". " + this.platesStl[pageFirstIdx + 4].Path : "");
        }else{
            _ = this.setText("b4", this.platesZip.length > pageFirstIdx ? (pageFirstIdx + 1) + ". " + this.platesZip[pageFirstIdx].Path : "");
            _ = this.setText("b5", this.platesZip.length > pageFirstIdx + 1 ? (pageFirstIdx + 2) + ". " + this.platesZip[pageFirstIdx + 1].Path : "");
            _ = this.setText("b6", this.platesZip.length > pageFirstIdx + 2 ? (pageFirstIdx + 3) + ". " + this.platesZip[pageFirstIdx + 2].Path : "");
            _ = this.setText("b7", this.platesZip.length > pageFirstIdx + 3 ? (pageFirstIdx + 4) + ". " + this.platesZip[pageFirstIdx + 3].Path : "");
            //_ = this.setText("b8", this.platesZip.length > pageFirstIdx + 4 ? (pageFirstIdx + 5) + ". " + this.platesZip[pageFirstIdx + 4].Path : "");
        }
    }
}
