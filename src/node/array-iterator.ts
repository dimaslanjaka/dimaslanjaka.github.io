export class array_iterator {
  data: any[];
  constructor(arr: any[]) {
    this.data = arr;
  }
  /**
   * @see {@link https://stackoverflow.com/a/62889031/6404439}
   * @returns
   */
  values() {
    const items = [...this.data.values()];
    const index = -1;

    return {
      [Symbol.iterator]() {
        return this;
      },

      next() {
        const item = items[index + 1];
        if (item) {
          return {
            value: item,
            done: false,
          };
        }
        return { done: true };
      },

      previous() {
        const item = items[index - 1];
        if (item) {
          return {
            value: item,
            done: false,
          };
        }
        return { done: true };
      },
    };
  }
}
