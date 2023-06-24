/* --------------------------- Meeting 9 | CLick and Change Mini Text ------------------------- */
function changeText() {
  var replaceText = document.getElementsByClassName("mini-text");
  replaceText[0].innerHTML = "Scroll down";

  document.getElementById("icon-up").style.display = "none";
  document.getElementById("icon-down").style.display = "block";

  var iconUp = document.getElementsByClassName("icon-up")[0];

  iconUp.onclick = function () {
    var button = document.getElementsByClassName("icon-down");
    button.style.display = "block";
  };
}

/* --------------------------- Meeting 11 | Button Like Dislike ------------------------- */
var btnLike = document.querySelector("#green");
var btnDislike = document.querySelector("#red");

if (btnLike) {
  btnLike.onclick = likeColor;
}
if (btnDislike) {
  btnDislike.onclick = dislikeColor;
}

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

/* --------------------------- Meeting 12 | Change Jumbotron Image ------------------------- */
function changeImage(element) {
  element.setAttribute("src", "assets/img-header2.png");
  // element.setAttribute("height", "300")
  // element.setAttribute("class", "jumbotron-img")
}

function changeImageBack(element) {
  element.setAttribute("src", "assets/img-header.png");
  // element.setAttribute("height", "300")
}

/* --------------------------- Challenge of Meeting 12 | Change Jumbotron Title ------------------------- */
function changeTitle(element) {
  element.innerHTML = "Create Simple Game and Website";
}

function changeTitleBack(element) {
  element.innerHTML = "Get Programming Tips Here!";
}

/* --------------------------- Meeting 14 | Closeable Item ------------------------- */
//add close button on each list
var myNodeList = document.getElementsByTagName("li");
var i;
for (i = 0; i < myNodeList.length; i++) {
  var span = document.createElement("span");
  span.innerHTML = "x";
  myNodeList[i].appendChild(span).setAttribute("class", "close");
}

//close list
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = this.parentElement;
    div.style.display = "none";
  };
}

//add new list
function newElement() {
  var li = document.createElement("li");

  var inputValue = document.getElementById("myInput").value;
  // var t = document.createTextNode(inputValue);
  // console.log(t)

  if (inputValue === "" || inputValue === " ") {
    alert("Data tidak boleh kosong!");
  } else {
    document
      .getElementById("myUL")
      .appendChild(li)
      .setAttribute("class", "search-tags-item");

    li.innerHTML = inputValue;
  }

  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  span.innerHTML = "x";
  li.appendChild(span).setAttribute("class", "close");

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    };
  }
}

/* ---------------------------------- Image Slider ---------------------------------- */
var slides = document.querySelectorAll(".slide");
var buttons = document.querySelectorAll(".slider-btn");
// console.log(buttons)
let currentSlide = 1;

/* ---------------------------------- Manual Image Slider ---------------------------------- */
var manualNav = function (manual) {
  /* add/delete class active on every item of array slides and buttons alternately*/
  slides.forEach(function (slide) {
    slide.classList.remove("active");

    buttons.forEach((btn) => {
      btn.classList.remove("active");
    });
  });

  slides[manual].classList.add("active");
  buttons[manual].classList.add("active");
};

// Call function to set event when class active is clicked
buttons.forEach(function (btn, i) {
  btn.addEventListener("click", function () {
    manualNav(i);
    currentSlide = i;
  });
});

/* ---------------------------------- Autoplay Image Slider ---------------------------------- */
var repeat = function () {
  let active = document.getElementsByClassName("active");
  let i = 1;

  var repeater = function () {
    //same as manualNav function, to add/delete class active alternately
    //but it has different condition to run, which is every 5s
    setTimeout(function () {
      [...active].forEach(function (activeSlide) {
        activeSlide.classList.remove("active");
      });

      slides[i].classList.add("active");
      buttons[i].classList.add("active");
      i++;

      // console.log(i);
      if (slides.length == i) {
        i = 0;
      }
      if (i >= slides.length) {
        return;
      }
      repeater();
    }, 5000);
  };
  repeater();
};
repeat();

/* ---------------------------------- AOS Library ---------------------------------- */
var projectsAnimation = document.querySelectorAll(".project");

projectsAnimation.forEach((project, index) => {
  project.dataset.aos = "fade-down";
  project.dataset.aosDuration = 1500;
  project.dataset.aosDelay = index * 300;
  // console.log(project);
  // console.log(index);
});

// AOS.init({
//   once: true,
// });
AOS.init();

/* ---------------------------------- Contact Modal ---------------------------------- */
var btnSubmit = document.querySelector(".submit");
console.log(btnSubmit);
var modal = document.querySelector(".modal-container");
console.log(modal);

if (btnSubmit) {
  btnSubmit.addEventListener("click", function () {
    modal.classList.add("show");
    const next = document.querySelector(".next");
    // console.log(next);
    next.setAttribute(
      "value",
      "https://cobee-the-junior-programmer.netlify.app/contact.html"
    );
  });
}

// var btnCloseModal = document.querySelector(".close-modal");
// if (modal) {
//   btnCloseModal.addEventListener("click", function () {
//     modal.classList.remove("show");
//   });
// }

/* ---------------------------------- Splash Screen ---------------------------------- */

var splash = document.querySelector(".splash");
if (splash) {
  document.addEventListener("DOMContentLoaded", function (event) {
    setTimeout(function () {
      splash.style.display = "none";
    }, 4000);
  });
}

var animate = document.querySelector(".astronaut-takeoff");
if (animate) {
  document.addEventListener("DOMContentLoaded", function (event) {
    setTimeout(function () {
      animate.classList.add("animation");
    }, 400);
  });
}

var splashText = document.querySelector(".splash-text");
if (splashText) {
  setTimeout(function () {
    splashText.innerHTML = "Come in!";
  }, 2000);
}
