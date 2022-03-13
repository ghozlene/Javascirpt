const xhr = new XMLHttpRequest();
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

function sendHttpRequest(method, url) {
	const promise = new Promise((resolve, reject) => {
		xhr.open(method, url);

		xhr.responseType = 'json';
		xhr.onload = () => {
			resolve(xhr.response);
		};
		xhr.send();
	});
	return promise;
}

function fetchPost() {
	sendHttpRequest('GET', 'https://jsonplaceholder.typicode.com/posts').then(
		(responseData) => {
			const listOfPosts = responseData;
			for (const post of listOfPosts) {
				const postEl = document.importNode(postTemplate.content, true);

				postEl.querySelector('h2').textContent = post.title.toUpperCase();

				postEl.querySelector('p').textContent = post.body;

				listElement.append(postEl);
			}
		}
	);
}
fetchPost();
