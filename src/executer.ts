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
    await p.setUrl(url).addCommand(['-s', '-j', '--no-playlist']).executeData();
    return p;
}
export function download(url:string, format:string, filePath:string){
    const p = new YoutubeDL<void>();
    p.setUrl(url).addCommand(['-f', format, '-o', filePath]).execute();
    return p;
}

export class YoutubeDL<X = void> {
    commands: Set<string>;
    url: string;
    rawData:string;
    process: ChildProcess;
    promise: Promise<void>;
    constructor() {
        this.commands = new Set();
    }
    setUrl(url:string) {
        this.url = `"${url}"`;
        return this;
    }
    addCommand(command:string[] | string) {
        if(typeof command === 'string'){
            command = [command];
        }
        command.forEach(x => this.commands.add(x));
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
        const commandArgsString = [...this.commands.values()].join(' ')
        const command = `youtube-dl.exe ${commandArgsString} ${this.url}`;
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