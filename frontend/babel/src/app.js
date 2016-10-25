// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-06-18 15:54:48
 
class Foo {
	bar() {
		console.log('foo::bar');
	}
}

class Bar extends Foo {
	bar() {
		super.bar();
		console.log('bar::bar');
	}
}

var a = new Bar();
a.bar();
