// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-27 21:40:11

var u = require('./util'); 
var conn;

function conn_mysql() {
  var mysql = require('mysql');
  conn = mysql.createConnection({
    host     : 'localhost',
    database : 'my_db2',
    user     : 'admin',
    password : 'admin'
  });

  u.log('+++conn+++');
  conn.connect();
}

function dis_conn() {
  conn.end();
  u.log('---conn---');
}

function foo() {
  conn.query('select * from city', function(error, rows, fields) {
    if (error) {
      throw error;
    }

    u.log('The result is: ', rows[0]);
  })
}

//  var sql = 'select * from information_schema.tables where table_name = "city_house_price"';

function insert_price(city) {
  q_city_id(conn, city, function(rows) {
    if (rows.length > 0) {
      var sql = 'insert into city_house_price (city_id, house_price) values (' + rows[0].id + ', ' + city.avg + ')';
      u.gLog(sql);

      conn.query(sql, function(error, rows, f) {
        if (error) {
          u.rLog(error);
          //throw error;
        }
      })
    } else {
      u.rLog('not found id in city table: ' + city.name);
    }
  })
}

function q_city_id(conn, city, hdl) {
  var sql = 'select id from city where name like "%' + city.name + '%"';
  conn.query(sql, function(error, rows, f) {
    if (error) {
      throw error;
    }

    hdl(rows);
  }) 
}

module.exports = {
  conn: conn_mysql,
  dis_conn: dis_conn,
  foo: foo,
  insert_price: insert_price
};

