var button = document.querySelector("button");
// button.addEventListener("click", function () {
//   alert("event listener 1");
// });

// button.addEventListener("click", function () {
//   alert("event listener 2");
// });

// onclick
// button.onclick = function () {
//   alert("onclick 32");
// };

// button.onclick = function () {
//   alert("onclick 3");
// };

function rotateGif(element) {
  element.style.transform = "translate (12px, 5px) rotate(180deg)";
  // element.style.transform = "rotate(180deg)";
}
function rotateBack(element) {
  element.style.transform = "translate (29px, 90px) rotate(0deg)";
}
