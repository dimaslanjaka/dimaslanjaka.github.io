/**
 * Detect is mobile
 */
function isMobile() {
  const target = navigator.userAgent || navigator.vendor || window.opera;
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      target
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      target.substr(0, 4)
    )
  ) {
    if (!Cookies.has("deviceInfo")) {
      if (typeof toastr != "undefined") {
        toastr.info("is Mobile", "Your Device");
      } else {
        console.log("isMobile");
      }
      Cookies.set("deviceInfo", "x", 1, "d", null, null);
    }
    return true;
  } else {
    if (!Cookies.has("deviceInfo")) {
      if (typeof toastr != "undefined") {
        toastr.info("is Desktop", "Your Device");
      } else {
        console.log("isDesktop");
      }
      Cookies.set("deviceInfo", "x", 1, "d", null, null);
    }
    return false;
  }
}

function get_device() {
  var unknown: string,
    width: string | number,
    height: string,
    screenSize: string,
    browser: string,
    version: string,
    majorVersion: number,
    mobile: boolean,
    os: string,
    osVersion: string | RegExpExecArray | number[],
    cookieEnabled: boolean,
    flashVersion = "-";
  if (!isnode()) {
    // screen

    if (screen.width) {
      width = screen.width ? screen.width : "";
      height = screen.height ? screen.height.toString() : "";
      screenSize += "" + width + " x " + height;
    }

    // browser
    const nVer = navigator.appVersion;
    const nAgt = navigator.userAgent;
    browser = navigator.appName;
    version = "" + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
    let nameOffset: number, verOffset: number, ix: any;

    // Opera
    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Opera Next
    if ((verOffset = nAgt.indexOf("OPR")) != -1) {
      browser = "Opera";
      version = nAgt.substring(verOffset + 4);
    }
    // Edge
    else if ((verOffset = nAgt.indexOf("Edge")) != -1) {
      browser = "Microsoft Edge";
      version = nAgt.substring(verOffset + 5);
    }
    // MSIE
    else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(verOffset + 5);
    }
    // Chrome
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browser = "Chrome";
      version = nAgt.substring(verOffset + 7);
    }
    // Safari
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browser = "Safari";
      version = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1) {
        version = nAgt.substring(verOffset + 8);
      }
    }
    // Firefox
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browser = "Firefox";
      version = nAgt.substring(verOffset + 8);
    }
    // MSIE 11+
    else if (nAgt.indexOf("Trident/") != -1) {
      browser = "Microsoft Internet Explorer";
      version = nAgt.substring(nAgt.indexOf("rv:") + 3);
    }
    // Other browsers
    else if ((nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/"))) {
      browser = nAgt.substring(nameOffset, verOffset);
      version = nAgt.substring(verOffset + 1);
      if (browser.toLowerCase() == browser.toUpperCase()) {
        browser = navigator.appName;
      }
    }
    // trim the version string
    if ((ix = version.indexOf(";")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(" ")) != -1) version = version.substring(0, ix);
    if ((ix = version.indexOf(")")) != -1) version = version.substring(0, ix);

    majorVersion = parseInt("" + version, 10);
    if (isNaN(majorVersion)) {
      version = "" + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    // mobile version
    mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

    // cookie
    cookieEnabled = navigator.cookieEnabled ? true : false;

    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
      document.cookie = "testcookie";
      cookieEnabled = document.cookie.indexOf("testcookie") != -1 ? true : false;
    }

    // system
    var os = unknown;
    const clientStrings = [
      { s: "Windows 10", r: /(Windows 10.0|Windows NT 10.0)/ },
      { s: "Windows 8.1", r: /(Windows 8.1|Windows NT 6.3)/ },
      { s: "Windows 8", r: /(Windows 8|Windows NT 6.2)/ },
      { s: "Windows 7", r: /(Windows 7|Windows NT 6.1)/ },
      { s: "Windows Vista", r: /Windows NT 6.0/ },
      { s: "Windows Server 2003", r: /Windows NT 5.2/ },
      { s: "Windows XP", r: /(Windows NT 5.1|Windows XP)/ },
      { s: "Windows 2000", r: /(Windows NT 5.0|Windows 2000)/ },
      { s: "Windows ME", r: /(Win 9x 4.90|Windows ME)/ },
      { s: "Windows 98", r: /(Windows 98|Win98)/ },
      { s: "Windows 95", r: /(Windows 95|Win95|Windows_95)/ },
      {
        s: "Windows NT 4.0",
        r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/,
      },
      { s: "Windows CE", r: /Windows CE/ },
      { s: "Windows 3.11", r: /Win16/ },
      { s: "Android", r: /Android/ },
      { s: "Open BSD", r: /OpenBSD/ },
      { s: "Sun OS", r: /SunOS/ },
      { s: "Chrome OS", r: /CrOS/ },
      { s: "Linux", r: /(Linux|X11(?!.*CrOS))/ },
      { s: "iOS", r: /(iPhone|iPad|iPod)/ },
      { s: "Mac OS X", r: /Mac OS X/ },
      { s: "Mac OS", r: /(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
      { s: "QNX", r: /QNX/ },
      { s: "UNIX", r: /UNIX/ },
      { s: "BeOS", r: /BeOS/ },
      { s: "OS/2", r: /OS\/2/ },
      {
        s: "Search Bot",
        r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/,
      },
    ];
    for (const id in clientStrings) {
      const cs = clientStrings[id];
      if (cs.r.test(nAgt)) {
        os = cs.s;
        break;
      }
    }

    osVersion = unknown;

    if (/Windows/.test(os)) {
      osVersion = /Windows (.*)/.exec(os)[1];
      os = "Windows";
    }

    switch (os) {
      case "Mac OS X":
        osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
        break;

      case "Android":
        osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
        break;

      case "iOS":
        osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
        var calc = osVersion.exists(3) ? osVersion[3] : osVersion[0];
        osVersion = osVersion[1] + "." + osVersion[2] + "." + calc; //(osVersion[3] | 0);
        break;
    }

    // flash (you'll need to include swfobject)
    /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
    var flashVersion = "no check";
    if (typeof swfobject != "undefined") {
      const fv = swfobject.getFlashPlayerVersion();
      if (fv.major > 0) {
        flashVersion = fv.major + "." + fv.minor + " r" + fv.release;
      } else {
        flashVersion = unknown;
      }
    }
  } else {
    const terminal = require("os");
    os = terminal.platform();
    version = terminal.version();
  }
  return {
    screen: screenSize,
    browser: browser,
    browserVersion: version,
    browserMajorVersion: majorVersion,
    mobile: mobile,
    os: os,
    osVersion: osVersion,
    cookies: cookieEnabled,
    flashVersion: flashVersion,
  };
}

if (typeof module != "undefined") {
  module.exports.get_device = get_device;
}
