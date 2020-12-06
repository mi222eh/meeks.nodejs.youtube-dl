"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormatList = exports.getVideoInfo = exports.VideoInfo = void 0;
const tslib_1 = require("tslib");
require("./update-checker.js");
const DAL = tslib_1.__importStar(require("./executer.js"));
exports.VideoInfo = tslib_1.__importStar(require("./videoinfo.js"));
async function getVideoInfo(url) {
    const proc = await DAL.getVideoInfo(url);
    await proc.promise;
    return proc.data;
}
exports.getVideoInfo = getVideoInfo;
async function getFormatList(url) {
    const proc = await DAL.getFormatList(url);
    await proc.promise;
    return proc.data;
}
exports.getFormatList = getFormatList;
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
