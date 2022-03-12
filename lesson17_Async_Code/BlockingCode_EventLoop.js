const btn = document.querySelector('button');

function showMessage() {
	console.log('this event is run after the loop (async code)');
}
btn.addEventListener('click', showMessage);

let result = 0;
for (let i = 0; i < 10; i++) {
	result += i;
}

console.log(result);
