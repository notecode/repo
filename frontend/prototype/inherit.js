// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-05-30 14:23:03
 
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
B.prototype.funcB = function() {
    log('funcB');
}

//---------------------------

function C() {
}

C.prototype = new B(); 


