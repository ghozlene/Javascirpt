const btn = document.querySelector('button');

const getPosition = (opts) => {
	const promise = new Promise((reslove, reject) => {
		navigator.geolocation.getCurrentPosition(
			(success) => {
				console.log('my position is');
				reslove(success);
			},
			(error) => {},
			opts
		);
	});
	return promise;
};

const setTimer = (duration) => {
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve('done !');
		}, duration);
	});
	return promise;
};

/**
 * ! Chaining Multiple Promises
 */
function trackUserHandler() {
	let positionData;
	getPosition()
		.then((posData) => {
			positionData = posData;
			return setTimer(2000);
		})
		.then((data) => {
			console.log(data, positionData);
		});

	setTimer(1000).then(() => {
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
