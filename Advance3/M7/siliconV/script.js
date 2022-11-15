window.addEventListener("scroll", reveal);
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  reveals.forEach((reveal) => {
    var windowHeight = window.innerHeight;
    var revealTop = reveal.getBoundingClientRect().top; // getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    var revealPoint = 40; // reveal point is the point at which the element will be revealed
    if (revealTop < windowHeight - revealPoint) {
      reveal.classList.add("active");
    } else {
      reveal.classList.remove("active");
    }
  });
}
