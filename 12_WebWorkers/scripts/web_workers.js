window.onload = function() {
    let btnStart = document.getElementById('btnStart');
    btnStart.onclick = function() {
        let factorWorker = new Worker('scripts/factor_worker.js');
        let values = [19683, 13104, 25872, 1452, 29403];
        
        // send data to the worker to compute
        factorWorker.postMessage(values);

        factorWorker.onmessage = function(event) {
            // this is the response from the dedicated worker
            let factors = event.data;
            console.log(factors);
        };

        console.log('Started worker thread.');
    };
};