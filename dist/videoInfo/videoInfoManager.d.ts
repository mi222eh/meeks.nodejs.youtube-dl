import { IVideoInfo } from "../videoinfo";
export declare class VideoInfoManager {
    info: IVideoInfo;
    constructor(info: IVideoInfo);
    get audioFormatList(): import("../videoinfo").Format[];
    get videoFormatList(): import("../videoinfo").Format[];
    get videoAndAudioFormatList(): import("../videoinfo").Format[];
}
