// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-27 12:09:52

var u = require('./src/util'); 
var scrape = require('./src/scrape');
var mysql = require('./src/mysql');

mysql.conn();

var url = 'http://www.ganji.com/index.htm';
scrape.start(url, function(city) {
  u.log(city);
  mysql.insert_price(city);
});

//mysql.foo();

// for async sql connection, can not disconnect. or It fail.
//mysql.dis_conn();
