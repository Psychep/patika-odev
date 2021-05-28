var form = document.getElementById("todo-form");
var todoList = document.getElementById("list");
var todoText = document.getElementById("task");
var list = document.querySelector("ul");

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
  list.addEventListener("click", deleteTodo);
}

function deleteTodo(e) {
  if (e.target.className === "fa fa-remove") {
    e.target.parentElement.parentElement.remove();
    deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
  }
}

function deleteTodoFromStorage(deleteTodo) {
  let todos = getTodosFromStorage();

  todos.forEach(function (todo, index) {
    if (todo === deleteTodo) {
      todos.splice(index, 1);
    }
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadAllTodosToUI() {
  var todos = getTodosFromStorage();

  todos.forEach(function (todo) {
    addTodoToUI(todo);
  });
}
function addTodo(e) {
  const newTodo = todoText.value.trim();
  if (newTodo === "") {
    $(".error").toast("show");

    setTimeout(function () {
      $(".error").toast("hide");
    }, 1000);
  } else {
    addTodoToUI(newTodo);

    addTodoToStoroge(newTodo);

    $(".success").toast("show");

    setTimeout(function () {
      addTodoToStoroge(newTodo);

      $(".success").toast("hide");
    }, 1000);
  }
  e.preventDefault();
}

function addTodoToUI(newTodo) {
  const listItem = document.createElement("li");
  const link = document.createElement("a");
  link.href = "#";
  link.className = "delete-item";
  link.innerHTML = "<i class = 'fa fa-remove'></i>";
  listItem.className = "list-group-item d-flex justify-content-between";
  listItem.appendChild(document.createTextNode(newTodo));
  listItem.appendChild(link);
  todoList.appendChild(listItem);
  todoText.value = "";
}

function getTodosFromStorage() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}

function addTodoToStoroge(newTodo) {
  let todos = getTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
