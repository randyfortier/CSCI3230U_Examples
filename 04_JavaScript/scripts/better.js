// add an onload handler, which fires when the page is loaded
window.onload = function() {
   // lookup one of the elements from the page
   var output = document.getElementById("output");

   // add some dynamic content to the element
   //output.innerHTML = "<h2>Dynamic content</h2>";
   //log(output);

   var sayHi = document.getElementById('sayHi');
   sayHi.onclick = function() {
      // where our message is going to go
      var output = document.getElementById("output");

      // get the name entered by the user
      var nameField = document.getElementById('name');
      var name = nameField.value;

      // output the greeting
      output.innerHTML = '<div>Hello, ' + name + '</div>';

      // bad design - single resp. principle violation

      var ageField = document.getElementById('age');
      var age = parseInt(ageField.value);

      if (age < 18) {
         log('Hello, kid!');
      } else {
         log('Hello, ' + name + '!');
      }
   };

   log('Is 13 a prime number? ' + isPrime(13));
   log('The 8th Fibonacci number is ' + fibonacci(8));
};

function isPrime(number) {
   for (var div = 2; div < number / 2; div++) {
      if ((number % div) == 0) {
         return false;
      }
   }
   return true;
}

function fibonacci(n) {
   if ((n == 0) || (n == 1)) {
      return n;
   }
   return fibonacci(n - 1) + fibonacci(n - 2);
}

function log(message) {
   console.log(message);

   var output = document.getElementById("output");
   output.innerHTML += '<div>' + message + '</div>';
}
