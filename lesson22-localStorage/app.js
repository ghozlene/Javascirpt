const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

const userId = '123a';
const user = {
	name: 'achref',
	age: '25',
	hobbies: ['sports', 'cookings'],
};

storeBtn.addEventListener('click', () => {
	localStorage.setItem('uid', userId);
	localStorage.setItem('user', JSON.stringify(user));
});

retrieveBtn.addEventListener('click', () => {
	const userKey = localStorage.getItem('uid');
	const getUser = localStorage.getItem('user');

	if (userKey) {
		console.log('Got this Id' + userKey);
		console.log('this is the user', JSON.parse(getUser));
	} else {
		console.log('empty Id');
	}
});
