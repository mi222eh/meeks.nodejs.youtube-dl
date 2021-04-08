"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStatus = exports.youtubeDlFile = exports.lastUpdateFile = exports.youtubeDlFolder = void 0;
const tslib_1 = require("tslib");
const fs_extra_1 = tslib_1.__importDefault(require("fs-extra"));
const axios_1 = tslib_1.__importDefault(require("axios"));
const path_1 = tslib_1.__importDefault(require("path"));
const command_exists_1 = tslib_1.__importDefault(require("command-exists"));
exports.youtubeDlFolder = path_1.default.resolve("./youtube-dl/");
exports.lastUpdateFile = path_1.default.resolve(exports.youtubeDlFolder, "last-update.txt");
exports.youtubeDlFile = path_1.default.resolve(exports.youtubeDlFolder, "youtube-dl.exe");
exports.updateStatus = (async () => {
    if (process.platform === 'linux') {
        return await checkLinux();
    }
    let exists = await fs_extra_1.default.pathExists(exports.youtubeDlFile);
    if (!exists) {
        return await update();
    }
    exists = await fs_extra_1.default.pathExists(exports.lastUpdateFile);
    if (!exists) {
        return await update();
    }
    const updateDateText = await fs_extra_1.default.readFile(exports.lastUpdateFile, "UTF-8");
    const date = new Date(updateDateText);
    // check if one week old
    const limitDate = new Date(date);
    limitDate.setDate(date.getDate() + 7);
    if (new Date() > limitDate) {
        return await update();
    }
})();
async function update() {
    await fs_extra_1.default.mkdirp(exports.youtubeDlFolder);
    const writer = fs_extra_1.default.createWriteStream(exports.youtubeDlFile);
    const resp = await axios_1.default.get("https://youtube-dl.org/downloads/latest/youtube-dl.exe", {
        responseType: "stream",
        headers: { 'Access-Control-Allow-Origin': '*' }
    });
    // pipe shit in there
    resp.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });
    // close process
    writer.close();
    // write date
    await fs_extra_1.default.writeFile(exports.lastUpdateFile, new Date().toISOString());
}
async function checkLinux() {
    const exists = await command_exists_1.default("youtube-dl");
    if (!exists) {
        throw new Error("Youtube DL does not exist");
    }
}
