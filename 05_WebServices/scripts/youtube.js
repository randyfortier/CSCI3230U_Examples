let api_key = apiKeys.google;


$(document).ready(function() {
    $('#searchButton').click(function() {
        let query = $('#query').val();
        let url = `https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=${query}&key=${api_key}`;
        $.getJSON(url, function(data) {
            console.log(data);
        });
    });
});