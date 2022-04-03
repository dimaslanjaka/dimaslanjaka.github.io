// fix article published and updated date

import chalk from "chalk";
import { execSync } from "child_process";
import { appendFileSync, existsSync, mkdirSync, statSync, unlinkSync, writeFileSync } from "fs";
import moment from "moment";
import { dirname, join } from "path";
import { cwd } from "process";
import { LooseObject, parsePostReturn } from "../../markdown/transformPosts";

const logfile = join(cwd(), "tmp/article-dates.json");
if (!existsSync(dirname(logfile))) mkdirSync(dirname(logfile), { recursive: true });
const results: Results = {};
interface Results extends LooseObject {
  [key: string]: ResultData;
}
interface ResultData {
  meta?: string;
  git?: string;
}

export default function articleDate(parse: parsePostReturn) {
  if (typeof process.env.GITFLOW !== "undefined") return;
  // src-post path
  const sourceFile = parse.fileTree.source;
  const statsSource = statSync(sourceFile);
  const mtime = statsSource.mtime;
  const modified_file = moment(mtime);
  const isTodaySource = moment(0, "HH").diff(modified_file, "days") == 0;
  if (parse && parse.metadata.updated) {
    //results[sourceFile] = { meta: parse.metadata.updated };
    const localdate = moment(parse.metadata.updated);
    // get modified date from git commit date
    const stdout = execSync(`git log -1 --pretty="format:%cD" "${sourceFile}"`, { encoding: "utf8" });
    const gitdate = moment(stdout.trim()); //.format("YYYY-MM-DDTHH:mm:ssZ");
    const isToday = moment(0, "HH").diff(gitdate, "days") == 0;
    if (isToday && isTodaySource) console.log(sourceFile);
    //results[sourceFile].git = stdout;
    //writeFileSync(logfile, JSON.stringify(results, null, 4));
  } else {
    console.error(chalk.redBright("[date][error]"), sourceFile);
  }
}

/*

              const mtime = stats.mtime;
              const modified_file = moment(mtime).format("YYYY-MM-DDTHH:mm:ssZ");
              // if modified today, try get modification date from git commit
              const isToday = moment(modified_file).isSame(moment(), "day"); // O/P : **true**

// only run this function on localhost (not github workflow)
              if (typeof process.env.GITFLOW === "undefined") {
              }

                const format_stdout = moment(stdout.trim()).format("YYYY-MM-DDTHH:mm:ssZ");
                // only run if existing post updated time is different with git modified time
                if (parse.metadata.updated != format_stdout) {
                  parse.metadata.updated = format_stdout;
                  // save the git modified time to source post file
                  const parseSource = parsePost(sourceFile);
                  parseSource.metadata.updated = format_stdout;
                  // only store modified time to original source post file when both modified date is different
                  if (parse.metadata.updated !== parseSource.metadata.updated) {
                    appendFileSync(
                      join(__dirname, "tmp/updated-time.log"),
                      `Update ${sourceFile} with ${format_stdout} from ${parseSource.metadata.updated}\n`
                    );
                    //saveParsedPost(parseSource, sourceFile);
                  }
                }*/
