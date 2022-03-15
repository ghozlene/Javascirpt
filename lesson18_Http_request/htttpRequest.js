const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');
const form = document.querySelector('#new-post form');
const fetchButton = document.querySelector('#available-posts button');
const postList = document.querySelector('ul');
//Sending HTTP REQUEST
function sendHttpRequest(method, url, data) {
	// const promise = new Promise((resolve, reject) => {
	// st xhr = new XMLHttpRequest();
	// xhr.setRequestHeader('Content-Type', 'application/json');
	// 	xhr.open(method, url);

	// 	xhr.responseType = 'json';
	// 	xhr.onload = () => {
	// 		if (xhr.status >= 200 && xhr.status < 300) {
	// 			resolve(xhr.response);
	// 		} else {

	// 			reject(new Error('something goes wrong '));
	// 		}
	// 	};
	// 	//this is trigger just when for example connexion not for a server error i mean

	// 	xhr.onerror = () => {
	// 		reject(new Error('failed to send a request '));
	// 	};
	// 	xhr.send(JSON.stringify(data));
	// });
	// return promise;

	return fetch(url, {
		method: method,
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then((response) => {
			if (response.status >= 200 && response.status < 300) {
				return response.json();
			} else {
				return response.json().then((errData) => {
					console.log(errData);
					throw new Error('server side problem');
				});
			}
		})
		.catch((err) => {
			console.log(err);
			throw new Error('something goes wrong ');
		});
}
//Create GET REQUEST
async function fetchPost() {
	try {
		const responseData = await sendHttpRequest(
			'GET',
			'https://jsonplaceholder.typicode.com/pos'
		);

		const listOfPosts = responseData;
		for (const post of listOfPosts) {
			const postEl = document.importNode(postTemplate.content, true);

			postEl.querySelector('h2').textContent = post.title.toUpperCase();

			postEl.querySelector('p').textContent = post.body;
			postEl.querySelector('li').id = post.id;

			listElement.append(postEl);
		}
	} catch (error) {
		alert(error.message);
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

//sending a delete request
postList.addEventListener('click', (event) => {
	if (event.target.tagName === 'BUTTON') {
		const posId = event.target.closest('li').id;
		sendHttpRequest(
			'DELETE',
			`https://jsonplaceholder.typicode.com/posts/${posId}`
		);
	}
});
