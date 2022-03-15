const storeBtn = document.getElementById('store-btn');
const retrieveBtn = document.getElementById('retrieve-btn');

storeBtn.addEventListener('click', () => {
	const userId = 'u123';
	document.cookie = `uid=${userId}`;
});

retrieveBtn.addEventListener('click', () => {});
