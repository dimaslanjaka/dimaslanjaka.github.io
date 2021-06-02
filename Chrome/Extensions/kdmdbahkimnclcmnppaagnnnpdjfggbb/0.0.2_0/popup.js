/** @type {string[][]} */
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-45974197-2']);
_gaq.push(['_trackPageview']);

(function() {
  var ga = document.createElement('script');
  ga.type = 'text/javascript';
  ga.async = true;
  ga.src = 'https://stats.g.doubleclick.net/dc.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(ga, s);
})();

var worker;
/**
 * set chrome proxy
 * @param {string} server
 * @param {number} port
 */
function setProxy(server, port) {
  var config = {
    mode: "fixed_servers",
    rules: {
      singleProxy: {
        host: server,
        port: port
      }
    }
  };
  chrome.proxy.settings.set({
      value: config,
      scope: 'regular'
    },
    function() {});
}

/**
 * Reset chrome proxy
 */
function resetProxy() {
  var config = {
    mode: "system"
  };
  chrome.proxy.settings.set({
      value: config,
      scope: 'regular'
    },
    function() {});
}

function randomizeProxy() {
  var servers = [];
  var ports = [];
  var rows = [];
  $(".glyphicon").hide();

  $(".row").each(function(i, v) {
    var server = $("input", v)[0].value.toString().trim();
    var port = $("input", v)[1].value.toString().trim();
    if (server.length > 0 && port.length > 0 && !isNaN(parseInt(port))) {
      servers.push(server);
      ports.push(parseInt(port));
      rows.push(i);
    }
  });

  if (servers.length > 0) {
    var rand = Math.floor(Math.random() * servers.length);
    setProxy(servers[rand], ports[rand]);
    $(".row:nth(" + rows[rand] + ") .glyphicon").show();
  } else {
    alert("No valid servers!");
    stopService();
  }
}

$(document).ready(function() {

  addEventListener("unload", function(event) {
    resetProxy();
  }, true);

  $(".glyphicon").hide();

  $(".btn").click(function() {
    if ($(".btn").hasClass("btn-success")) {
      startService();
    } else {
      stopService();
    }
  });

});

function startService() {
  worker = setInterval(function() {
    randomizeProxy()
  }, 60000);;
  $(".btn").removeClass("btn-success");
  $(".btn").addClass("btn-danger");
  $(".btn").text("Stop");
  randomizeProxy();
}

function stopService() {
  clearInterval(worker);
  resetProxy();
  $(".btn").removeClass("btn-danger");
  $(".btn").addClass("btn-success");
  $(".btn").text("Start");
  $(".glyphicon").hide();
}