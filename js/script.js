const mdui = /** @type {import("mdui/es/interfaces/MduiStatic").MduiStatic} */ (window.mdui);
/**
 * @type {import("mdui/es/interfaces/MduiStatic").MduiStatic['$']}
 */
const $$ = mdui.$;

/* Gotop */
$$(function () {
  $$(window).on("scroll", function (e) {
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop !== 0) {
      $$("#gotop").removeClass("mdui-fab-hide");
    } else {
      $$("#gotop").addClass("mdui-fab-hide");
    }
  });
  $$("#gotop").on("click", function (e) {
    (function animateScroll() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop !== 0) {
        window.requestAnimationFrame(animateScroll);
        window.scrollTo(0, scrollTop - scrollTop / 5);
      }
    })();
  });
});

/* Dark Mode */
function mediaSupported() {
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
}
const preferDarkMode = function () {
  return mediaSupported || localStorage.getItem("mdui-theme-layout-dark");
};
// if dark mode selected, turn on dark mode
if (preferDarkMode()) {
  document.body.classList.toggle("mdui-theme-layout-dark", true);
}

/*window.onload = () => {
  // handle media change
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (e.matches) {
      document.body.classList.toggle("mdui-theme-layout-dark", true);
      //localStorage.setItem("mdui-theme-layout-dark", "true");
    } else {
      document.body.classList.toggle("mdui-theme-layout-dark", false);
      //localStorage.removeItem("mdui-theme-layout-dark");
    }
  });
};*/

$$(function () {
  $$("#dark-mode-button").on("click", function (e) {
    e.preventDefault();
    if (document.body.classList.contains("mdui-theme-layout-dark")) {
      document.body.classList.remove("mdui-theme-layout-dark");
      localStorage.removeItem("mdui-theme-layout-dark");
    } else {
      document.body.classList.add("mdui-theme-layout-dark");
      localStorage.setItem("mdui-theme-layout-dark", "true");
    }
  });

  if ($$("#donate").length) {
    var tab = new mdui.Tab("#donate .mdui-tab");
    $$("#donate").on("opened.mdui.dialog", function (e) {
      tab.handleUpdate();
    });
  }
});

/* Drawer State */
$$(function () {
  $$("#sidebar").on("open.mdui.drawer", function (e) {
    localStorage.removeItem("mdui-drawer-close");
  });
  $$("#sidebar").on("close.mdui.drawer", function (e) {
    localStorage.setItem("mdui-drawer-close", true);
  });
});

/* Sidebar Collapse Item State */
$$(function () {
  $$(".mdui-collapse-item")
    .eq(0)
    .on("close.mdui.collapse", function (e) {
      localStorage.removeItem("mdui-collapse-item-0");
    });
  $$(".mdui-collapse-item")
    .eq(0)
    .on("open.mdui.collapse", function (e) {
      localStorage.setItem("mdui-collapse-item-0", true);
    });
  $$(".mdui-collapse-item")
    .eq(1)
    .on("close.mdui.collapse", function (e) {
      localStorage.removeItem("mdui-collapse-item-1");
    });
  $$(".mdui-collapse-item")
    .eq(1)
    .on("open.mdui.collapse", function (e) {
      localStorage.setItem("mdui-collapse-item-1", true);
    });
  $$(".mdui-collapse-item")
    .eq(2)
    .on("close.mdui.collapse", function (e) {
      localStorage.removeItem("mdui-collapse-item-2");
    });
  $$(".mdui-collapse-item")
    .eq(2)
    .on("open.mdui.collapse", function (e) {
      localStorage.setItem("mdui-collapse-item-2", true);
    });
  $$(".mdui-collapse-item")
    .eq(3)
    .on("close.mdui.collapse", function (e) {
      localStorage.removeItem("mdui-collapse-item-3");
    });
  $$(".mdui-collapse-item")
    .eq(3)
    .on("open.mdui.collapse", function (e) {
      localStorage.setItem("mdui-collapse-item-3", true);
    });
});

/* Search */
var searchFunc = function (path, search_id, content_id) {
  $$.ajax({
    url: path,
    dataType: "xml",
    success: function (xmlResponse) {
      var datas = $$(xmlResponse)
        .map(function () {
          return this.tagName === "SEARCH" ? this : null;
        })
        .find("entry")
        .map(function () {
          return {
            title: $$(this).find("title").text(),
            content: $$(this).find("content").text(),
            url: $$(this).find("url").text(),
          };
        })
        .get();
      var $input = $$(search_id)[0];
      var $resultContent = $$(content_id)[0];
      $input.addEventListener("input", function () {
        var str = '<ul class="search-result-list">';
        var keywords = this.value
          .trim()
          .toLowerCase()
          .split(/[\s\-]+/);
        $resultContent.innerHTML = "";
        if (this.value.trim().length <= 0) {
          return;
        }
        datas.forEach(function (data) {
          var isMatch = true;
          if (!data.title || data.title.trim() === "") {
            data.title = "Untitled";
          }
          var orig_data_title = data.title.trim();
          var data_title = orig_data_title.toLowerCase();
          var orig_data_content = data.content.trim().replace(/<[^>]+>/g, "");
          var data_content = orig_data_content.toLowerCase();
          var data_url = data.url;
          var index_title = -1;
          var index_content = -1;
          var first_occur = -1;
          if (data_content !== "") {
            keywords.forEach(function (keyword, i) {
              index_title = data_title.indexOf(keyword);
              index_content = data_content.indexOf(keyword);
              if (index_title < 0 && index_content < 0) {
                isMatch = false;
              } else {
                if (index_content < 0) {
                  index_content = 0;
                }
                if (i == 0) {
                  first_occur = index_content;
                }
              }
            });
          } else {
            isMatch = false;
          }
          if (isMatch) {
            str +=
              '<li><a href="' + data_url + '" class="search-result-title" target="_blank">' + orig_data_title + "</a>";
            var content = orig_data_content;
            if (first_occur >= 0) {
              var start = first_occur - 20;
              var end = first_occur + 80;
              if (start < 0) {
                start = 0;
              }
              if (start == 0) {
                end = 100;
              }
              if (end > content.length) {
                end = content.length;
              }
              var match_content = content.substr(start, end);
              keywords.forEach(function (keyword) {
                var regS = new RegExp(keyword, "gi");
                match_content = match_content.replace(regS, '<em class="search-result-keyword">$&</em>');
              });
              str += '<p class="search-result-content">' + match_content + "...</p>";
            }
            str += "</li>";
          }
        });
        str += "</ul>";
        $resultContent.innerHTML = str;
      });
    },
  });
};
$$(function () {
  var ele = $$("#search .search-form-input")[0];
  $$("#search").on("opened.mdui.dialog", function (e) {
    ele.focus();
  });
  $$(document).on("click", function (e) {
    if ($$(e.target).closest("#search").length <= 0) {
      $$(".search-form-input").val("");
      $$(".search-result").html("");
    }
  });
  let loadRes = false;
  $$(window).on("scroll", function (e) {
    if (!loadRes) {
      const resource = $$(".search-result").attr("data-resource");
      if (resource) searchFunc(resource, ".search-form-input", ".search-result");
    }
  });
});
