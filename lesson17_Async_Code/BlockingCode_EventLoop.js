const btn = document.querySelector('button');

function trackUserHandler() {
	navigator.geolocation.getCurrentPosition(
		(posData) => {
			setTimeout(() => {
				console.log(posData);
			}, 2000);
		},

		(error) => {
			console.log(error);
		}
	);
	setTimeout(() => {
		console.log('time is up');
	}, 0);
	console.log('this is my position');
}

btn.addEventListener('click', trackUserHandler);

let result = 0;
for (let i = 0; i < 10; i++) {
	result += i;
}

console.log(result);
