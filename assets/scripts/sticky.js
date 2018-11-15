// When the user scrolls the page, execute myFunction
//https://www.w3schools.com/howto/howto_js_navbar_sticky.asp
window.onscroll = function() {
  headerSticky();
};

// Get the navbar
var navbar = document.getElementById('header');

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function headerSticky() {
  if (window.pageYOffset >= sticky && window.pageYOffset > 0) {
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');
  }
}
