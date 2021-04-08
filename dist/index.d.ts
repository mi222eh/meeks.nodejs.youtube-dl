import "./update-checker.js";
import * as DAL from "./executer.js";
import { IVideoInfo } from "./videoinfo.js";
import { VideoInfoManager } from "./videoInfo/videoInfoManager.js";
export declare function getVideoInfo(url: string): Promise<VideoInfoManager>;
export declare function getVideoFormatInfo(url: string, format: string): Promise<IVideoInfo>;
export declare function download(url: string, format: string, fielpath: string): Promise<void>;
export declare const YoutubeDLManager: typeof DAL.YoutubeDL;
export * as VideoInfo from "./videoinfo.js";
export * from "./videoInfo/videoInfoManager";
export * as Executer from "./executer";
