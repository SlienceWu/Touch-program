'use strict';

import debug_ from 'debug';

require("babel-polyfill");

const iconv = require('iconv-lite');

import SerialPort from 'serialport';
import {EventEmitter} from 'events';
import sharp from 'sharp';

const NextionEvent = {
    0x00: 'invalidInstruction',
    0x01: 'success',
    0x02: 'invalidComponentID',
    0x03: 'invalidPageID',
    0x04: 'invalidPictureID',
    0x05: 'invalidFontID',
    0x11: 'invalidBaudRate',
    0x12: 'invalidCurveControl',
    0x1a: 'invalidVariableName',
    0x1b: 'invalidVariableOperation',
    0x1c: 'assignmentFailure',
    0x1d: 'eepromFailure',
    0x1e: 'invalidParameterQuantity',
    0x1f: 'ioOperationFailure',
    0x20: 'undefinedEscapeCharacter',
    0x23: 'variableNameTooLong',
    0x70: 'stringData',
    0x71: 'numericData',
    0x65: 'touchEvent',
    0x66: 'pageId',
    0x67: 'touchCoordinate',
    0x68: 'touchCoordinateOnWake',
    0x86: 'autoSleep',
    0x87: 'autoWake',
    0x88: 'startup',
    0x89: 'cardUpgrade',
    0xfd: 'transmitFinished',
    0xfe: 'transmitReady'
};

const debug = debug_('nextion');

let _ = null;

export default class NextionService extends EventEmitter {

    _buffer;

    constructor(config) {
        super();

        this._buffer = new Buffer([]);
        this.config = config;
    }

    async connect() {
        debug("serialport open");

        let open = false;
        while (open === false) {
            try {
                await new Promise(function (resolve, reject) {
                    SerialPort.list((err, ports) => {
                        resolve();
                    });
                });

                console.log((new Date()).toGMTString() + " Ready to open serial port");

                this.port = new SerialPort(this.config.port, {
                    autoOpen: false, baudRate: 115200
                });

                await new Promise((resolve, reject) => this.port.open(resolve));
                await new Promise((r) => setTimeout(r, 1000));

                console.log((new Date()).toGMTString() + " Open serial port successfully");

                await this._initScreen();
                open = true;
            } catch (e) {
                await new Promise((r) => setTimeout(r, 1000));
            }
        }

        process.on('SIGINT', () => {
            _ = this.setPage("connection");
            process.exit();
        });
    }

    async setPage(num) {
        _ = await this._writeUart('page ' + num);
    }

    async setText(cmp, txt) {
        let text = txt.toString().split("\r").join('"+"\\r"+"');
        _ = await this._writeUart(cmp + '.txt="' + text + '"');
    }

    async setValue(cmp, txt) {
        _ = await this._writeUart(cmp + '.val=' + txt + '');
    }

    async addToWaveForm(cmp, channel, value) {
        await this._writeUart(`add ${cmp},${channel},${value}`);
    }

    async setVis(cmp, value) {
        let val = value ? "1" : "0";
        await this._writeUart('vis ' + cmp + ',' + val);
    }

    async setLine(x, y, x2, y2, color) {
        await this._writeUart(`line ${x},${y},${x2},${y2}`, false);
    }

    async setFill(x, y, width, height, color) {
        await this._writeUart(`fill ${x},${y},${width},${height},${color}`, false);
    }

    async setColorP(x,y,color){
        await this._writeUart(`color ${x},${y},${color};`,false);
    }

    async setColorS(color){
        await this._writeUart(`col ${color};`,false);
    }

    async setColorB(buffer){
        await this._writeBuffer(buffer,false);
    }
    async _writeBuffer(buffer){
        debug("send command : " + buffer.toString());
        this.port.write(buffer);
    }


    async stopRefresh(cmp, bco) {
        await this._writeUart("ref_stop");
    }

    async startRefresh(cmp, bco) {
        await this._writeUart("ref_star");
    }

