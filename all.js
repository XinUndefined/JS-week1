//綁定
let todoInput = document.getElementById("newTodo");
let addBtn = document.getElementById("addTodo");
let clearAllBtn = document.getElementById("clearTask");
let todoList = document.getElementById("todoList");
let countTodo = document.getElementById("taskCount");

//監聽
// todoInput.addEventListener("keydown", addTodo);
addBtn.addEventListener("click", addTodo);
clearAllBtn.addEventListener("click", clearAllTask);
todoList.addEventListener("click", doSomething);

var todoData = [];
renderPage(todoData);

//新增
function addTodo() {
  var newTodo = todoInput.value.trim();
  var timeStamp = Math.floor(Date.now());
  if (newTodo !== "") {
    todoData.push({
      id: timeStamp,
      title: newTodo,
      completed: false,
    });
    renderPage(todoData);
    todoInput.value = "";
  }
}

// 刪除一筆
function removeTodo(id) {
  var newIndex = 0;
  todoData.forEach((item, key) => {
    if (id == item.id) {
      newIndex = key;
    }
  });
  todoData.splice(newIndex, 1);
  renderPage(todoData);
}

// 項目切換
function completeTodo(id) {
  todoData.forEach((item) => {
    if (id == item.id) {
      item.completed = item.completed ? false : true;
    }
  });
  renderPage(todoData);
}

// 刪除全部
function clearAllTask(e) {
  e.preventDefault();
  todoData = [];
  renderPage(todoData);
}

function doSomething(e) {
  var action = e.target.parentNode.dataset.action;
  var id = e.target.parentNode.dataset.id;
  if (action == "remove") {
    removeTodo(id);
  } else if (action === "complete") {
    completeTodo(id);
  }
}

// 畫面
function renderPage(data) {
  var str = "";
  data.forEach((item) => {
    str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check" data-action="complete" data-id="${item.id}">
<input type="checkbox" class="form-check-input" ${
      item.completed ? "checked" : ""
    }>
<label class="form-check-label ${item.completed ? "completed" : ""}"> ${
      item.title
    }</label>
</div>
<button type="button" class="close ml-auto remove" aria-label="Close" data-action="remove" data-id="${
      item.id
    }">
<span aria-hidden="true">&times;</span>
</button>
</div>
</li>`;
  });
  todoList.innerHTML = str;
  countTodo.textContent = data.length;
}
