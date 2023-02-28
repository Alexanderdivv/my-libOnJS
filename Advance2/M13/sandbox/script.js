var close = document.querySelectorAll(".close");

for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", function (e) {
    e.target.parentElement.style.display = "none";
    e.preventDefault();
  });
}
