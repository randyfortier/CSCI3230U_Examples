// add an onload handler, which fires when the page is loaded
window.onload = function() {
   // lookup one of the elements from the page
   var output = document.getElementById("output");

   // add some dynamic content to the element
   output.innerHTML = "<h2>Dynamic content</h2>";
};
