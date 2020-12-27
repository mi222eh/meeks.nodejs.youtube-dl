import "./update-checker.js";
import * as DAL from "./executer.js";
import { IVideoInfo } from './videoinfo.js';
import { VideoInfoManager } from "./videoInfo/videoInfoManager.js";



export async function getVideoInfo(url:string):Promise<VideoInfoManager> {
    const proc = await DAL.getVideoInfo(url);
    await proc.promise;
    return new VideoInfoManager(proc.data);
}

export async function getVideoFormatInfo(url:string, format:string):Promise<IVideoInfo> {
    const proc = new DAL.YoutubeDL<IVideoInfo>()
    proc.addCommand(['-s', '-j', '-f', format]).setUrl(url).executeData();
    await proc.promise;
    return proc.data;
}

export async function download(url:string, format:string, fielpath:string) {
    const proc  = await DAL.download(url, format, fielpath);
    await proc.promise;
}

export const YoutubeDLManager =  DAL.YoutubeDL;


export * as VideoInfo from './videoinfo.js';
export * from './videoInfo/videoInfoManager'




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