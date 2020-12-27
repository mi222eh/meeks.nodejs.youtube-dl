"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoInfo = exports.YoutubeDLManager = exports.download = exports.getVideoFormatInfo = exports.getVideoInfo = void 0;
const tslib_1 = require("tslib");
require("./update-checker.js");
const DAL = tslib_1.__importStar(require("./executer.js"));
const videoInfoManager_js_1 = require("./videoInfo/videoInfoManager.js");
async function getVideoInfo(url) {
    const proc = await DAL.getVideoInfo(url);
    await proc.promise;
    return new videoInfoManager_js_1.VideoInfoManager(proc.data);
}
exports.getVideoInfo = getVideoInfo;
async function getVideoFormatInfo(url, format) {
    const proc = new DAL.YoutubeDL();
    proc.addCommand(['-s', '-j', '-f', format]).setUrl(url).executeData();
    await proc.promise;
    return proc.data;
}
exports.getVideoFormatInfo = getVideoFormatInfo;
async function download(url, format, fielpath) {
    const proc = await DAL.download(url, format, fielpath);
    await proc.promise;
}
exports.download = download;
exports.YoutubeDLManager = DAL.YoutubeDL;
exports.VideoInfo = tslib_1.__importStar(require("./videoinfo.js"));
tslib_1.__exportStar(require("./videoInfo/videoInfoManager"), exports);
// (async () =>{
//     const proc  = await getVideoInfo("https://www.youtube.com/watch?v=eQFbG6CwwdI");
//     console.log(proc);
// })();
// (async () =>{
//     const proc = await DAL.getFormatList("https://www.youtube.com/watch?v=nuMXKJMWYtA");
//     await proc.promise;
//     console.log(proc.rawData);
// })();
// (async () => {
//     console.log("Downloading Info");
//     const proc = await DAL.getVideoInfo("https://www.youtube.com/watch?v=nuMXKJMWYtA");
//     await proc.promise.catch((x) => console.error(x));
//     const regex = new RegExp("\\\\[u,n][0-9a-z]{0,5}", "gm");
//     proc.rawData = proc.rawData.replace(regex, "");
//     await fs.writeFile("example.json", proc.rawData);
// })();
