"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeDL = exports.download = exports.getVideoInfo = exports.getVideoFormatInfo = void 0;
const tslib_1 = require("tslib");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
const update_checker_js_1 = require("./update-checker.js");
const meeks_nodejs_process_terminator_1 = require("meeks.nodejs.process.terminator");
async function getVideoFormatInfo(url, format) {
    const proc = new YoutubeDL();
    await proc
        .addCommand(["-s", "-j", "-f", format, "--no-playlist"])
        .setUrl(url)
        .executeData();
    return proc;
}
exports.getVideoFormatInfo = getVideoFormatInfo;
/**
 *
 * @param {string} url
 */
async function getVideoInfo(url) {
    const p = new YoutubeDL();
    p.setUrl(url).addCommand(["-s", "-j", "--no-playlist"]);
    await p.executeData();
    return p;
}
exports.getVideoInfo = getVideoInfo;
async function download(url, format, filePath) {
    const p = new YoutubeDL();
    await p.setUrl(url).addCommand(["-f", format, "-o", filePath]).execute();
    return p;
}
exports.download = download;
class YoutubeDL {
    constructor() {
        this.commands = new Set();
    }
    stop() {
        return meeks_nodejs_process_terminator_1.KillProcess(this.process.pid);
    }
    setUrl(url) {
        this.url = `"${url}"`;
        return this;
    }
    addCommand(command) {
        if (typeof command === "string") {
            command = [command];
        }
        command.forEach((x) => this.commands.add(x));
        return this;
    }
    get data() {
        console.log("DATA");
        console.log(this.rawData);
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
        const commandArgsString = [...this.commands.values()].join(" ");
        const commandFile = process.platform === "win32" ? "youtube-dl.exe" : "youtube-dl";
        const command = `${commandFile} ${commandArgsString} ${this.url}`;
        console.log("executing command");
        console.log(command);
        this.process = child_process_1.default.spawn(command, {
            cwd: process.platform === "win32" ? update_checker_js_1.youtubeDlFolder : undefined,
            shell: true,
            // windowsHide: false,
        });
        this.process.stderr.on("data", (data) => {
            console.error(data.toString());
        });
        this.promise = new Promise((resolve, reject) => {
            this.process.on("close", (code, signal) => {
                console.log("CLOSES");
                console.log(code, signal);
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
exports.YoutubeDL = YoutubeDL;