    async setColor(cmp, bco) {
        await this._writeUart(cmp + ".bco=" + bco);
        await this._writeUart("ref " + cmp);
    }

    async getPage() {
        let page = await this._writeUart('sendme');
        return page[0];
    }

    async getValue(cmp) {
        let result = await this._writeUart('get ' + cmp);
        return (result[1] * 256 + result[0]);
    }

    async displayBlackWhiteImage(buffer, positionX, positionY, width) {
        const image = sharp(buffer);

        image.metadata()
            .then((metadata) => {
                image
                    .rotate((metadata.width >= metadata.height) ? 0 : -90)
                    .resize(width)
                    .extractChannel(1)
                    .raw()
                    .toBuffer(async (err, data, info) => {
                        _ = this.setFill(positionX, positionY, info.width, info.height, 0);

                        let index = 0;
                        let numLine = 0;
                        for (let i = 0; i < info.height; i++) {
                            let currentXColor = -1;
                            let x = -1, j = 0;
                            for (j = 0; j < info.width; j++) {

                                let currentColor = data[index] <= 50 ? 0 : 1;

                                if (j === 0) {
                                    currentXColor = currentColor;
                                }
                                if (currentColor !== currentXColor) {
                                    if (currentXColor === 1) {
                                        _ = this.setLine(x + positionX, i + positionY, j - 1 + positionX, i + positionY);
                                        debug("setLine", ++numLine, "y", i, "from", x, "to", j - 1, "color", currentXColor);
                                    }
                                    x = j - 1;
                                    currentXColor = currentColor;
                                }
                                index++;
                            }
                            if (x === 0 && currentXColor !== 0) {
                                _ = this.setLine(x + positionX, i + positionY, j - 1 + positionX, i + positionY);
                                debug("setLine", ++numLine, "y", i, "from", x, "to", j - 1, "color", currentXColor);
                            }
                        }
                        debug("time = ", new Date().getTime() - date);
                    });
            });
    }

    async displayImage(buffer) {
        const image = sharp(buffer);
        image.metadata()
            .then((metadata) => {
                console.log(metadata);
                //.rotate((metadata.width >= metadata.height) ? 0 : 90)
                image
                    .resize((metadata.width >= 150) ? 150 : metadata.width,(metadata.width >= 150) ? metadata.height : 70,{
                        fit: "inside"
                    })
                    .raw()
                    .toBuffer({ resolveWithObject: true },async (err, data, info) => {

                        if (info.width === 150){
                            let rest = (70-info.height)/2;
                            for(let y=0;y<rest;y++){
                                let all = Buffer.from([0xFE,0xFE,0xFE]);
                                let arr = [];
                                for(let i=0;i<150;i++){
                                    arr.push(0x00,0x00);
                                }
                                arr = Buffer.from(arr);
                                let end = Buffer.from([0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]);
                                all = Buffer.concat([all,arr,end]);
                                setTimeout( async () => {
                                    _ = this.setColorB(all);
                                },100);
                            }
                        }

                        for(let y=0;y<info.height;y++){
                            let all = Buffer.from([0xFE,0xFE,0xFE]);
                            let body = Buffer.from([]);
                            for(let x=0;x<info.width;x++){
                                let offset = info.channels * (info.width * y + x);
                                let red = data[offset];
                                let green = data[offset + 1];
                                let blue = data[offset + 2];
                                let a = (red&0xF0)>>4;
                                let b = (red&0x08)+((green&0xE0)>>5);
                                let c = ((green&0x1C)>>1)+((blue&0x80)>>7);
                                let d = (blue&0x78)>>3;
                                let need = (a<<12) + (b<<8) + (c<<4) + d;

                                let ab = (a<<4) + b;
                                let cd = (c<<4) + d;
                                let buff = Buffer.from([ab,cd]);
                                body = Buffer.concat([body,buff]);
                            }
                            let rest = (150 - info.width);
                            let arr = [];
                            for(let i=0;i<rest;i++){
                                arr.push(0x00);
                            }
                            if (rest%2 === 0){
                                if (rest === 0){
                                    let end = Buffer.from([0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]);
                                    all = Buffer.concat([all,body,end]);
                                }else{
                                    let fill = Buffer.from(arr);
                                    let end = Buffer.from([0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]);
                                    all = Buffer.concat([all,fill,body,fill,end]);
                                }
                            }else{
                                arr.shift(1);
                                let fillL = Buffer.from(arr);
                                arr.push(0x00,0x00);
                                let fillR = Buffer.from(arr);
                                let end = Buffer.from([0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]);
                                all = Buffer.concat([all,fillL,body,fillR,end]);
                            }
                            //let end = Buffer.from([0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]);[0xFD,0xFD,0xFD,0xFD,0xFD]
                            //all = Buffer.concat([all,end]);
                            try{
                                setTimeout( async () => {
                                    _ = this.setColorB(all);
                                },100);
                            }catch(e){
                                console.log(e);
                            }
                        }

                        if (info.width === 150){
                            let rest = (70-info.height)/2;
                            if (rest%2 === 0){
                                rest = (70-info.height)/2;
                            }else{
                                rest = rest - 1;
                            }
                            for(let y=0;y<rest;y++){
                                let all = Buffer.from([0xFE,0xFE,0xFE]);
                                let arr = [];
                                for(let i=0;i<150;i++){
                                    arr.push(0x00,0x00);
                                }
                                arr = Buffer.from(arr);
                                let end = Buffer.from([0xFF,0xFF,0xFF,0xFF,0xFF,0xFF]);
                                all = Buffer.concat([all,arr,end]);
                                setTimeout( async () => {
                                    _ = this.setColorB(all);
                                },100);
                            }
                        }
                    });
            });
    }

