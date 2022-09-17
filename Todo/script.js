// var to save the list of tasks
var tasks = [];

// function to add a task
function addTask() {
  // get the task from the input
  var task = document.getElementById("input").value;
  // add the task to the list
  tasks.push(task);
  // update the list
  updateList();
}

function updateList() {
  // create a string with all the tasks
  var text = "<ul>";

  for (var i = 0; i < tasks.length; i++) {
    text +=
      "<li> <div id='text'>" +
      tasks[i] +
      "</div>" +
      "<button id='list' onclick='deleteTask(" +
      i +
      ")'>Del</button>" +
      "<button id='list' onclick='updateTask(" +
      i +
      ")'>Up</button>" +
      "</li>";
  }
  text += "</ul>";
  // update the list
  document.getElementById("list").innerHTML = text;
}

function deleteTask(i) {
  // remove the task from the list
  tasks.splice(i, 1);
  // update the list
  updateList();
}

function updateTask(i) {
  // get the task from the input
  var task = document.getElementById("input").value;
  // add the task to the list
  tasks[i] = task;
  // update the list
  updateList();
}
