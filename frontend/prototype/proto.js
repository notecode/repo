// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-05-29 14:56:56
 
function CF() {
    this.q1 = 'q1';
    this.q2 = 'q2';
}

var CFp = {
    CFP1: 'cfp1'
};

CF.prototype = CFp;
// 一般是直接将CFp的定义赋给prototype，无需先定义变量(图中为了说明问题，所以费劲取名)。如下：
// CF.prototype = {
//      CFP1: 'cfp1'
// }
CF.P1 = 'p1';
CF.P2 = 'p2';

var cf1 = new CF();
var cf2 = new CF();
var cf3 = new CF();
var cf4 = new CF();
var cf5 = new CF();

console.log(cf1.q1);   // 'q1'
console.log(cf1.q2);   // 'q2'
console.log(cf1.CFP1); // 'cfp1'
console.log('---');

console.log(cf1.P1);   // undefined, because 'P1 and P2  are not visible to CFp, cf1, ...' 
console.log(cf1.P2);   // undefined
console.log('---');

console.log(CF.P1);    // 'p1'
console.log(CF.CFP1);  // undefined, because 'there is no implicit prototype link between CF and CFp'
console.log(CF.q1);    // undefined




