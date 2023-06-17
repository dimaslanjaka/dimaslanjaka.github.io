'use strict';
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gitStatus = void 0;
const spawn = __importStar(require("cross-spawn"));
/**
 * git status
 * @param opt
 * @returns
 */
function gitStatus(opt) {
    // set porcelain true
    if (typeof opt.porcelain !== 'boolean')
        opt.porcelain = true;
    let result;
    if (opt.porcelain) {
        result = spawn.sync('git', ['status', '--porcelain'], opt);
    }
    else {
        result = spawn.sync('git', ['status'], opt);
    }
    if (!opt.raw) {
        return String(result.stdout)
            .split(/\r?\n/gm)
            .filter((str) => str.length > 0)
            .map((str) => {
            const exec = Array.from(/^([MD\\?]{1,2})\s(.*)/g.exec(str.trim()) || []);
            // set `??` as untracked
            if (exec[1] === '??')
                exec[1] = 'U';
            // convert as object
            const obj = { [exec[1]]: exec[2] };
            return obj;
        });
    }
    else {
        return result;
    }
}
exports.gitStatus = gitStatus;
