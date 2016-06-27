// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-06-25 23:48:48
 
function log(t) {
    console.log(t);
} 

function A() {
}
A.prototype.funcA = function() {
    log('funcA');
}

//---------------------------

function B() {
}

// B.prototype = A.prototype;

B.prototype.funcB = function() {
    log('funcB');
}

var a = new A();

var b = new B();
//b.funcA();
b.funcB();
