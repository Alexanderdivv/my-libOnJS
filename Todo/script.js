// var to save the list of tasks
var tasks = [];

// function to add a task
function addTask() {
  // get the task from the input
  var task = document.getElementById("input").value;
  if (task != "") {
    // add the task to the list
    tasks.push(task);
    // update the list
    updateList();
  }
  // clear the input
  document.getElementById("input").value = "";
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
      ")'><i class='fa-solid fa-trash'></i></button>" +
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
  // create input to update the task
  var text =
    "<div class='form2'><input type='text' id='input2' value='" +
    tasks[i] +
    "'><button id='add2' onclick='saveTask(" +
    i +
    ")'>Save</button></div>";
  // update the list
  document.getElementById("list").innerHTML = text;
}

function saveTask(i) {
  // get the task from the input
  var task = document.getElementById("input2").value;
  // update the task in the list
  tasks[i] = task;
  // update the list
  updateList();
}
