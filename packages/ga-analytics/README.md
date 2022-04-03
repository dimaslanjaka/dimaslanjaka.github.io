ga-analytics https://github.com/sfarthin/ga-analytics
============

Direct access to your Google Analytics reports on the [command-line](https://github.com/sfarthin/ga-analytics#command-line) and within  [node](https://github.com/sfarthin/ga-analytics#node-module).

To use the module you will need a Google Service Account connected to Google Analytics. You will need these pieces of information:

- [Google Client id](https://console.developers.google.com/) ([screenshot](https://raw.githubusercontent.com/sfarthin/ga-analytics/master/service-account.jpg))
- [Google Services Email](https://console.developers.google.com/) ([screenshot](https://raw.githubusercontent.com/sfarthin/ga-analytics/master/service-account.jpg))
- Google Service Account private key (path to .pem file)
- [Google Analytics table/view](https://www.google.com/analytics/) ([screenshot](https://raw.githubusercontent.com/sfarthin/ga-analytics/master/tableid.png))

See Google's [Dimensions & Metrics Reference](https://developers.google.com/analytics/devguides/reporting/core/dimsmets) and take a look at some of the examples below to get started.

    $ ga-analytics -m ga:users,ga:sessions -d ga:pagePath,ga:pageTitle
    ┌────────────────────────────┬─────────────────────────────────────────┬─────────────────┬────────────────────┐
    │ pagePath (STRING)          │ pageTitle (STRING)                      │ users (INTEGER) │ sessions (INTEGER) │
    ├────────────────────────────┼─────────────────────────────────────────┼─────────────────┼────────────────────┤
    │ /                          │ My Main Page                            │ 35              │ 60                 │
    ├────────────────────────────┼─────────────────────────────────────────┼─────────────────┼────────────────────┤
    │ /internal-page/            │ My internal Page                        │ 12              │ 1                  │
    └────────────────────────────┴─────────────────────────────────────────┴─────────────────┴────────────────────┘
    Total users: 47
    Total sessions: 61


## Setup

This module requires a Google Service Account connected to your GA account.

### Creating a Service Account

1. Visit the [Google Developer Console](https://console.developers.google.com/)
2. Click APIs and enabled Analytics API
2. Click credentials
3. Create new client ID
4. Create a service account

### Incorperate service account.

After you create a service account you should recieve a .p12 file. Convert the .p12 (key and certificate in one) to an ascii formatted .pem which can be read as text. Use this command:

    $ openssl pkcs12 -in *.p12 -out google-services-private-key.pem -nodes -clcerts

The password is always "notasecret"

### Authorize your service account for Google Analytics

1. Access [Google Analytics](https://www.google.com/analytics/) and click Admin
2. Click on "User Management", [add your google service email with read permissions](https://raw.githubusercontent.com/sfarthin/ga-analytics/master/analytics.png)

## Command-Line

    $ npm install ga-analytics -g
    $ ga-analytics --help

    Usage: ga-analytics [options]

    Options:

      -h, --help                     output usage information
      -V, --version                  output the version number
      --client-id [clientid]         OAuth client id. Can be omitted if the GOOGLEAPI_CLIENTID environment variable is set.
      --service-email [email]        Google Service Account Email. Can be omitted if the GOOGLEAPI_EMAIL environment variable is set.
      --key [path_to_key]            Path to Service Account private key. Can be omitted if the GOOGLEAPI_KEY environment variable is set.
      --ids [ids]                    Google Analytics view (profile). Can be omitted if the GOOGLEAPI_ANALYTICS_TABLE environment variable is set.
      -s, --start-date [start-date]  Start Date (2010-01-01). Defaults to one month ago
      -e, --end-date [end_date]      End Date (2010-01-15). Defaults to one month after start date.
      -m, --metrics [metric]         Metric, gs:sessions by default
      -d, --dimensions [dimension]   Dimension (ga:source,ga:keyword)
      -s, --sort [sort]              Sort (-ga:sessions,source)
      -f, --filter [filter]          Filter (ga:medium==organic)
      --max [num]                    Define the max amount of results
      --json                         Show entire JSON output rather than formatted results.
      
    $ export GOOGLEAPI_CLIENTID="******.apps.googleusercontent.com"
    $ export GOOGLEAPI_EMAIL="*****@developer.gserviceaccount.com"
    $ export GOOGLEAPI_KEY="/path/to/google-services.pem"
    $ export GOOGLEAPI_ANALYTICS_TABLE="ga:12345678"
    $ ga-analytics 
     ┌────────────────────┐
     │ sessions (INTEGER) │
     ├────────────────────┤
     │ 83                 │
     └────────────────────┘
     
     Total sessions: 83
     
    $ ga-analytics -d ga:pagePath
     ┌────────────────────────────┬────────────────────┐
     │ pagePath (STRING)          │ sessions (INTEGER) │
     ├────────────────────────────┼────────────────────┤
     │ /                          │ 63                 │
     ├────────────────────────────┼────────────────────┤
     │ /aronson/                  │ 2                  │
     ├────────────────────────────┼────────────────────┤
     │ /furtherreading/           │ 4                  │
     ├────────────────────────────┼────────────────────┤
     │ /furtherreading/index.html │ 0                  │
     ├────────────────────────────┼────────────────────┤
     │ /history/                  │ 1                  │
     ├────────────────────────────┼────────────────────┤
     │ /index.html                │ 9                  │
     ├────────────────────────────┼────────────────────┤
     │ /jigsawbuttontest/         │ 3                  │
     ├────────────────────────────┼────────────────────┤
     │ /tips/                     │ 1                  │
     └────────────────────────────┴────────────────────┘
     
     Total sessions: 83
     
    $ ga-analytics -d ga:pagePath -m ga:users,ga:sessions
     ┌────────────────────────────┬─────────────────┬────────────────────┐
     │ pagePath (STRING)          │ users (INTEGER) │ sessions (INTEGER) │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /                          │ 25              │ 64                 │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /aronson/                  │ 3               │ 2                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /furtherreading/           │ 14              │ 4                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /furtherreading/index.html │ 3               │ 0                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /history/                  │ 12              │ 1                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /index.html                │ 12              │ 9                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /jigsawbuttontest/         │ 3               │ 3                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /tips/                     │ 12              │ 1                  │
     └────────────────────────────┴─────────────────┴────────────────────┘
     
     Total users: 84
     Total sessions: 84
     
    $ ga-analytics -d ga:pagePath -m ga:users,ga:sessions -s 2014-11-18 -e 2014-11-22
     ┌────────────────────────────┬─────────────────┬────────────────────┐
     │ pagePath (STRING)          │ users (INTEGER) │ sessions (INTEGER) │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /                          │ 23              │ 46                 │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /furtherreading/           │ 13              │ 4                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /furtherreading/index.html │ 1               │ 0                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /history/                  │ 9               │ 1                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /index.html                │ 11              │ 8                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /jigsawbuttontest/         │ 3               │ 3                  │
     ├────────────────────────────┼─────────────────┼────────────────────┤
     │ /tips/                     │ 11              │ 1                  │
     └────────────────────────────┴─────────────────┴────────────────────┘
     
     Total users: 71
     Total sessions: 63

## Node Module

    var gaAnalytics = require("ga-analytics");

    gaAnalytics({
        metrics: "ga:users",
        clientId: "******.apps.googleusercontent.com",
        serviceEmail: "*****@developer.gserviceaccount.com",
        key: "/path/to/google-services.pem",
        ids: "ga:12345678"
    }, function(err, res) {	
        if(err) throw err;
        console.log(res);
    });

#### Output

    { kind: 'analytics#gaData',
      id: 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:*******&metrics=ga:users&start-date=2014-10-21&end-date=2014-11-21',
      query: 
       { 'start-date': '2014-10-21',
         'end-date': '2014-11-21',
         ids: 'ga:93873080',
         metrics: [ 'ga:users' ],
         'start-index': 1,
         'max-results': 1000 },
      itemsPerPage: 1000,
      totalResults: 1,
      selfLink: 'https://www.googleapis.com/analytics/v3/data/ga?ids=ga:******&metrics=ga:users&start-date=2014-10-21&end-date=2014-11-21',
      profileInfo: 
       { profileId: '*****',
         accountId: '****',
         webPropertyId: 'UA-******-*',
         internalWebPropertyId: '90277455',
         profileName: 'All Web Site Data',
         tableId: 'ga:93873080' },
      containsSampledData: false,
      columnHeaders: [ { name: 'ga:users', columnType: 'METRIC', dataType: 'INTEGER' } ],
      totalsForAllResults: { 'ga:users': '33' },
      rows: [ [ '33' ] ] }
