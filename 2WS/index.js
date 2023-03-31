const todoList = document.querySelector("#todolist");
const doneList = document.querySelector("#donelist");
const addBtn = document.querySelector("#add-item-btn");
const categoryInput = document.querySelector("#category-input");
const selectedCategory = categoryInput.value;
const priorityInput = document.querySelector("#priority-input");
const contentInput = document.querySelector("#content-input");

let todoHeading = document.querySelector("#todo-heading");
let doneHeading = document.querySelector("#done-heading");


priorityInput.addEventListener("input", function () {
  if (priorityInput.value < 1) {
    priorityInput.value = 1;
    errorMessage.textContent = "";
  } else if (priorityInput.value > 4) {
    priorityInput.value = 4;
    errorMessage.textContent = "Priority must be between 1 and 4";
  } else {
    errorMessage.textContent = "";
  }
});

const createTodoItem = (item) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", `priority-${item.priority}`);
  
    const iconDiv = document.createElement("div");
    iconDiv.classList.add("icon");
    iconDiv.innerHTML = item.icon;
    todoItem.appendChild(iconDiv);
  
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("content");
    const heading = document.createElement("h3");
    heading.textContent = item.content;
    const priority = document.createElement("p");
    contentDiv.appendChild(heading);
    contentDiv.appendChild(priority);
    todoItem.appendChild(contentDiv);
  
    todoList.appendChild(todoItem);
  
    todoItem.addEventListener("click", function () {
      if (todoList.contains(todoItem)) {
        doneList.appendChild(todoItem);
        contentDiv.classList.add("done");
      } else if (doneList.contains(todoItem)) {
        todoList.appendChild(todoItem);
        contentDiv.classList.remove("done");
      }
      updateListCount();
    });    
  };

const todoItems = [
  {
    category: "to-buy",
    priority: 3,
    content: "Buy monster and bread",
    icon: "<i class='fas fa-shopping-cart'></i>"
  },
  {
    category: "work",
    priority: 2,
    content: "Submit report to Sipi boss",
    icon: "<i class='fas fa-file-alt'></i>"
  },
  {
    category: "school",
    priority: 1,
    content: "Study for Vajda math exam",
    icon: "<i class='fas fa-book'></i>"
  },
  {
    category: "school",
    priority: 4,
    content: "Study for Durczy god exam",
    icon: "<i class='fas fa-book'></i>"
  }

  
];

// Loop through the todoItems array and create a new todo-item div for each item
todoItems.forEach(createTodoItem);




addBtn.addEventListener('click', function (e) {
    e.preventDefault();
    if (categoryInput.value !== "" && priorityInput.value !== "" && contentInput.value !== "") {
        let newItem = {
          category: categoryInput.value,
          priority: priorityInput.value,
          content: contentInput.value,
          icon: ""
        };
        if (categoryInput.value === "to-buy") {
          newItem.icon= "<i class='fas fa-shopping-cart'></i>"
        } else if (categoryInput.value === "work") {
          newItem.icon = "<i class='fas fa-file-alt'></i>";
        } else if (categoryInput.value === "school") {
          newItem.icon = "<i class='fas fa-book'></i>";
        }

        createTodoItem(newItem);
        categoryInput.value = "";
        priorityInput.value = "";
        contentInput.value = "";
        updateListCount();
    }
});

const updateListCount = () => {
    const todoCount = todoList.querySelectorAll(".todo-item").length;
    const doneCount = doneList.querySelectorAll(".todo-item").length;
    document.querySelector("#todolist > h2").textContent = `To Do (${todoCount})`;
    document.querySelector("#donelist > h2").textContent = `Done (${doneCount})`;
  };

updateListCount();
