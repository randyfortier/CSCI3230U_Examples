window.onload = function() {
   button = document.getElementById('plainTextButton');
   button.onclick = function() {
      // create a new XMLHttpRequest object
      //   onreadystatechange - handler for when the request
      //                        (if asynchronous) changes state
      //                       readyState == 4: done
      //   open - provide the HTTP parameters
      //          method - GET, POST, etc.
      //          uri - which document to retrieve
      //          async - boolean, true if asynchronous
      //   send - submit the request
      //        - if asynchronous, executes in background thread
      //        - if synchronous, blocks until completed
      //        - can take POST data (string) as an argument
      request = new XMLHttpRequest();
      request.onreadystatechange = function() {
         console.log('readyState: ' + request.readyState);
         console.log('status: ' + request.status);
         if (request.readyState == 4 &&
             request.status == 200) {
            // add the text to the page
            div = document.getElementById('plainTextDiv');
            div.innerHTML = request.responseText;
         }
      };
      request.open('GET', 'test_data.txt', true);
      request.send();
   };

   button = document.getElementById('csvButton');
   button.onclick = function() {
      request = new XMLHttpRequest();
      request.onreadystatechange = function() {
         if (request.readyState == 4 &&
             request.status == 200) {
            // add the CSV data to the page
            lines = request.responseText.split('\n');
            data = lines[0].split(',');

            firstNameField = document.getElementById('csvFirstName');
            lastNameField = document.getElementById('csvLastName');
            firstNameField.setAttribute('value', data[0]);
            lastNameField.setAttribute('value', data[1]);
         }
      };
      request.open('GET', 'test_data.csv', true);
      request.send();
   };

   button = document.getElementById('jsonButton');
   button.onclick = function() {
      request = new XMLHttpRequest();
      request.onreadystatechange = function() {
         if (request.readyState == 4 &&
             request.status == 200) {
            // add the JSON data to the page
            data = JSON.parse(request.responseText);

            firstNameField = document.getElementById('jsonFirstName');
            lastNameField = document.getElementById('jsonLastName');
            firstNameField.setAttribute('value', data['firstName']);
            lastNameField.setAttribute('value', data.lastName);
         }
      };
      request.open('GET', 'test_data.json', true);
      request.send();
   };

   button = document.getElementById('xmlButton');
   button.onclick = function() {
      request = new XMLHttpRequest();
      request.onreadystatechange = function() {
         if (request.readyState == 4 &&
             request.status == 200) {
            // add the XML data to the page
            person = request.responseXML.getElementsByTagName('person')[0];
            firstName = person.getAttribute('firstName');
            lastName = person.getAttribute('lastName');

            console.log('person.firstName = ' + person.firstName);

            firstNameField = document.getElementById('xmlFirstName');
            lastNameField = document.getElementById('xmlLastName');
            firstNameField.setAttribute('value', firstName);
            lastNameField.setAttribute('value', lastName);
         }
      };
      request.open('GET', 'test_data.xml', true);
      request.send();
   };
};
