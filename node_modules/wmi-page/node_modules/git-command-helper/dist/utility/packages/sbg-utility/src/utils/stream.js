"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDuplexStream = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
function createDuplexStream() {
    const readStream = fs_1.default.createReadStream(path_1.default.join(process.cwd(), `tmp/streams/read-${process.pid}.txt`));
    const writeStream = fs_1.default.createWriteStream(path_1.default.join(process.cwd(), `tmp/streams/write-${process.pid}.txt`));
    const tunnel = new stream_1.PassThrough(); // simply...
    //tunnel.pipe(writeStream, { end: false }); // pipe without closing the target stream on end
    //closingFunction(tunnel); // this function closes the pipe for me
    console.log(tunnel.writable); // false: the pipe was closed
    console.log(writeStream.writable); // true: the stream is still open
    return readStream.pipe(tunnel).pipe(writeStream);
}
exports.createDuplexStream = createDuplexStream;
