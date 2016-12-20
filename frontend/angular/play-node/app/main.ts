import { join, chunk } from 'lodash/array';

class Foo {
	bar(): string {
		var a = join([1, 2], ['a', 'b']);
		return 'Hello, I am from Typescript.';
	}
}

var foo = new Foo();
document.body.innerHTML = foo.bar();    
