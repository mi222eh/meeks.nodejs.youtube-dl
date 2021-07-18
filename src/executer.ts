import processes, { ChildProcess } from "child_process";
import path from "path";
import {
    youtubeDlFile,
    updateStatus,
    youtubeDlFolder,
} from "./update-checker.js";
import { IVideoInfo, VideoInfoConvert } from "./videoinfo.js";
import { KillProcess } from "meeks.nodejs.process.terminator";

export async function getVideoFormatInfo(url: string, format: string) {
    const proc = new YoutubeDL<IVideoInfo>();
    await proc
        .addCommand(["-s", "-j", "-f", format, "--no-playlist"])
        .setUrl(url)
        .executeData();
    return proc;
}

/**
 *
 * @param {string} url
 */
export async function getVideoInfo(url) {
    const p = new YoutubeDL<IVideoInfo>();
    p.setUrl(url).addCommand(["-s", "-j", "--no-playlist"]);
    await p.executeData();
    return p;
}
export async function download(url: string, format: string, filePath: string) {
    const p = new YoutubeDL<void>();
    await p.setUrl(url).addCommand(["-f", format, "-o", filePath]).execute();
    return p;
}

export class YoutubeDL<X = void> {
    commands: Set<string>;
    url: string;
    rawData: string;
    process: ChildProcess;
    promise: Promise<void>;
    constructor() {
        this.commands = new Set();
    }
    stop() {
        return KillProcess(this.process.pid);
    }
    setUrl(url: string) {
        this.url = `"${url}"`;
        return this;
    }
    addCommand(command: string[] | string) {
        if (typeof command === "string") {
            command = [command];
        }
        command.forEach((x) => this.commands.add(x));
        return this;
    }
    get data(): X {
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
        await updateStatus;
        this.rawData = "";
        const commandArgsString = [...this.commands.values()].join(" ");
        const commandFile =
            process.platform === "win32" ? "youtube-dl.exe" : "youtube-dl";
        const command = `${commandFile} ${commandArgsString} ${this.url}`;
        console.log("executing command");
        console.log(command);
        this.process = processes.spawn(command, {
            cwd: process.platform === "win32" ? youtubeDlFolder : undefined,
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
                } else {
                    reject(code);
                }
            });
        });
    }
}
