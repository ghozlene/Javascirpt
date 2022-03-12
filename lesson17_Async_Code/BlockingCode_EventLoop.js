const btn = document.querySelector('button');

const getPosition = (opts) => {
	const promise = new Promise((reslove, reject) => {
		navigator.geolocation.getCurrentPosition(
			(success) => {
				console.log('my position is');
				reslove(success);
			},
			(error) => {
				reject(error);
			},
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

async function trackUserHandler() {
	let positionData;
	let data;
	try {
		positionData = await getPosition();
		data = await setTimer(3000);
	} catch (err) {
		console.log(err);
	}
	console.log(data, positionData);
	/**
	 * ! Chaining Promise with then can help you reading your data that not being
	 * ! in promise at first but with Async await in the function assign with async
	 * ! you need to wait until the resolve of the promise or the error and then
	 * ! you will get the data after it
	 */
	// getPosition()
	// 	.then((posData) => {
	// 		positionData = posData;
	// 		return setTimer(2000);
	// 	})
	// 	.catch((err) => {
	// 		console.log(err);
	// 		return 'on we go...';
	// 	})
	// 	.then((data) => {
	// 		console.log(data, positionData);
	// 	});
	setTimer(1000).then(() => {
		console.log('time is up');
	});
	console.log('this is my position');
}

//

btn.addEventListener('click', trackUserHandler);

let result = 0;
for (let i = 0; i < 10; i++) {
	result += i;
}

console.log(result);
