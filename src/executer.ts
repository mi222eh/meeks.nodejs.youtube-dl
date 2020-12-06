import processes, { ChildProcess }  from "child_process";
import path from "path";
import { youtubeDlFile, updateStatus, youtubeDlFolder } from './update-checker.js';
import { IVideoInfo, VideoInfoConvert } from "./videoinfo.js";

/**
 *
 * @param {string} url
 */
export async function getVideoInfo(url) {
    const p = new YoutubeDL<IVideoInfo>();
    await p.setUrl(url).setCommand(`-s -j`).executeData();
    return p;
}

export async function getFormatList(url:string){
    const p = new YoutubeDL<any>();
    await p.setUrl(url).setCommand('-F -s -j').executeData();
    return p;
}

export function download(url:string, format:string){

}

class YoutubeDL<X> {
    command: string;
    url: string;
    rawData:string;
    process: ChildProcess;
    promise: Promise<void>;
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
    get data(): X{
        return JSON.parse(this.rawData);
    }
    async executeData() {
        await this.execute();
        this.process.stdout.on("data", (data) => {
            this.rawData += data.toString();
        });
    }
    async execute() {
       await updateStatus;
        this.rawData = "";
        const command = `youtube-dl.exe ${this.url} ${this.command}`;
        console.log("executing command");
        console.log(command);
        this.process = processes.spawn(command, {
            cwd: youtubeDlFolder,
            shell: true,
            // windowsHide: false,
        });
        this.process.stderr.on("data", (data) => {
            console.error(data.toString());
        });

        this.promise = new Promise((resolve, reject) => {
            this.process.on("close", (code, signal) => {
                if (code === 0) {
                    resolve();
                } else {
                    reject(code);
                }
            });
        });
    }
}