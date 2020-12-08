"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YoutubeDL = exports.download = exports.getVideoInfo = void 0;
const tslib_1 = require("tslib");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
const update_checker_js_1 = require("./update-checker.js");
/**
 *
 * @param {string} url
 */
async function getVideoInfo(url) {
    const p = new YoutubeDL();
    await p.setUrl(url).addCommand(['-s', '-j']).executeData();
    return p;
}
exports.getVideoInfo = getVideoInfo;
function download(url, format, filePath) {
    const p = new YoutubeDL();
    p.setUrl(url).addCommand(['-f', format, '-o', filePath]).execute();
    return p;
}
exports.download = download;
class YoutubeDL {
    constructor() {
        this.commands = new Set();
    }
    /**
     *
     * @param {string} url
     */
    setUrl(url) {
        this.url = url;
        return this;
    }
    addCommand(command) {
        if (typeof command === 'string') {
            command = [command];
        }
        command.forEach(x => this.commands.add(x));
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
        const commandArgsString = [...this.commands.values()].join(' ');
        const command = `youtube-dl.exe ${commandArgsString} ${this.url}`;
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
exports.YoutubeDL = YoutubeDL;
