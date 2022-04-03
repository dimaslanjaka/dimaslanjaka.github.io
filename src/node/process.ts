import fs from "fs";
import upath from "upath";
import { MD5 } from "crypto-js";
import coreProcess from "process";
import { makeid } from "../js/utility";
import spawner from "./spawner";

const tempFolder = coreProcess.cwd() + "/tmp/compiler";
if (fs.existsSync(tempFolder)) {
  fs.unlinkSync(upath.join(coreProcess.cwd(), tempFolder));
}

class process {
  /**
   * Root terminal
   */
  static root = coreProcess.cwd();
  /**
   * Debug
   */
  static verbose = false;
  /**
   * Compiler temp folder
   */
  static tmp = tempFolder;
  /**
   * Current process unique id
   */
  static id: string = makeid(5, "_");

  /**
   * process instance `import coreProcess from "process";`
   */
  static core = coreProcess;
  static isWin = coreProcess.platform === "win32";
  static spawner = spawner;

  /**
   * Kill All Node Processes
   */
  static killNode() {
    if (this.isWin) {
      //taskkill /f /im node.exe
    } else {
      //killall node
    }
  }

  /**
   * Create lock file
   * @param file
   */
  static lockCreate(file: string) {
    return upath.join(coreProcess.cwd(), this.tmp, MD5(file).toString());
  }

  /**
   * do process
   * @param lockfile
   * @param options
   * @param callback
   */
  static doProcess(lockfile: string, options: { verbose: boolean } | any, callback: Function) {
    if (typeof options.verbose == "boolean") {
      this.verbose = options.verbose;
    }
    lockfile = process.lockCreate(lockfile);
    if (fs.existsSync(lockfile)) {
      console.log(`Process locked (${lockfile}). please provide unique ids.`);
      return null;
    }
    const doCall = function () {
      if (typeof callback == "function") {
        return callback(lockfile);
      } else if (typeof options == "function") {
        return options(lockfile);
      }
    };
    process.lockProcess(lockfile);
    // eslint-disable-next-line no-unused-vars
    const load = new Promise((resolve, reject) => {
      doCall();
      resolve(true);
    });
    load.then(function () {
      process.releaseLock(lockfile);
    });
  }

  /**
   * lock the process
   * @param lockfile
   */
  private static lockProcess(lockfile: string) {
    if (this.verbose) {
      console.log("locking process");
    }
    if (!upath.resolve(upath.dirname(lockfile))) {
      fs.mkdirSync(upath.dirname(lockfile), { recursive: true });
    }
    fs.writeFileSync(lockfile, "lockfile");
  }

  /**
   * release lock process
   * @param lockfile
   */
  private static releaseLock(lockfile: string) {
    if (this.verbose) {
      console.log("releasing process");
    }
    if (fs.existsSync(lockfile)) {
      fs.unlinkSync(lockfile);
    } else {
      if (this.verbose) {
        console.error("process file already deleted");
      }
    }
  }
}

export default process;
