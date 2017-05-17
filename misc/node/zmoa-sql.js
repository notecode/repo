var fs = require('fs');
var csv = require("fast-csv");
var mus = require('Mustache');
var cnt = 0;
var okCnt = 0;
 
var args = require('command-line-args')

const optDef = [
    { name: 'src', type: String, multiple: false, defaultOption: true },
]

const opt = args(optDef);

if (null == opt.src || 0 == opt.src.length) {
    console.log('1) use like this: ')
    console.log('   node zmoa-sql.js foo.csv');

    console.log('2) when succ, this: ')
    console.log('   node zmoa-sql.js foo.csv > out.sql');
    process.exit(-1);
}

function arrToObj(data) {
    return {
        id: data[0],       // 1
        pinyin: data[1],   // Wangkeji
        pass: data[2],     // 123456
        num: data[3],      // U000151
        name: data[4],     // 王科技
        province: data[5], // 广东
        city: data[6],     // 深圳
        role: data[7],     // 售后服务人员
        phone: data[8],    // 13100001111
    };
}

console.log('-- ' + opt.src);
csv.fromPath(opt.src).on("data", function(data){
    ++cnt;

    if (data.length === 0) {
        return;
    }

    var schema = 'insert into users(name,job_number,nick,province_id,city_id,password,salt,role,mobile) ';
    var values = 'values("{{d.name}}","{{d.num}}","{{d.name}}","{{fn.prov}}","{{fn.city}}","{{fn.pwd}}","afds","{{fn.role}}","{{d.phone}}");';

    var one = arrToObj(data);
    var res = mus.render(values, {
        d: one,
        fn: {
            prov: function() {
                return this.d.province == '广东' ? '6' : 'error: 未知省';
            },
            city: function() {
                return this.d.city == '深圳' ? '77' : 'error: 未知城市';
            },
            pwd: function() {
                // 123456
                return "7bb382ea81a7e0377b5cf5022309eae48280931f";
            },
            role: function() {
                switch (this.d.role) {
                    case '管理员':
                        return '1';
                    case '销售员':
                    case '销售人员':
                        return '2';
                    case '售后服务人员':
                        return '3';
                    default:
                        return 'error: 未知角色';
                }
            }
        }
    });
    
    if (res.indexOf('error') > -1) {
        console.log('');
        console.log('--- error ----');
        console.log('line' + cnt + ': ' + data);
        console.log('error: ' + res);
        console.log('');
        process.exit(-1);
    } else {
        console.log(schema + res);
        ++okCnt;
    }
}).on("end", function(){
    console.log("-- bingo!");
    console.log('-- succ rows: ' + okCnt);
});
