// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-27 12:09:52

var colors = require('colors');
var scraperjs = require('scraperjs');

function log(t) {
  console.log(t);
}
function gLog(t) {
  log(t.green);
}
function rLog(t) {
  log(t.red);
}

var url = 'http://www.ganji.com/index.htm';
//var url = 'http://qd.ganji.com/fang5/h1/';
index_page(url);

function index_page(url) {
  scraperjs.StaticScraper.create(url)
  .onStatusCode(function(statusCode, utils) {
    gLog('City-list page url: ' + utils.url);
    log(statusCode);
    if (statusCode != 200) {
      rLog('Forbidden');
      utils.stop();
    }
  }).scrape(function($) {
    var city = $('.all-city dl dd a');
    return city.map(function () {
      return {name: $(this).text(), home: $(this).attr('href')};
    }).get();
  })
  .then(function(href_list) {
    var url = href_list[0].home + '/fang5/';
    house_list_page(url);

//    href_list.forEach(function(href) {
//      var url = href.home + '/fang5/';
//      log(url);
//      //house_list_page(url);
//    });
  });
}

function house_list_page(url) {
  scraperjs.StaticScraper.create(url)
  .onStatusCode(function(statusCode, utils) {
    gLog('House-list page url: ' + utils.url);
    log(statusCode);
    if (statusCode != 200) {
      rLog('Forbidden');
      utils.stop();
    }
  }).scrape(function($) {
    var price = $('.time');
    return price.map(function () {
      return parseInt($(this).text());
    }).get();
  })
  .then(function(prices) {
    //log(prices);

    var total = 0;
    prices.forEach(function(p) {
      total += p; 
    })

    //log(total / prices.length);
    var avg = Math.round(total / prices.length);
    log(avg);
  });
}

