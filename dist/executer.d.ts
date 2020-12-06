/// <reference types="node" />
import { ChildProcess } from "child_process";
import { VideoInfo } from "./videoinfo.js";
/**
 *
 * @param {string} url
 */
export declare function getVideoInfo(url: any): Promise<YoutubeDL<VideoInfo>>;
export declare function getFormatList(url: string): Promise<YoutubeDL<any>>;
export declare function download(url: string, format: string): void;
declare class YoutubeDL<X> {
    command: string;
    url: string;
    rawData: string;
    process: ChildProcess;
    promise: Promise<void>;
    constructor();
    /**
     *
     * @param {string} url
     */
    setUrl(url: any): this;
    /**
     *
     * @param {string} command
     */
    setCommand(command: any): this;
    get data(): X;
    executeData(): Promise<void>;
    execute(): Promise<void>;
}
export {};
