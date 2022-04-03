import fs from "fs";
import path from "path";
let firstTime = true;
const trueLog = console.log;
// write logs to file
console.log = function (...msg: any[]) {
  const logfile = path.join(process.cwd(), "/tmp/log.log");
  if (!fs.existsSync(path.dirname(logfile))) fs.mkdirSync(path.dirname(logfile), { recursive: true });
  if (firstTime) {
    if (fs.existsSync(logfile)) fs.unlinkSync(logfile);
    firstTime = false;
  }
  let text: string;
  if (Array.isArray(msg)) {
    if (msg.length === 1) {
      text = msg[0];
    } else {
      text = msg.join("\n");
    }
  }
  if (text)
    fs.appendFile(logfile, text + "\n\n", function (err) {
      if (err) {
        return trueLog(err);
      }
    });
  // uncomment if you want logs
  if (msg.length === 1) {
    trueLog(msg[0]);
  } else if (msg.length > 1) {
    msg.forEach((log) => {
      trueLog(log);
    });
  }
};
// Just put this snippet on top of your nodejs code.
