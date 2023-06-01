"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfig = void 0;
const events_1 = __importDefault(require("events"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const upath_1 = __importDefault(require("upath"));
const filemanager_1 = require("../utils/filemanager");
const configWrapperFile = upath_1.default.join(__dirname, '_config_wrapper.json');
if (!fs_extra_1.default.existsSync(configWrapperFile))
    fs_extra_1.default.writeFileSync(configWrapperFile, '{}');
const configWrapper = fs_extra_1.default.existsSync(fs_extra_1.default.readFileSync(configWrapperFile, 'utf-8'))
    ? JSON.parse(configWrapperFile)
    : {};
/**
 * Create/Update config wrapper
 */
class createConfig extends events_1.default {
    /**
     * Create/Update config wrapper
     * @param name config name
     * @param value initial config value
     */
    constructor(name, value) {
        super();
        // assign config name
        this.cname = name;
        // add config
        if (!configWrapper[name]) {
            configWrapper[name] = value;
            this.emit('add', value);
        }
        else {
            // update config
            this.update(value);
        }
    }
    /**
     * get config
     * @returns
     */
    get() {
        if (!configWrapper[this.cname])
            configWrapper[this.cname] = {};
        return configWrapper[this.cname];
    }
    /**
     * update config
     * @param value new values should be merged with old values using shallow object merge
     */
    update(value) {
        configWrapper[this.cname] = Object.assign({}, this.get(), value);
        fs_extra_1.default.accessSync(configWrapperFile, fs_extra_1.default.constants.W_OK);
        (0, filemanager_1.writefile)(configWrapperFile, JSON.stringify(configWrapper, null, 2));
        this.emit('update');
    }
}
exports.createConfig = createConfig;
