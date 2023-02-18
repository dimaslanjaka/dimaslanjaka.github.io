/// <reference types="node" />
import { Readable } from 'stream';
export declare function streamToString(stream: Readable): Promise<string | PromiseLike<string>>;
