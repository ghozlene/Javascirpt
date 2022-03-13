const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');

//Sending HTTP REQUEST
function sendHttpRequest(method, url, data) {
	const promise = new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		xhr.open(method, url);

		xhr.responseType = 'json';
		xhr.onload = () => {
			resolve(xhr.response);
		};
		xhr.send(JSON.stringify(data));
	});
	return promise;
}
//Create GET REQUEST
async function fetchPost() {
	const responseData = await sendHttpRequest(
		'GET',
		'https://jsonplaceholder.typicode.com/posts'
	);

	const listOfPosts = responseData;
	for (const post of listOfPosts) {
		const postEl = document.importNode(postTemplate.content, true);

		postEl.querySelector('h2').textContent = post.title.toUpperCase();

		postEl.querySelector('p').textContent = post.body;

		listElement.append(postEl);
	}
}
//create POST REQUEST
async function createPost(title, content) {
	const userId = Math.random();
	const post = {
		title: title,
		body: content,
		userId: userId,
	};
	sendHttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts', post);
}

//adding Event to the fetchButton
fetchButton.addEventListener('click', fetchPost);

//ading Submit to the form when we entering data and then clicking on submit btn(add)
form.addEventListener('submit', (event) => {
	event.preventDefault();
	const entredTitle = event.currentTarget.querySelector('#title').value;
	const endredContent = event.currentTarget.querySelector('#content').value;
	createPost(entredTitle, endredContent);
});
