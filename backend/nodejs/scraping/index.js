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

//var url = 'https://www.upwork.com/o/jobs/browse/c/web-mobile-software-dev/';
var url = 'http://localhost/upwork.com/';

scraperjs.StaticScraper.create(url)
.onStatusCode(function(statusCode, utils) {
  gLog('The target: ' + utils.url);
  log(statusCode);
  if (statusCode != 200) {
    rLog('Forbidden');
    utils.stop();
  }
}).scrape(function($) {
  log('do scrape');

  return $("a[href*='job/_~']").map(function() {
    return $(this).attr('href');
  }).get();
})
.then(function(news) {
  log(news);
})
