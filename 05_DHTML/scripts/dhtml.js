window.onload = function() {
   allPs = document.getElementsByTagName('p');
   select(allPs[0]);

   resetButton = document.getElementById('resetButton');
   resetButton.onclick = function() {
      allPs = document.getElementsByTagName('p');
      select(allPs[0]);
   };

   parentButton = document.getElementById('parentButton');
   parentButton.onclick = function() {
      select(currentElement.parentElement);
   };

   previousButton = document.getElementById('previousButton');
   previousButton.onclick = function() {
      select(currentElement.previousElementSibling);
   };

   nextButton = document.getElementById('nextButton');
   nextButton.onclick = function() {
      select(currentElement.nextElementSibling);
   };

   firstButton = document.getElementById('firstButton');
   firstButton.onclick = function() {
      select(currentElement.firstElementChild);
   };

   lastButton = document.getElementById('lastButton');
   lastButton.onclick = function() {
      select(currentElement.lastElementChild);
   };

   visibilityList = document.getElementById('visibilityList');
   visibilityList.onchange = function() {
      // accessing a local variable outside of scope!
      selectedIndex = visibilityList.selectedIndex;
      visibility = visibilityList.options[selectedIndex].text;
      currentElement.style.display = visibility;
   };

   addButton = document.getElementById('addButton');
   addButton.onclick = function() {
      newPlaceField = document.getElementById('newPlaceField');
      newPlaceName = newPlaceField.value;

      // create a new #text node
      content = document.createTextNode(newPlaceName);
      newListItem = document.createElement('li');
      newListItem.appendChild(content);

      coolPlaces = document.getElementById('coolPlaces');
      coolPlaces.appendChild(newListItem);
   };
};

var currentElement;

function select(element) {
   if (element) {
      if (currentElement) {
         currentElement.className = '';
      }

      element.className = 'selected';
      currentElement = element;
   }
}
