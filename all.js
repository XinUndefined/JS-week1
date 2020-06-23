//綁定
let todoInput = document.getElementById("newTodo");
let addBtn = document.getElementById("addTodo");
let clearAllBtn = document.getElementById("clearTask");
let todoList = document.getElementById("todoList");
let countTodo = document.getElementById("taskCount");
let todoData = JSON.parse(localStorage.getItem("listData")) || [];

//監聽
addBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keydown", addTodo);
clearAllBtn.addEventListener("click", clearAllTask);
todoList.addEventListener("click", doSomething);

// 初始
window.onload = renderPage();

//新增
function addTodo(e) {
  if (e.keyCode == 13 || e.type == "click") {
    if (todoInput.value.trim() !== "") {
      todoData.push({
        id: Math.floor(Date.now()),
        title: todoInput.value.trim(),
        completed: false,
      });
      localStorage.setItem("listData", JSON.stringify(todoData));
      renderPage();
      todoInput.value = "";
    }
  }
}

// 刪除一筆
function removeTodo(id) {
  let newIndex = 0;
  todoData.forEach((item, key) => {
    if (id == item.id) {
      newIndex = key;
    }
  });
  todoData.splice(newIndex, 1);
  localStorage.setItem("listData", JSON.stringify(todoData));
  renderPage();
}

// 項目勾選
function completeTodo(id) {
  todoData.forEach((item) => {
    if (id == item.id) {
      item.completed = item.completed ? false : true;
    }
  });
  localStorage.setItem("listData", JSON.stringify(todoData));
  renderPage();
}

// 刪除全部
function clearAllTask(e) {
  e.preventDefault();
  todoData = [];
  localStorage.clear();
  renderPage();
}

function doSomething(e) {
  let action = e.target.parentNode.dataset.action;
  let id = e.target.parentNode.dataset.id;
  if (action == "remove") {
    removeTodo(id);
  } else if (action === "complete") {
    completeTodo(id);
  }
}

// 畫面
function renderPage() {
  let str = "";
  todoData.forEach((item) => {
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
  countTodo.textContent = todoData.length;
}
