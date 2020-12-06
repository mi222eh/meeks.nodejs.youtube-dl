export interface VideoInfo {
    series?: null;
    height?: number;
    display_id?: string;
    formats?: Format[];
    fps?: number;
    categories?: string[];
    playlist_index?: null;
    is_live?: null;
    vcodec?: string;
    acodec?: Acodec;
    extractor?: string;
    episode_number?: null;
    format?: string;
    stretched_ratio?: null;
    id?: string;
    width?: number;
    uploader_id?: string;
    channel_id?: string;
    album?: null;
    season_number?: null;
    upload_date?: string;
    track?: null;
    abr?: number;
    tags?: string[] | null;
    webpage_url?: string;
    requested_formats?: Format[];
    annotations?: null;
    requested_subtitles?: null;
    chapters?: Chapter[] | null;
    _filename?: string;
    webpage_url_basename?: string;
    extractor_key?: string;
    ext?: EXT;
    end_time?: null;
    uploader_url?: string;
    license?: null;
    average_rating?: number;
    age_limit?: number;
    vbr?: null;
    start_time?: null;
    playlist?: null;
    view_count?: number;
    description?: string;
    resolution?: null;
    channel_url?: string;
    duration?: number;
    release_year?: null;
    uploader?: string;
    like_count?: number;
    dislike_count?: number;
    fulltitle?: string;
    thumbnail?: string;
    alt_title?: null;
    thumbnails?: Thumbnail[];
    automatic_captions?: AutomaticCaptions;
    format_id?: string;
    creator?: null;
    title?: string;
    artist?: null;
    release_date?: null;
    subtitles?: AutomaticCaptions;
}
export declare enum Acodec {
    Mp4A402 = "mp4a.40.2",
    None = "none",
    Opus = "opus"
}
export interface AutomaticCaptions {
}
export interface Chapter {
    start_time: number;
    end_time: number;
    title: string;
}
export declare enum EXT {
    M4A = "m4a",
    Mp4 = "mp4",
    Webm = "webm"
}
export interface Format {
    height: number | null;
    format_note: string;
    tbr: number;
    ext: EXT;
    player_url: null;
    format: string;
    url: string;
    vcodec: string;
    filesize: number | null;
    abr?: number;
    acodec: Acodec;
    http_headers: HTTPHeaders;
    fps: number | null;
    format_id: string;
    downloader_options?: DownloaderOptions;
    protocol: Protocol;
    asr: number | null;
    width: number | null;
    container?: string;
}
export interface DownloaderOptions {
    http_chunk_size: number;
}
export interface HTTPHeaders {
    "Accept-Encoding": AcceptEncoding;
    "User-Agent": string;
    "Accept-Charset": AcceptCharset;
    Accept: Accept;
    "Accept-Language": AcceptLanguage;
}
export declare enum Accept {
    TextHTMLApplicationXHTMLXMLApplicationXMLQ09Q08 = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
}
export declare enum AcceptCharset {
    ISO88591UTF8Q07Q07 = "ISO-8859-1,utf-8;q=0.7,*;q=0.7"
}
export declare enum AcceptEncoding {
    GzipDeflate = "gzip, deflate"
}
export declare enum AcceptLanguage {
    EnUsEnQ05 = "en-us,en;q=0.5"
}
export declare enum Protocol {
    HTTPS = "https"
}
export interface Thumbnail {
    resolution: string;
    height: number;
    id: string;
    url: string;
    width: number;
}
export declare class VideoInfoConvert {
    static toVideoInfo(json: string): VideoInfo;
    static videoInfoToJson(value: VideoInfo): string;
}
