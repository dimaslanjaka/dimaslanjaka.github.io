// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BotDetector {
  static Tests = {
    KEYUP: "keyup",
    MOUSE: "mousemove",
    SWIPE: "swipe",
    SWIPE_TOUCHSTART: "touchstart",
    SWIPE_TOUCHMOVE: "touchmove",
    SWIPE_TOUCHEND: "touchend",
    SCROLL: "scroll",
    GESTURE: "gesture",
    GYROSCOPE: "gyroscope",
    DEVICE_MOTION: "devicemotion",
    DEVICE_ORIENTATION: "deviceorientation",
    DEVICE_ORIENTATION_MOZ: "MozOrientation",
  };
  isBot: boolean;
  tests: {};
  detected: boolean;
  cases: {};
  callback: any;
  timeout: any;
  allMatched: boolean;
  lastRotationData: any;

  constructor(args) {
    const self = this;
    self.isBot = false;
    self.tests = {};

    const selectedTests = args.tests || [];
    if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.SCROLL) != -1) {
      self.tests[BotDetector.Tests.SCROLL] = function () {
        const e = function () {
          self.tests[BotDetector.Tests.SCROLL] = true;
          self.update();
          self.unbindEvent(window, BotDetector.Tests.SCROLL, e);
          self.unbindEvent(document, BotDetector.Tests.SCROLL, e);
        };
        self.bindEvent(window, BotDetector.Tests.SCROLL, e);
        self.bindEvent(document, BotDetector.Tests.SCROLL, e);
      };
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.MOUSE) != -1) {
      self.tests[BotDetector.Tests.MOUSE] = function () {
        const e = function () {
          self.tests[BotDetector.Tests.MOUSE] = true;
          self.update();
          self.unbindEvent(window, BotDetector.Tests.MOUSE, e);
        };
        self.bindEvent(window, BotDetector.Tests.MOUSE, e);
      };
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.KEYUP) != -1) {
      self.tests[BotDetector.Tests.KEYUP] = function () {
        const e = function () {
          self.tests[BotDetector.Tests.KEYUP] = true;
          self.update();
          self.unbindEvent(window, BotDetector.Tests.KEYUP, e);
        };
        self.bindEvent(window, BotDetector.Tests.KEYUP, e);
      };
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.SWIPE) != -1) {
      self.tests[BotDetector.Tests.SWIPE_TOUCHSTART] = function () {
        const e = function () {
          self.tests[BotDetector.Tests.SWIPE_TOUCHSTART] = true;
          self.update();
          self.unbindEvent(document, BotDetector.Tests.SWIPE_TOUCHSTART);
        };
        self.bindEvent(document, BotDetector.Tests.SWIPE_TOUCHSTART);
      };
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.DEVICE_MOTION) != -1) {
      self.tests[BotDetector.Tests.DEVICE_MOTION] = function () {
        const e = function (event) {
          if (event.rotationRate.alpha || event.rotationRate.beta || event.rotationRate.gamma) {
            const userAgent = navigator.userAgent.toLowerCase();
            const isAndroid = userAgent.indexOf("android") != -1;
            const beta = isAndroid ? event.rotationRate.beta : Math.round(event.rotationRate.beta / 10) * 10;
            const gamma = isAndroid ? event.rotationRate.gamma : Math.round(event.rotationRate.gamma / 10) * 10;
            if (!self.lastRotationData) {
              self.lastRotationData = {
                beta: beta,
                gamma: gamma,
              };
            } else {
              let movement = beta != self.lastRotationData.beta || gamma != self.lastRotationData.gamma;
              if (isAndroid) {
                movement = movement && (beta > 0.2 || gamma > 0.2);
              }
              const args = { beta: beta, gamma: gamma };
              self.tests[BotDetector.Tests.DEVICE_MOTION] = movement;
              self.update();
              if (movement) {
                self.unbindEvent(window, BotDetector.Tests.DEVICE_MOTION, e);
              }
            }
          } else {
            self.tests[BotDetector.Tests.DEVICE_MOTION] = false;
          }
        };
        self.bindEvent(window, BotDetector.Tests.DEVICE_MOTION, e);
      };
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.DEVICE_ORIENTATION) != -1) {
      self.tests[BotDetector.Tests.DEVICE_ORIENTATION] = function () {
        const e = function () {
          self.tests[BotDetector.Tests.DEVICE_ORIENTATION] = true;
          self.update();
          self.unbindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION, e);
        };
        self.bindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION);
      };
    }
    if (selectedTests.length == 0 || selectedTests.indexOf(BotDetector.Tests.DEVICE_ORIENTATION_MOZ) != -1) {
      self.tests[BotDetector.Tests.DEVICE_ORIENTATION_MOZ] = function () {
        const e = function () {
          self.tests[BotDetector.Tests.DEVICE_ORIENTATION_MOZ] = true;
          self.update();
          self.unbindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION_MOZ);
        };
        self.bindEvent(window, BotDetector.Tests.DEVICE_ORIENTATION_MOZ);
      };
    }

    self.cases = {};
    self.timeout = args.timeout || 1000;
    self.callback = args.callback || null;
    self.detected = false;
  }

  update(notify = false) {
    const self = this;
    let count = 0;
    let tests = 0;
    for (const i in self.tests) {
      if (self.tests.hasOwnProperty(i)) {
        self.cases[i] = self.tests[i] === true;
        if (self.cases[i] === true) {
          count++;
        }
      }
      tests++;
    }
    self.isBot = count == 0;
    self.allMatched = count == tests;
    if (notify !== false) {
      self.callback(self);
    }
  }

  bindEvent(e, type, handler?) {
    if (e.addEventListener) {
      e.addEventListener(type, handler, false);
    } else if (e.attachEvent) {
      e.attachEvent("on" + type, handler);
    }
  }

  unbindEvent(e, type, handle?) {
    if (e.removeEventListener) {
      e.removeEventListener(type, handle, false);
    } else {
      const evtName = "on" + type;
      if (e.detachEvent) {
        if (typeof e[evtName] === "undefined") {
          e[type] = null;
        }
        e.detachEvent(evtName);
      }
    }
  }

  monitor() {
    const self = this;
    for (const i in this.tests) {
      if (this.tests.hasOwnProperty(i)) {
        this.tests[i].call();
      }
    }
    this.update(false);
    setTimeout(function () {
      self.update(true);
    }, self.timeout);
  }
}

if (typeof module !== "undefined" && module.exports) {
  module.exports.BotDetector = BotDetector;
}
