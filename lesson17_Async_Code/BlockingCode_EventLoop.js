const btn = document.querySelector('button');

function trackUserHandler() {
	navigator.geolocation.getCurrentPosition(
		(posData) => {
			console.log(posData);
		},
		(error) => {
			console.log(error);
		}
	);
	console.log('this is my position');
}
btn.addEventListener('click', trackUserHandler);

let result = 0;
for (let i = 0; i < 10; i++) {
	result += i;
}

console.log(result);
