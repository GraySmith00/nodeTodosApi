// based on https://gist.github.com/paulirish/12fb951a8b893a454b32
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};

NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach((elem) => {
    elem.on(name, fn);
  });
};

document.addEventListener("DOMContentLoaded", function() {
    console.log('hey there partner');
    
    axios.get('/api/todos')
    .then(addTodos)

});


function addTodos(res) {
    res.data.forEach(todo => {
        console.log(todo.name);
        const ul = $('.list');
        const li = document.createElement('li');
        li.innerText = todo.name;
        li.classList.add('task');
        ul.appendChild(li);
    });
}



