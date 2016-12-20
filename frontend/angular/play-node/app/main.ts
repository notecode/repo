function greeter(person: string) {
	var foo = new Foo();
    return "Hello, " + person + foo.bar();
}

class Foo {
	bar(): string {
		return 'bar';
	}
}

var user = "赵 ";
document.body.innerHTML = greeter(user);    
