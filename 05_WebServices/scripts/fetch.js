window.onload = function() {
   // plain text
   let button = document.getElementById('plainTextButton');
   button.onclick = function() {
      fetch('test_data.txt')
         .then((response) => response.text())
         .then((content) => {
            let div = document.getElementById('plainTextDiv');
            div.innerHTML = content;
         });
   };

   // CSV
   button = document.getElementById('csvButton');
   button.onclick = function() {
      fetch('test_data.csv')
         .then((response) => response.text())
         .then((content) => {
            let rows = content.split('\n');
            let data = rows[0].split(',');

            document.getElementById('csvFirstName')
               .setAttribute('value', data[0]);
            document.getElementById('csvLastName')
               .setAttribute('value', data[1]);
         });
   };

   // JSON
   button = document.getElementById('jsonButton');
   button.onclick = function() {
      fetch('test_data.json')
         .then((response) => response.json())
         .then((customers) => {
            for (let customer of customers) {
               document.getElementById('jsonFirstName')
                  .setAttribute('value', customer.firstName);
               document.getElementById('jsonLastName')
                  .setAttribute('value', customer.lastName);
            }
         });
   };

   // XML
   button = document.getElementById('xmlButton');
   button.onclick = function() {
      fetch('test_data.xml')
         .then((response) => response.text())
         .then((content) => {
            let xmlDocument = parseXML(content);
            let person = xmlDocument.getElementsByTagName('person')[0];

            document.getElementById('xmlFirstName')
               .setAttribute('value', person.getAttribute('firstName'));
            document.getElementById('xmlLastName')
               .setAttribute('value', person.getAttribute('lastName'));
         });
   };
};

function parseXML(xmlText) {
   let parser = new window.DOMParser();
   return parser.parseFromString(xmlText, 'text/xml');
}