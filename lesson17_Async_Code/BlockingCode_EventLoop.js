const btn = document.querySelector('button');

const setTimer = (duration) => {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('done !');
		}, duration);
	});
	return promise;
};

function trackUserHandler() {
	navigator.geolocation.getCurrentPosition(
		(posData) => {
			setTimer(2000).then((data) => console.log(data, posData));
		},

		(error) => {
			console.log(error);
		}
	);
	setTimer(0).then(() => {
		console.log('time is up');
	});
	console.log('this is my position');
}

btn.addEventListener('click', trackUserHandler);

let result = 0;
for (let i = 0; i < 10; i++) {
	result += i;
}

console.log(result);
