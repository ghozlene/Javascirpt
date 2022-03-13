const xhr = new XMLHttpRequest();
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.responseType = 'json';
xhr.onload = () => {
	const listOfPosts = xhr.response;
	for (const post of listOfPosts) {
		const postEl = document.importNode(postTemplate.content, true);

		const title = postEl.querySelector('h2');
		title.textContent = post.title;
		const body = postEl.querySelector('p');
		body.textContent = post.body;
		listElement.append(postEl);
	}
};
xhr.send();
