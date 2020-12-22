/// <reference types="node" />
import { ChildProcess } from "child_process";
import { IVideoInfo } from "./videoinfo.js";
/**
 *
 * @param {string} url
 */
export declare function getVideoInfo(url: any): Promise<YoutubeDL<IVideoInfo>>;
export declare function download(url: string, format: string, filePath: string): YoutubeDL<void>;
export declare class YoutubeDL<X = void> {
    commands: Set<string>;
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
    addCommand(command: string[] | string): this;
    get data(): X;
    executeData(): Promise<void>;
    execute(): Promise<void>;
}
