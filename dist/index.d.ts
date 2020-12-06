import "./update-checker.js";
import { VideoInfo } from './videoinfo.js';
export * as VideoInfo from './videoinfo.js';
export declare function getVideoInfo(url: string): Promise<VideoInfo>;
export declare function getFormatList(url: string): Promise<any>;
