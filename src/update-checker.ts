import fs from "fs-extra";
import axios from "axios";
import path from "path";

export const youtubeDlFolder = path.resolve("./youtube-dl/")
export const lastUpdateFile = path.resolve(youtubeDlFolder, "last-update.txt");
export const youtubeDlFile = path.resolve(youtubeDlFolder, "youtube-dl.exe");

export const updateStatus = (async () => {
    let exists = await fs.pathExists(youtubeDlFile);
    if (!exists) {
        return await update();
    }
    exists = await fs.pathExists(lastUpdateFile);
    if (!exists) {
        return await update();
    }
    const updateDateText = await fs.readFile(lastUpdateFile, "UTF-8");
    const date = new Date(updateDateText);

    // check if one week old
    const limitDate = new Date(date);
    limitDate.setDate(date.getDate() + 7);

    if (new Date() > limitDate) {
        return await update();
    }
})();

async function update() {
    await fs.mkdirp(youtubeDlFolder);
    const writer = fs.createWriteStream(youtubeDlFile);
    const resp = await axios.get(
        "https://youtube-dl.org/downloads/latest/youtube-dl.exe",
        {
            responseType: "stream",
            headers: {'Access-Control-Allow-Origin': '*'}
        }
    );
    // pipe shit in there
    resp.data.pipe(writer);
    await new Promise((resolve, reject) => {
        writer.on("finish", resolve);
        writer.on("error", reject);
    });

    // close process
    writer.close();

    // write date
    await fs.writeFile(lastUpdateFile, new Date().toISOString());
}
