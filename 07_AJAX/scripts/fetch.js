window.onload = function() {
   button = document.getElementById('plainTextButton');
   button.onclick = function() {
      // fetch() - initiates an asynchronous request
      // then() - chain of response data processors
      //          (can be functions or lambdas)
      // catch() - handle any errors that happened anywhere
      //           in the chain
      fetch('test_data.txt')
         .then((resp) => resp.text())
         .then(function(data) {
            // successful request, data is the text
            div = document.getElementById('plainTextDiv');
            div.innerHTML = data;
         })
         .catch(function(error) {
            // an error has occurred
            console.log(error);
         });
   };
};
