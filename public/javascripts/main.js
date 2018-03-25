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
    
    $('#todoInput').on('keypress', function(event) {
        if(event.which == 13) {
            createTodo();
        }
    });
    
    $('.list').on('click', function(e) {
        if (e.target && e.target.nodeName === 'LI') {
            
            let clickedId = e.target.id;
            let putUrl = 'api/todos/' + clickedId;
            
            var isDone = e.target.attributes.completed.value;
            
            if (isDone === 'false') {
                var updateData = true;
            } else if (isDone === 'true') {
                var updateData = false;
            }
            
            console.log(updateData);
            
            axios
                .put(putUrl, {
                    completed: updateData
                })
                .then(function(res) {
                    if (res.data.completed) {
                        e.target.className = 'done task';
                        e.target.completed = 'true';
                    }
                    // // if (res.data.completed) {
                    // //     e.target.className = 'done task';
                    // // } else {
                    // //     e.target.className = 'task';
                    // // }
                    // console.log(res.data);
                });
                
        }
    })
    
    $('.list').on('click', function(e) {
        removeTodo(e);
    });

});

// for each todo in the database, call the addTodo's funciton
function addTodos(res) {
    res.data.forEach(todo => {
        addTodo(todo);
    });
}

// add todo in the database
function addTodo(todo) {
    const li = document.createElement('li');
    li.setAttribute('id', todo._id);
    li.setAttribute('completed', todo.completed);
    li.classList.add('task');
    if (todo.completed) {
        li.classList.add('done');
    }
    $('.list').appendChild(li).innerHTML = todo.name + '<span class="item-span">X</span>';
}

// create a new todo, get all todos back again, and then call the addTodo funciton on that todo
function createTodo() {
    const userInput = $('#todoInput').value;
    axios.post('/api/todos', {
        name: userInput
    })
    .then(function(newTodo) {
        axios.get('/api/todos')
        .then(function(res) {
            addTodo(res.data[res.data.length-1]);
            $('#todoInput').value = '';
        })
        .catch(function(err) {
            console.log(err);
        });
    })
    .catch(function(err) {
        console.log(err);
    });
}

function removeTodo(e) {
    //console.log(e.target.nodeName);
    if (e.target.nodeName && e.target.nodeName == 'SPAN') {
        //console.log(e.target.parentNode.id);
        const parentLi = e.target.parentNode;
        const clickedId = e.target.parentNode.id;
        const deleteUrl = 'api/todos/' + clickedId;
    
        axios.delete(deleteUrl, {
            data: { _id: clickedId }
        })
        .then(function(res) {
            //console.log(parentLi);
            parentLi.remove();
            console.log(res.data.message);
        })
        .catch(function(err) {
            console.log(err);
        })
    }    
}




