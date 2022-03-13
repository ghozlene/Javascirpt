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

function trackUserHandler() {
	// let positionData;
	// let data;
	// try {
	// 	positionData = await getPosition();
	// 	data = await setTimer(3000);
	// } catch (err) {
	// 	console.log(err);
	// }

	/**
	 * ! Chaining Promise with then can help you reading your data that not being
	 * ! in promise at first but with Async await in the function assign with async
	 * ! you need to wait until the resolve of the promise or the error and then
	 * ! you will get the data after it
	 */
	getPosition()
		.then((posData) => {
			positionData = posData;
			return setTimer(2000);
		})
		.catch((err) => {
			console.log(err);
			return 'on we go...';
		})
		.then((data) => {
			console.log(data, positionData);
		});
	setTimer(1000).then(() => {
		console.log('time is up');
	});
	console.log('this is my position');
}

//!race return the fastest excution between the two promise the one who finish first
//! will return
Promise.race([setTimer(1000), getPosition()]).then((data) => console.log(data));
btn.addEventListener('click', trackUserHandler);

//! it will return a table of the data of the 2 promise but if one of
//! the pormise fail it will return directly an error
Promise.all([setTimer(1000), getPosition()]).then((promiseData) =>
	console.log(promiseData)
);
//! it will return a table with objects the content of the object is
//! status:(fulfield or rejected) and the value:(error or the value : in our example
//! is the position and the done! message)
Promise.allSettled([setTimer(1000), getPosition()]).then((promiseData) =>
	console.log(promiseData)
);

let result = 0;
for (let i = 0; i < 10; i++) {
	result += i;
}

console.log(result);
