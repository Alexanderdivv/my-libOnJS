function changeText() {
  let replaceText = document.getElementsByClassName("mini-text");
  replaceText[0].innerHTML = "Scroll untuk melihat";

  document.getElementById("icon-up").style.display = "none";

  document.getElementById("icon-down").style.display = "block";
}

var btnLike = document.querySelector("#green");
var btnDislike = document.querySelector("#red");
btnLike.onclick = likeColor;
btnDislike.onclick = dislikeColor;
function likeColor() {
  if (btnDislike.classList.contains("red")) {
    btnDislike.classList.remove("red");
  }
  this.classList.toggle("green");
}
function dislikeColor() {
  if (btnLike.classList.contains("green")) {
    btnLike.classList.remove("green");
  }
  this.classList.toggle("red");
}
