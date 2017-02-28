// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-28 12:19:49
// ref:
// https://github.com/ruipgil/scraperjs
 
var u = require('./util'); 
var scraperjs = require('scraperjs');

function start_scrape(url, handler) {
  u.log('intent url: ' + url);
  scraperjs.StaticScraper.create(url)
  .onStatusCode(function(statusCode, utils) {
    u.gLog('City-list page url: ' + utils.url);
    u.log(statusCode);
    if (statusCode != 200) {
      u.u.rLog('Forbidden');
      utils.stop();
    }
  }).scrape(function($) {
    var city = $('.all-city dl dd a');
    return city.map(function () {
      return {name: $(this).text(), url: $(this).attr('href')};
    }).get();
  })
  .then(function(href_list) {
//    href_list[0].url += '/fang5/';
//    house_list_page(href_list[0], handler);

//    for (var i = 0; i < href_list.length && i < 10; i++) {
//      href_list[i].url += '/fang5/';
//      house_list_page(href_list[i], handler);
//    }

    href_list.forEach(function(href) {
      href.url += '/fang5/';
      house_list_page(href, handler);
    });
  });
}

function house_list_page(city, handler) {
  u.log('intent url: ' + city.url);
  scraperjs.StaticScraper.create(city.url)
  .onStatusCode(function(statusCode, utils) {
    u.gLog('House-list page url: ' + utils.url);
    u.log(statusCode);
    if (statusCode != 200) {
      u.rLog('Forbidden');
      utils.stop();
    }
  }).scrape(function($) {
    var price = $('.time');
    return price.map(function () {
      return parseInt($(this).text());
    }).get();
  })
  .then(function(prices) {
    var total = u.math.sum(prices);
    var avg = Math.round(total / prices.length);
    handler(u.extend(city, {avg: avg}));
  });
}

module.exports = {
  start: start_scrape
};
