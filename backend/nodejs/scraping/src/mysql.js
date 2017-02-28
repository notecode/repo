// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2017-02-27 21:40:11

var u = require('./util'); 

function conn_mysql(sql, cb) {
  var mysql      = require('mysql');
  var conn = mysql.createConnection({
    host     : 'localhost',
    database : 'my_db2',
    user     : 'admin',
    password : 'admin'
  });

  conn.connect();
  conn.query(sql, function(error, rows, fields) {
      if (error) {
        throw error;
      }

      cb(rows, fields);
    }
  )
  conn.end();
}

function foo() {
  conn_mysql('select * from city', function(rows, fields) {
    u.log('The result is: ', rows[0]);
  });
}

module.exports = {
  foo: foo
};
