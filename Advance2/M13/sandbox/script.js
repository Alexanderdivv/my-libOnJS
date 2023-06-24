var close = document.querySelectorAll(".close");

for (let i = 0; i < close.length; i++) {
  close[i].addEventListener("click", function (e) {
    // console.log(target);
    e.target.parentElement.style.display = "none";
    console.log("ini parent element close", e.target.parentElement);
    e.preventDefault();
  });
}
