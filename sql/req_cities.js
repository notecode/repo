// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-10-06 14:19:53

// 用于调试
function dlog(x) {
//	console.log(x);
}
function out(x) {
	console.log(x);
}

var request = require('request');
var pinyin = require("chinese-to-pinyin"); 

var cfg = {
	prov_cate: [
		{id: 1, name: '省'},
		{id: 2, name: '市'},
		{id: 3, name: '自治区'},
		{id: 4, name: '特别行政区'},
	]
}

function sql_create_table_prov_cate() {
	out('CREATE TABLE province_cate (');
	out('id INT AUTO_INCREMENT PRIMARY KEY,')
	out('name VARCHAR (20) DEFAULT NULL')
	out(');')
}
function sql_create_table_prov() {
	out('CREATE TABLE province (');
	out('id INT AUTO_INCREMENT PRIMARY KEY,')
	out('name VARCHAR (50) DEFAULT NULL,')
	out('cate INT references province_cate(id)')
	out(');')
}
function sql_create_table_city() {
	out('CREATE TABLE city (');
	out('id INT AUTO_INCREMENT PRIMARY KEY,')
	out('name VARCHAR (50) DEFAULT NULL,')
	out('py1 CHAR (1) DEFault 0,')
	out('in_province INT references province(id)')
	out(');')
}

function sql_create_tables() {
	sql_create_table_prov_cate();
	sql_create_table_prov();
	sql_create_table_city();
}

function sql_insert_prov_cate(cate) {
	out('INSERT INTO province_cate (name) VALUES ("' + cate.name + '");');
}

function sql_insert_prov(name, cate_id) {
	out('INSERT INTO province (name, cate) VALUES ("' + name + '", ' + cate_id + ');');
}

function sql_insert_city(name, py1, in_prov_id) {
	out('INSERT INTO city (name, py1, in_province) VALUES ("' + name + '", "' + py1 + '", ' + in_prov_id + ');');
}


function sql_insert_all_prov_cates() {
	each_in(cfg.prov_cate, function(e) {
		sql_insert_prov_cate(e);
	})
}

function each_in(arr, cb) {
	dlog(arr.length);
	for (var i = 0; i < arr.length; i++) {
		cb(arr[i]);
	}
}

function do_req_amap() {
	function get_inner_china(dis) {
		for (var i = 0; i < dis.length; i++) {
			if (dis[i].adcode === "100000") {
				return dis[i];
			}
		}

		return undefined;
	}

	function get_prov(name) {
		for (var i = 0; i < cfg.prov_cate.length; i++) {
			var cate = cfg.prov_cate[i];
			if (name.indexOf(cate.name) != -1) {
				return {name: name.replace(cate.name, ''), cate: cate};
			}
		}

		return {name: name, cate: cfg.prov_cate[0]};
	}

	function get_city(name, prov_id, succ) {
		if (name.indexOf('市郊县') != -1) {
			; // 忽略这种
		} else {
			var n = name.replace('市市辖区', '').replace('市', '');
			var py1 = pinyin(n, {noTone: true})[0].toUpperCase(); 
			succ({name: n, py1: py1, prov_id: prov_id});
		}
	}

	var uri = "http://restapi.amap.com/v3/config/district?level=country&subdistrict=2&key=1c6b7d0e376ddb2744867aae0aed627c";

	request(uri, function(error, response, body) {
		var dict = JSON.parse(body);
		if ("1" === dict.status && "OK" === dict.info) {
			var china = get_inner_china(dict.districts);
			if (china) {
				each_in(china.districts, function(e) {
					var prov = get_prov(e.name);
					sql_insert_prov(prov.name, prov.cate.id);
				});

				var prov_id = 1;	
				each_in(china.districts, function(e) {
					each_in(e.districts, function(e) {
						get_city(e.name, prov_id, function(city) {
							sql_insert_city(city.name, city.py1, city.prov_id);
						});
					});

					prov_id++;
				});
			}
		} else {
			dlog('error');
		}
	});
}

(function() {
	sql_create_tables();
	sql_insert_all_prov_cates();

	do_req_amap();	
})();

