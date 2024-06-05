document.addEventListener("DOMContentLoaded", function() {
  setTimeout(function() {
    var element = document.querySelector(".avvio");
    element.style.opacity = "1";
  }, 1000);
});

function reveal() {
    var reveals = document.querySelectorAll(".rivela");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 120;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("attivo");
      } else {
        reveals[i].classList.remove("attivo");
      }
    }
  }
  
  window.addEventListener("scroll", reveal);



  function reveal2() {
    var reveals = document.querySelectorAll(".rivela_sotto");
  
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 120;
  
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("attivo_sotto");
      } else {
        reveals[i].classList.remove("attivo_sotto");
      }
    }
  }
  
  window.addEventListener("scroll", reveal2);