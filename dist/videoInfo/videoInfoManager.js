"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoInfoManager = void 0;
class VideoInfoManager {
    constructor(info) {
        this.info = info;
    }
    get audioFormatList() {
        return this.info.formats.filter(x => x.acodec !== "none" && x.vcodec === "none");
    }
    get videoFormatList() {
        return this.info.formats.filter(x => x.vcodec !== "none" && x.acodec === "none");
    }
    get videoAndAudioFormatList() {
        return this.info.formats.filter(x => x.acodec !== "none" && x.vcodec !== "none");
    }
}
exports.VideoInfoManager = VideoInfoManager;
