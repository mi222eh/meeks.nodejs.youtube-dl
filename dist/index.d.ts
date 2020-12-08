import "./update-checker.js";
import { IVideoInfo } from './videoinfo.js';
export * as VideoInfo from './videoinfo.js';
export declare function getVideoInfo(url: string): Promise<IVideoInfo>;
export declare function getVideoFormatInfo(url: string, format: string): Promise<IVideoInfo>;
export declare function download(url: string, format: string, fielpath: string): Promise<void>;
