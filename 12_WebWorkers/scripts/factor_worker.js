// dedicated worker

onmessage = function(event) {
    // called when the main script posts a message to us
    // input data - a list of numbers to be factored
    let numbers = event.data;
    let delayInMilliseconds = 3000; // simulate a heavy computation

    this.setTimeout(function() {
        let factors = {};

        for (let i = 0; i < numbers.length; i++) {
            // find the factors of numbers[i] and add them to factors
            let numFactors = [];
            for (let k = numbers[i] - 1; k > 1; k--) {
                if ((numbers[i] % k) == 0) {
                    numFactors.push(k);
                }
            }
            factors['' + numbers[i]] = numFactors;
        }

        postMessage(factors);
    }, delayInMilliseconds);
};