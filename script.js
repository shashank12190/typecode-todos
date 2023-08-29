const apiUrl = `https://jsonplaceholder.typicode.com/todos`;

const getTodos = () => {
  fetch(apiUrl + `?_limit=10`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((todo) => addTodoToDOM(todo));
    });
};

function addTodoToDOM(todo) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(todo.title));
  div.setAttribute("data-id", todo.id);
  div.classList.add("todo");
  document.getElementById("todo-list").appendChild(div);
  if (todo.completed) {
    div.classList.add("done");
  }
}

function createTodo(e) {
  e.preventDefault();
  const todo = {
    title: e.target.firstElementChild.value,
    completed: false,
  };
  fetch(apiUrl, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => addTodoToDOM(data));
  e.target.firstElementChild.value = "";
}

function toggleTodo(e) {
  if (e.target.classList.contains("todo")) {
    e.target.classList.toggle("done");
  }
  updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
}

function updateTodo(id, completed) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    body: JSON.stringify({ completed }),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

function deleteTodo(e) {
  const id = e.target.dataset.id;
  fetch(`${apiUrl}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
const init = () => {
  document.addEventListener("DOMContentLoaded", getTodos);
  document.querySelector("#todo-form").addEventListener("submit", createTodo);
  document.querySelector("#todo-list").addEventListener("click", toggleTodo);
  document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo);
};

init();
