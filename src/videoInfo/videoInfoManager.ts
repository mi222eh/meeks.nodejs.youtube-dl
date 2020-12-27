import { IVideoInfo } from "../videoinfo";

export class VideoInfoManager {
    info:IVideoInfo;
    constructor(info:IVideoInfo){
        this.info = info;
    }
    get audioFormatList(){
        return this.info.formats.filter(x => x.acodec !== "none" && x.vcodec === "none");
    }
    get videoFormatList(){
        return this.info.formats.filter(x => x.vcodec !== "none" && x.acodec === "none");
    }
    get videoAndAudioFormatList(){
        return this.info.formats.filter(x => x.acodec !== "none" && x.vcodec !== "none");
    }
}