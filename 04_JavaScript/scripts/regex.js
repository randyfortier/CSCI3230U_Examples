window.onload = function() {
   var jsPattern = new RegExp("javascript");
   if (jsPattern.test('Is javascript a good language?')) {
      console.log('test passed!');
   } else {
      console.log('test failed!');
   }

   var costPattern = /\$\d+(\.\d+)?/;
};
