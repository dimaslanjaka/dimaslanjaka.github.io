/// <reference types="node" />
import fs from 'fs-extra';
/**
 * function to encode file data to base64 encoded string
 * @param file path file
 * @returns
 */
export declare function image_base64_encode(file: fs.PathOrFileDescriptor): string;
