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