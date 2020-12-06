import "./update-checker.js";
import * as DAL from "./executer.js";
import { IVideoInfo } from './videoinfo.js';
import fs from 'fs-extra';

export * as VideoInfo from './videoinfo.js';

export async function getVideoInfo(url:string):Promise<IVideoInfo> {
    const proc = await DAL.getVideoInfo(url);
    await proc.promise;
    return proc.data;
}

export async function getFormatList(url:string): Promise<any>{
    const proc = await DAL.getFormatList(url);
    await proc.promise;
    return proc.data;
}




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