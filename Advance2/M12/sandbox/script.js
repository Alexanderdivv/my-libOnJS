var button = document.querySelector("button");
// button.addEventListener("click", function () {
//   alert("event listener 1");
// });

// button.addEventListener("click", function () {
//   alert("event listener 2");
// });

// onclick
button.onclick = function () {
  alert("onclick 32");
};

button.onclick = function () {
  alert("onclick 3");
};
