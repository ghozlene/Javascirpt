const xhr = new XMLHttpRequest();
const listElement = document.querySelector('.posts');
const postTemplate = document.getElementById('single-post');

xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts');
xhr.responseType = 'json';

xhr.send();