    async _initScreen() {
        this.port.on("close", () => {
            this.emit("disconnect");
        });

        this.port.on('data', (byte) => {
            this._buffer = Buffer.concat([this._buffer, byte]);
            this._readBuffer();
        });

        console.log((new Date()).toGMTString() + " Initialize screen");
        await this._writeUart('bkcmd=3');
        console.log((new Date()).toGMTString() + " First package sent");

        debug("screenInitialized");
    }

    _readBuffer() {
        let index = this._buffer.indexOf(delimiterBuffer);
        if (index >= 0) {
            let result = NextionService._parseData(this._buffer.slice(0, index));
            this.emit("data", result);
            debug("event", NextionEvent[result.event], ":", result.event.toString(16), result.data);
            switch (NextionEvent[result.event]) {
                case "touchEvent":
                    debug("emit : ", "click_b" + result.data[1].toString());
                    this.emit("click_b" + result.data[1].toString());
                    break;

                case "numericData":
                    debug("emit : ", "number");
                    this.emit("number", result.data[0]);
                    break;

                case "stringData":
                    debug("emit : ", "string", result.data.toString());
                    this.emit("string", result.data.toString());
                    break;

                default:
                    this.emit(NextionEvent[result.event], result.data);
            }

            this._buffer = this._buffer.slice(index + 3);
            this._readBuffer();
        }
    }

    static _parseData(buffer) {
        let result = {};
        result.event = buffer[0];
        result.data = buffer.slice(1);
        return result;
    }


    async _writeUart(cmd, wait = true) {
        debug("send command : " + cmd);
        this.port.write(this.hex(cmd));
        if (wait) {
            return await this._waitForResult();
        }
    }

    async _waitForResult() {
        return await new Promise((resolve, reject) => {
            this.once("data", (data) => {
                debug("receiveResult", data);
                if (NextionEvent[data.event] !== null) {
                    return resolve(data.data);
                }
                return reject(data.data);
            })
        });

    }

    hex(str) {
        let arr = iconv.encode(str, "gb2312");
        let tail = Buffer.from([255, 255, 255]);
        return Buffer.concat([arr, tail]);
    }

}

export const delimiter = [
    0xff,
    0xff,
    0xff
];

export const delimiterBuffer = Buffer.from(delimiter);