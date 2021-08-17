var continents = {
  "AF": "Africa",
  "AN": "Antarctica",
  "AS": "Asia",
  "EU": "Europe",
  "NA": "North America",
  "OC": "Oceania",
  "SA": "South America"
}
loadJSON('./countries.json', function (countries) {
  countries = JSON.parse(countries);
  for (key in countries) {
    var major = countries[key];
    major.country_name = major.name;
    major.country_native = major.native;
    major.continent_name = continents[major.continent];
    delete major.name;
    delete major.native;
    countries[key] = major;
  }
  //document.getElementById('x').innerHTML = "/*Countries*/\n" + JSON.stringify(countries, null, 4);
  loadJSON('./languages.json', function (languages) {
    languages = JSON.parse(languages);
    var key, keys = Object.keys(languages);
    var n = keys.length;
    var newobj = {}
    while (n--) {
      key = keys[n];
      newobj[key.toUpperCase()] = languages[key];
    }
    languages = newobj;
    var result = {}
    for (key in languages) {
      var languageObj = languages[key];
      var countryObj = countries[key];
      languageObj.language_name = languageObj.name;
      languageObj.language_native = languageObj.nativeName;
      delete languageObj.name;
      delete languageObj.nativeName;
      result[key] = Object.assign(languageObj, countryObj);
      languages[key] = languageObj;
    }

    document.getElementById('x').innerHTML = JSON.stringify(result, null, 4);
  });
});

function loadJSON(url, callback) {
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType("application/json");
  xobj.open('GET', url, true); // Replace 'my_data' with the path to your file
  xobj.onreadystatechange = function () {
    if (xobj.readyState == 4 && xobj.status == "200") {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(xobj.responseText);
    }
  };
  xobj.send(null);
}