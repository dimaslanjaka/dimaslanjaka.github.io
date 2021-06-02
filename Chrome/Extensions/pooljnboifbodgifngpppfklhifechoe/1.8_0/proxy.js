// prettier-ignore
$(document).ready(function() {
  let proxies = {};

  loadData();
  getProxies();
  $("#clear").click(clearAll);

  async function loadData() {
    const { ip, port } = await getStorage(["ip", "port"]);
    if (ip && port) {
      showStatus(`Proxy set - <b>${ip}:${port}</b>`);
      showBadge();
    } else {
      clearData();
    }
  }

  async function getProxies() {
    $("#proxies").html("<p>Loading...</p>");

    const url = "https://www.socks-proxy.net/";
    try {
      const res = await $.ajax({ url, cache: false });
      const rows = $(res).find("#proxylisttable tbody tr");
      if (!rows.length) {
        throw new Error();
      }
      $(rows).each(function() {
        const ip = $(this).find("td:eq(0)").text();
        const port = $(this).find("td:eq(1)").text();
        const country = $(this).find("td:eq(3)").text();
        if (proxies[country]) {
          proxies[country].push({ ip, port });
        } else {
          proxies[country] = [{ ip, port }];
        }
      });
    } catch (e) {}

    if (!Object.keys(proxies).length) {
      $("#proxies").html("<p>Sorry. We couldn't find any working proxies now. Please try again later.</p>");
      return;
    }
    loadProxies();
  }

  function loadProxies() {
    $("#proxies").html(`
      <select style="width: 200px">
        <option value="">Select</option>
        ${Object.keys(proxies).sort().map(p => `<option value="${p}">${p}</option>`).join("")}
      </select>
      </br></br>
      <div id="new_proxy"></div>
    `);
    $("select").on('change', function() {
      const country = this.value;
      if (!country) {
        $("#new_proxy").text("Select a country");
        return;
      }
      showProxies(proxies[country]);
    });
  }

  function showProxies(proxyList) {
    $("#new_proxy").empty();
    if (!proxyList) return;
    $(proxyList).each(function(i, proxy) {
      $("#new_proxy").append(`<a class="proxylist" href=#>${proxy.ip}:${proxy.port}</a></br>`);
    });
    $(".proxylist").on("click", async function() {
      const [ ip, port ] = $(this).text().split(":");
      await enableProxy(ip, port);
    });
  }

  async function enableProxy(ip, port) {
    const details = {
      value: {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "socks4",
            host: ip,
            port: Number(port)
          }
        }
      },
      scope: "regular"
    };
    await setProxy(details);
    await setStorage({ ip, port });
    loadData();
  }

  function showStatus(html) {
    $("#cur_proxy").html(html);
  }

  function clearData() {
    $("select").val("");
    $("#new_proxy").empty();
    showStatus("Proxy not used");
    hideBadge();
  }

  function showBadge() {
    chrome.browserAction.setBadgeText({ text: "ON" }, function() {
      chrome.browserAction.setBadgeBackgroundColor({ color: "#008000" });
    });
  }

  function hideBadge() {
    chrome.browserAction.setBadgeText({ text: "" });
  }

  function setProxy(details) {
    return new Promise(r => chrome.proxy.settings.set(details, r));
  }

  function clearProxy() {
    const details = {
      scope: "regular"
    };
    return new Promise(r => chrome.proxy.settings.clear(details, r));
  }

  function setStorage(data) {
    return new Promise(r => chrome.storage.sync.set(data, r));
  }

  function getStorage(data) {
    return new Promise(r => chrome.storage.sync.get(data, result => r(result)));
  }

  function clearStorage() {
    return new Promise(r => chrome.storage.sync.clear(r));
  }

  async function clearAll() {
    await clearProxy();
    await clearStorage();
    clearData();
  }
})
