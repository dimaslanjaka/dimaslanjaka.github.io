/**
 * @class Generate unique id
 */
class GeneratorID {
  private rand: number;

  constructor() {
    this.rand = Math.floor(Math.random() * 26) + Date.now();
  }

  /**
   * Increase new id
   */
  genId() {
    return this.rand++;
  }

  getId() {
    this.genId();
    return jQuery.fn.jquery + "." + this.rand;
  }
}
