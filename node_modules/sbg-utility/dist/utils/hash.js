"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.url_to_hash = exports.folder_to_hash = exports.data_to_hash_sync = exports.data_to_hash = exports.file_to_hash = exports.md5 = exports.md5FileSync = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const crypto_1 = tslib_1.__importDefault(require("crypto"));
const fs = tslib_1.__importStar(require("fs-extra"));
const glob = tslib_1.__importStar(require("glob"));
const path = tslib_1.__importStar(require("upath"));
/**
 * MD5 file synchronously
 * @param path
 * @returns
 */
function md5FileSync(path) {
    let fileBuffer = Buffer.from(path);
    if (fs.existsSync(path)) {
        if (fs.statSync(path).isFile())
            fileBuffer = fs.readFileSync(path);
    }
    const hashSum = crypto_1.default.createHash('md5'); // sha256
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
}
exports.md5FileSync = md5FileSync;
/**
 * PHP MD5 Equivalent
 * @param data
 * @returns
 */
function md5(data) {
    return crypto_1.default.createHash('md5').update(data).digest('hex');
}
exports.md5 = md5;
function md5File(path) {
    return new Promise((resolve, reject) => {
        const output = crypto_1.default.createHash('md5');
        const input = fs.createReadStream(path);
        input.on('error', (err) => {
            reject(err);
        });
        output.once('readable', () => {
            resolve(output.read().toString('hex'));
        });
        input.pipe(output);
    });
}
exports.default = md5File;
/**
 * convert file to hash
 * @param alogarithm
 * @param path
 * @param encoding
 * @returns
 */
function file_to_hash(alogarithm, path, encoding = 'hex') {
    return new Promise((resolve, reject) => {
        const hash = crypto_1.default.createHash(alogarithm);
        const rs = fs.createReadStream(path);
        rs.on('error', reject);
        rs.on('data', (chunk) => hash.update(chunk));
        rs.on('end', () => resolve(hash.digest(encoding)));
    });
}
exports.file_to_hash = file_to_hash;
/**
 * convert data to hash (async)
 * @param alogarithm
 * @param data
 * @param encoding
 * @returns
 */
function data_to_hash(alogarithm = 'sha1', data, encoding = 'hex') {
    return new Promise((resolve, reject) => {
        try {
            resolve(data_to_hash_sync(alogarithm, data, encoding));
        }
        catch (e) {
            reject(e);
        }
    });
}
exports.data_to_hash = data_to_hash;
/**
 * convert data to hash (sync)
 * @param alogarithm
 * @param data
 * @param encoding
 * @returns
 */
function data_to_hash_sync(alogarithm = 'sha1', data, encoding = 'hex') {
    return crypto_1.default.createHash(alogarithm).update(data).digest(encoding);
}
exports.data_to_hash_sync = data_to_hash_sync;
/**
 * get hashes from folder
 * @param alogarithm
 * @param folder
 * @param options
 * @returns
 */
async function folder_to_hash(alogarithm, folder, options) {
    return new Promise((resolvePromise, rejectPromise) => {
        options = Object.assign({
            encoding: 'hex',
            ignored: [],
            pattern: ''
        }, options || {});
        if (folder.startsWith('file:'))
            folder = folder.replace('file:', '');
        // fix non exist
        if (!fs.existsSync(folder))
            folder = path.join(__dirname, folder);
        // run only if exist
        if (fs.existsSync(folder)) {
            glob
                .glob(options.pattern || '**/*', {
                cwd: folder,
                ignore: (options.ignored || [
                    '**/tmp/**',
                    '**/build/**',
                    '**/.cache/**',
                    '**/dist/**',
                    '**/.vscode/**',
                    '**/coverage/**',
                    '**/release/**',
                    '**/bin/**',
                    '**/*.json'
                ]).concat('**/.git*/**', '**/node_modules/**'),
                dot: true,
                noext: true
            })
                .then((matches) => {
                const filesWithHash = {};
                for (let i = 0; i < matches.length; i++) {
                    const item = matches[i];
                    const fullPath = path.join(folder, item);
                    const statInfo = fs.statSync(fullPath);
                    if (statInfo.isFile()) {
                        const fileInfo = `${fullPath}:${statInfo.size}:${statInfo.mtimeMs}`;
                        const hash = data_to_hash_sync(alogarithm, fileInfo, options.encoding);
                        filesWithHash[fullPath] = hash;
                    }
                }
                resolvePromise({
                    filesWithHash,
                    hash: data_to_hash_sync(alogarithm, Object.values(filesWithHash).join(''), options.encoding)
                });
            })
                .catch(rejectPromise);
        }
        else {
            console.log(folder + ' not found');
        }
    });
}
exports.folder_to_hash = folder_to_hash;
/**
 * convert data to hash
 * @param alogarithm
 * @param url
 * @param encoding
 * @returns
 */
async function url_to_hash(alogarithm = 'sha1', url, encoding = 'hex') {
    return new Promise((resolve, reject) => {
        let outputLocationPath = path.join(__dirname, 'node_modules/.cache/postinstall', path.basename(url));
        // remove slashes when url ends with slash
        if (!path.basename(url).endsWith('/')) {
            outputLocationPath = outputLocationPath.replace(/\/$/, '');
        }
        // add extension when dot not exist
        if (!path.basename(url).includes('.')) {
            outputLocationPath += '.tgz';
        }
        if (!fs.existsSync(path.dirname(outputLocationPath))) {
            fs.mkdirSync(path.dirname(outputLocationPath), { recursive: true });
        }
        const writer = fs.createWriteStream(outputLocationPath, { flags: 'w' });
        (0, axios_1.default)(url, { responseType: 'stream' }).then((response) => {
            response.data.pipe(writer);
            let error;
            writer.on('error', (err) => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', async () => {
                if (!error) {
                    // console.log('package downloaded', outputLocationPath.replace(__dirname, ''));
                    file_to_hash(alogarithm, outputLocationPath, encoding).then((checksum) => {
                        resolve(checksum);
                    });
                }
            });
        });
    });
}
exports.url_to_hash = url_to_hash;
//# sourceMappingURL=hash.js.map