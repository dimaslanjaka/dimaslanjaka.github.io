"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = __importDefault(require("./helper"));
const f = async () => {
    try {
        throw new Error('empty');
    }
    catch (error) {
        return error;
    }
};
console.log('is promise', helper_1.default.isPromise(f));
helper_1.default.suppress(f).then(console.log);
