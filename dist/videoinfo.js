"use strict";
// To parse this data:
//
//   import { Convert, VideoInfo } from "./file";
//
//   const videoInfo = Convert.toVideoInfo(json);
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoInfoConvert = exports.Protocol = exports.AcceptLanguage = exports.AcceptEncoding = exports.AcceptCharset = exports.Accept = exports.EXT = exports.Acodec = void 0;
var Acodec;
(function (Acodec) {
    Acodec["Mp4A402"] = "mp4a.40.2";
    Acodec["None"] = "none";
    Acodec["Opus"] = "opus";
})(Acodec = exports.Acodec || (exports.Acodec = {}));
var EXT;
(function (EXT) {
    EXT["M4A"] = "m4a";
    EXT["Mp4"] = "mp4";
    EXT["Webm"] = "webm";
})(EXT = exports.EXT || (exports.EXT = {}));
var Accept;
(function (Accept) {
    Accept["TextHTMLApplicationXHTMLXMLApplicationXMLQ09Q08"] = "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8";
})(Accept = exports.Accept || (exports.Accept = {}));
var AcceptCharset;
(function (AcceptCharset) {
    AcceptCharset["ISO88591UTF8Q07Q07"] = "ISO-8859-1,utf-8;q=0.7,*;q=0.7";
})(AcceptCharset = exports.AcceptCharset || (exports.AcceptCharset = {}));
var AcceptEncoding;
(function (AcceptEncoding) {
    AcceptEncoding["GzipDeflate"] = "gzip, deflate";
})(AcceptEncoding = exports.AcceptEncoding || (exports.AcceptEncoding = {}));
var AcceptLanguage;
(function (AcceptLanguage) {
    AcceptLanguage["EnUsEnQ05"] = "en-us,en;q=0.5";
})(AcceptLanguage = exports.AcceptLanguage || (exports.AcceptLanguage = {}));
var Protocol;
(function (Protocol) {
    Protocol["HTTPS"] = "https";
})(Protocol = exports.Protocol || (exports.Protocol = {}));
// Converts JSON strings to/from your types
class VideoInfoConvert {
    static toVideoInfo(json) {
        return JSON.parse(json);
    }
    static videoInfoToJson(value) {
        return JSON.stringify(value);
    }
}
exports.VideoInfoConvert = VideoInfoConvert;
