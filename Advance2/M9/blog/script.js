function changeText() {
  let replaceText = document.getElementsByClassName("mini-text");
  replaceText[0].innerHTML = "Scroll untuk melihat";

  document.getElementById("icon-up").style.display = "none";

  document.getElementById("icon-down").style.display = "block";
}
