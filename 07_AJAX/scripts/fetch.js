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

   button = document.getElementById('csvButton');
   button.onclick = function() {
      fetch('test_data.csv')
         .then((resp) => resp.text())
         .then(function(data) {
            var firstNameField = document.getElementById('csvFirstName');
            var lastNameField = document.getElementById('csvLastName');

            rows = data.split('\n');
            firstRow = rows[0].split(',');

            firstNameField.setAttribute('value', firstRow[0]);
            lastNameField.setAttribute('value', firstRow[1]);
         })
         .catch(function(error) {
            console.log(error);
         });
   };

   button = document.getElementById('jsonButton');
   button.onclick = function() {
      fetch('test_data.json')
         .then((resp) => resp.json())
         .then(function(data) {
            var firstNameField = document.getElementById('jsonFirstName');
            var lastNameField = document.getElementById('jsonLastName');

            firstNameField.setAttribute('value', data.firstName);
            lastNameField.setAttribute('value', data.lastName);
         })
         .catch(function(error) {
            console.log(error);
         });
   };

   button = document.getElementById('xmlButton');
   button.onclick = function() {
      fetch('test_data.xml')
         .then((resp) => resp.text())
         .then(function(textData) {
            var firstNameField = document.getElementById('xmlFirstName');
            var lastNameField = document.getElementById('xmlLastName');

            data = parseXML(textData);
            person = data.getElementsByTagName('person')[0];
            firstNameValue = person.getAttribute('firstName');
            lastNameValue = person.getAttribute('lastName');

            firstNameField.setAttribute('value', firstNameValue);
            lastNameField.setAttribute('value', lastNameValue);
         })
         .catch(function(error) {
            console.log(error);
         });
   };
};

function parseXML(xmlText) {
   parser = new window.DOMParser();
   return parser.parseFromString(xmlText, 'text/xml');
}
