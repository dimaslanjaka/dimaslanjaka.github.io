/**
 * Timer measurement
 * @see {@link https://stackoverflow.com/a/69985194/6404439}
 */
export default class MeasureTime {
  private startTime = 0;
  private endTime = 0;
  start() {
    this.startTime = new Date().getTime();
    return this;
  }
  /**
   * end indicator
   * @returns dump
   */
  end() {
    this.endTime = new Date().getTime();
    return this.toString();
  }
  measure() {
    console.log(this.toString());
  }
  toString() {
    return `time taken => ${(this.endTime - this.startTime) / 1000} seconds`;
  }
}
