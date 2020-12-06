"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.getFormatList = exports.getVideoInfo = void 0;
const tslib_1 = require("tslib");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
const update_checker_js_1 = require("./update-checker.js");
/**
 *
 * @param {string} url
 */
async function getVideoInfo(url) {
    const p = new YoutubeDL();
    await p.setUrl(url).setCommand(`-s -j`).executeData();
    return p;
}
exports.getVideoInfo = getVideoInfo;
async function getFormatList(url) {
    const p = new YoutubeDL();
    await p.setUrl(url).setCommand('-F -s -j').executeData();
    return p;
}
exports.getFormatList = getFormatList;
function download(url, format) {
}
exports.download = download;
class YoutubeDL {
    constructor() {
        this.command = "";
    }
    /**
     *
     * @param {string} url
     */
    setUrl(url) {
        this.url = url;
        return this;
    }
    /**
     *
     * @param {string} command
     */
    setCommand(command) {
        this.command = command;
        return this;
    }
    get data() {
        return JSON.parse(this.rawData);
    }
    async executeData() {
        await this.execute();
        this.process.stdout.on("data", (data) => {
            this.rawData += data.toString();
        });
    }
    async execute() {
        await update_checker_js_1.updateStatus;
        this.rawData = "";
        const command = `youtube-dl.exe ${this.url} ${this.command}`;
        console.log("executing command");
        console.log(command);
        this.process = child_process_1.default.spawn(command, {
            cwd: update_checker_js_1.youtubeDlFolder,
            shell: true,
        });
        this.process.stderr.on("data", (data) => {
            console.error(data.toString());
        });
        this.promise = new Promise((resolve, reject) => {
            this.process.on("close", (code, signal) => {
                if (code === 0) {
                    resolve();
                }
                else {
                    reject(code);
                }
            });
        });
    }
}
