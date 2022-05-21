/**
 * measure time execution
 * @see {@link https://stackoverflow.com/a/70004960/6404439}
 * @param func
 * @param args
 */
export function measureRunningTime(
  func: { (arg0: any): void },
  ...args: any[]
) {
  const varToString = (varObj: { func?: (arg0: any) => void }) =>
    Object.keys(varObj)[0];
  const displayName = func.name || varToString({ func });
  console.time(displayName);
  //const tupleArgs = [...args];
  //func(tupleArgs);
  func.apply(null, ...args);
  console.timeEnd(displayName);
}
