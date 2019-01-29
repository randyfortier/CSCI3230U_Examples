window.onload = function() {
   // var jsPattern = /javascript/
   var jsPattern = new RegExp("javascript");
   if (jsPattern.test('Is javascript a good language?')) {
      console.log('test passed!');
   } else {
      console.log('test failed!');
   }

   var costPattern = /\$\d+(\.\d{2})?/;
   var review = 'I paid $199.99 for this item...';
   var updatedReview = review.replace(costPattern, '$...');
   console.log('updated review: ' + updatedReview);

   wordPattern = /the/ig;   // i - case insensitive, g - global
   var sentence = 'The quick brown fox jumped over the lazy dog.';
   var updatedSentence = sentence.replace(wordPattern, 'a');
   console.log('updated sentence: ' + updatedSentence);

   emailPattern = /^[a-zA-Z_\.]+@\w+(\.\w+)+$/;
   //email = 'randy.fortier@uoit.ca';
   email = 'randy_fortier@uoit';
   if (emailPattern.test(email)) {
      log('The email address is legit.');
   } else {
      log('The email is invalid.');
   }
};

function log(message) {
   var output = document.getElementById('output');
   output.innerHTML += message;
}
