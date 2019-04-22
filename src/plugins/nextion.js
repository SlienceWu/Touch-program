require("babel-polyfill");
import abstract from "./abstract.js";

import NextionService from "./nextion/nextionService.js";

export default class Confirm extends abstract {
    constructor(manager) {
        super(manager);

        this.isPrinting = null;

        this.nextion = new NextionService(this.config.plugins.nextion);

        this.nextion.on("disconnect", () => {
            this.init().catch(e => console.error(e));
        });
    }

    async init() {
        this.isPrinting = null;
        this.currentPageId = null;

        await this.nextion.connect();

        this.update(this.status, this.log).catch(e => console.error(e));
    }

    async update(status, log) {
        if (!status)
            return;

        this.status = status;
        this.log = log;

        clearTimeout(this.updateTimeOut);

        if (status.Printing !== this.isPrinting) {
            this.isPrinting = status.Printing;
            if (this.isPrinting){
                await this.setPage("printingHome");
            }else{
                await this.setPage("home");
            }
        }
        this.isPrinting = status.Printing;

        await this.currentPage.update(status, log).catch((e) => console.error(e));
    }

    async setPage(page, options) {

        switch (page) {
            /*case "home":
                if (this.isPrinting) {
                    page = "printingHome";
                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                } else {
                    page = "home";
                    console.log("Initialize 'Page Home'");
                }
                break;*/
            case "addPlate":
                if (this.isPrinting) {
                    page = "nooperation";
                    options = "plates";
                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                } else {
                    page = "addPlate";
                    console.log("Initialize 'Page addPlate'");
                }
                break;
            case "plate":
                if (this.isPrinting) {
                    page = "nooperation";
                    options = "plates";
                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                } else {
                    page = "plate";
                    console.log("Initialize 'Page plate'");
                }
                break;
            case "setmodel":
                if (this.isPrinting) {
                    page = "nooperation";
                    options = "plates";
                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                } else {
                    page = "setmodel";
                    console.log("Initialize 'Page setmodel'");
                }
                break;
            case "zAxis":
                if (this.isPrinting) {
                    page = "nooperation";
                    options = "settings";
                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                } else {
                    page = "zAxis";
                    console.log("Initialize 'Page zAxis'");
                }
                break;
            case "projector":
                if (this.isPrinting) {
                    page = "nooperation";
                    options = "settings";
                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                } else {
                    page = "projector";
                    console.log("Initialize 'Page projector'");
                }
                break;
            case "config":
                if (this.isPrinting) {
                    page = "nooperation";
                    options = "settings";
                    console.log("Printing task is running, initialize 'Page PrintingHome' first");
                } else {
                    page = "config";
                    console.log("Initialize 'Page config'");
                }
                break;
            case "printingHome":
                if (options === "back"){
                    if (this.isPrinting){
                        page = "printingHome";
                        console.log("Printing task is running, initialize 'Page PrintingHome' first");
                    }else{
                        page = "home";
                        console.log("Initialize 'Page home'");
                    }
                }else{
                    page = "printingHome";
                    console.log("Initialize 'Page printingHome'");
                }
                break;
        }

        if (this.currentPageId === page)
            return;

        let PageClass = null;
        try {
            PageClass = require(`./nextion/pages/${page}.js`).default;
            console.log("Load 'Pageclass " + page + "'");
        } catch (e) {
            return;
        }

        if (this.currentPage) {
            try {
                this.currentPage.dispose();
            } catch (e) {
                console.error(e);
            }
        }

        this.currentPageId = page;
        this.currentPage = new PageClass(this);

        await new Promise((resolve) => setTimeout(resolve, 100));
        this.currentPage.init(options).catch(e => console.error(e));

        await this.update(this.status, this.log);
    }
}
