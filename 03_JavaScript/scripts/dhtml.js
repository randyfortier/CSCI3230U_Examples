window.onload = function() {
    let allPs = document.getElementsByTagName('p');
    select(allPs[0]);

    let resetButton = document.getElementById('resetButton');
    resetButton.onclick = function() {
        let allPs = document.getElementsByTagName('p');
        select(allPs[0]);        
    };

    let parentButton = document.getElementById('parentButton');
    parentButton.onclick = function() {
        select(currentElement.parentElement);
    };

    let previousButton = document.getElementById('previousButton');
    previousButton.onclick = function() {
        select(currentElement.previousElementSibling);
    };

    let nextButton = document.getElementById('nextButton');
    nextButton.onclick = function() {
        select(currentElement.nextElementSibling);
    };

    let firstButton = document.getElementById('firstButton');
    firstButton.onclick = function() {
        select(currentElement.firstElementChild);
    };

    let lastButton = document.getElementById('lastButton');
    lastButton.onclick = function() {
        select(currentElement.lastElementChild);
    };

    let visibilityList = document.getElementById('visibilityList');
    visibilityList.onchange = function() {
        let index = visibilityList.selectedIndex;
        let value = visibilityList.options[index].text;
        currentElement.style.display = value;
    };

    let addButton = document.getElementById('addButton');
    addButton.onclick = function() {
        // get the value to be inserted
        let newPlaceField = document.getElementById('newPlaceField');
        let newPlace = newPlaceField.value;

        // dynamically create new DOM nodes
        let content = document.createTextNode(newPlace);
        let newListItem = document.createElement('li');
        newListItem.appendChild(content);

        // insert the new element into the DOM
        let coolPlaces = document.getElementById('coolPlaces');
        coolPlaces.appendChild(newListItem);
    };

    let searchButton = document.getElementById('searchButton');
    searchButton.onclick = function() {
       searchTypeField = document.getElementById('searchType');
       searchType = searchTypeField.value;
 
       searchKeyField = document.getElementById('searchKey');
       searchKey = searchKeyField.value;
 
       var foundElement = '';
       if (searchType === 'tag') {
          let results = document.getElementsByTagName(searchKey);
          if (results.length > 0) {
             foundElement = results[0];
          }
       } else if (searchType == 'name') {
          let results = document.getElementsByName(searchKey);
          if (results.length > 0) {
             foundElement = results[0];
          }
       } else if (searchType == 'class') {
          let results = document.getElementsByClassName(searchKey);
          if (results.length > 0) {
             foundElement = results[0];
          }
       }
 
       if (foundElement !== '') {
          select(foundElement);
       }
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