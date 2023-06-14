"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
const filemanager_1 = require("./filemanager");
const scheduler_1 = __importDefault(require("./scheduler"));
const locks = [];
class LockManager {
    constructor(name) {
        this.folder = path_1.default.join(process.cwd(), 'tmp/cache/lock');
        this.file = path_1.default.join(this.folder, name, os_1.default.platform() + '-index.lock');
        locks.push(this);
    }
    lock() {
        return (0, filemanager_1.writefile)(this.file, '');
    }
    release() {
        console.log(path_1.default.dirname(this.file), 'released');
        if (!fs_extra_1.default.existsSync(this.file))
            return;
        return fs_extra_1.default.rmSync(this.file, { recursive: true });
    }
    releaseAsync() {
        console.log(path_1.default.dirname(this.file), 'released');
        if (!fs_extra_1.default.existsSync(this.file))
            return Promise.resolve();
        return fs_extra_1.default.rm(this.file, { recursive: true });
    }
    exist() {
        return fs_extra_1.default.existsSync(this.file);
    }
}
exports.default = LockManager;
scheduler_1.default.add('clean locks', () => {
    locks.forEach((lock) => lock.release());
});
