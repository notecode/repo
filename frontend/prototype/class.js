// AUTHOR:   SongErwei
// ROLE:    	
// CREATED:  2016-05-28 17:33:05

function log(t) {
	console.log(t)
}

function Animal(type) {
	this.type = type;
}

Animal.prototype = {
	hasLife: true,
	say: function() {
		log('hello');
	}
}

Animal.some = 'some';


var anim = new Animal('x');

function Dog() {
	Animal.call(this, 'dog');
	this.foots = 4;
}

//Dog.prototype = Animal.prototype;
Dog.prototype = new Animal('x');

var dog = new Dog();
log(dog.type);
log(dog.foots);
log(dog.hasLife);
dog.say();
