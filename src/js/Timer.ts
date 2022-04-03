/**
 * @class Timer constructor
 * @example
 * const time = new Timer(() => console.log('hi'), 1000);
 * console.log(time instanceof Timer); // true
 */
class Timer {
  private timeId = null as NodeJS.Timer | any;

  constructor(callback: Function, time: number) {
    this.timeId = setTimeout(callback, time);
  }

  clear() {
    clearTimeout(this.timeId);
  }
}
