let taskList = document.getElementById("taskList");
let taskInput = document.getElementById("taskInput");

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").innerText,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function createTaskElement(text, completed = false) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.innerText = text;

    if (completed) {
        li.classList.add("completed");
    }

    span.addEventListener("click", function() {
        li.classList.toggle("completed");
        saveTasks();
    });

    let delBtn = document.createElement("button");
    delBtn.innerText = "❌";
    delBtn.style.background = "red";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.padding = "5px 8px";
    delBtn.style.borderRadius = "5px";
    delBtn.addEventListener("click", function() {
        li.remove();
        saveTasks();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

function addTask() {
    let text = taskInput.value.trim();
    if (text === "") return;
    createTaskElement(text);
    saveTasks();
    taskInput.value = "";
}

window.onload = loadTasks;
