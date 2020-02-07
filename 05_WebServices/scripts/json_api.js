const MAX_TODOS = 10;
window.onload = function() {
    let button = this.document.getElementById('loadDataButton');
    button.onclick = function() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then((response) => response.json())
            .then((json) => {
                let content = document.getElementById('content');
                let ul = document.createElement('ul');
                content.appendChild(ul);

                let howMany = (json.length > MAX_TODOS) ? MAX_TODOS : json.length;
                for (let i = 0; i < howMany; i++) {
                    let li = document.createElement('li');
                    let title = json[i].title;
                    let titleContent = document.createTextNode(title);
                    li.appendChild(titleContent);
                    ul.appendChild(li);
                }
            });
    };
};