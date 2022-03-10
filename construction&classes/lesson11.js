class Person {
	name = 'achref';
	constructor() {
		this.age = 30;
	}

	greeting() {
		console.log('hello world');
	}
}

const p = new Person();
p.greeting();
console.log(p.age);
console.log(p);
