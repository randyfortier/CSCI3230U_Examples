const MAX_AGE = 120;
var instructor_age = 45;

window.onload = function() {
    let output = document.getElementById("output");
    console.log(output);

    output.innerHTML = '<h2>Dynamic content</h2>';

    let button = document.getElementById("sayHi");
    button.onclick = function() {
        let nameField = document.getElementById("name");
        let name = nameField.value;

        output.innerHTML += `Hello, ${name}!`;

        let ageField = document.getElementById('age');
        let age = parseInt(ageField.value);

        if (age < 18) {
            output.innerHTML += '<div>You cannot vote</div>';
        } else {
            output.innerHTML += '<div>Vote away, my friend</div>';
        }
    };

    // basic language syntax
    for (let i = 0; i < 3; i++) {
        log(`Hello ${i}`);
    }

    let oddNums = [1,3,5,7,9];
    for (let num of oddNums) {
        log(`Odd number: ${num}`);
    }

    for (let num of odds) {
        if (num > 10) {
            break;
        }
        log(`(iterator)Odd number: ${num}`);
    }

    let f4 = fibonacci(4);

    // storage
    let localStorage = window.localStorage;
    localStorage.setItem('preferredLocation', 'Oshawa');
    console.log(localStorage.getItem('preferredLocation'));
    //localStorage.removeItem('preferredLocation');

    let sessionStorage = window.sessionStorage;
    sessionStorage.setItem('username', 'bsmith');
    console.log(sessionStorage.getItem('username'));
    //sessionStorage.removeItem('username');

    testPromises();
};

function isPrime(number) {
    for (let div = 2; div < number/2; div++) {
        if ((number % div) == 0) {
            return false;
        }
    }
    return true;
}

function fibonacci(n) {
    if (n == 0 || n == 1) {
        return n;
    }

    return fibonacci(n - 1) + fibonacci(n - 2);
}

function log(message) {
    let output = document.getElementById("output");
    output.innerHTML += `<div>${message}</div>`;
}

let odds = {
    [Symbol.iterator]() {
        let current = -1;

        return {
            next() {
                current += 2;
                return {
                    done: false,
                    value: current, 
                };
            }
        };
    }
};

async function testPromises() {

}

function wait(howLong = 0) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, howLong);
    });
}

async function divideLater(a, b, delay) {

}

