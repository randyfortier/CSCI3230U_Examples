var provinces = {
    'Canada': ['Alberta', 'BC', 'Manitoba', 'New Brunswick', 'Newfoundland', 'Northwest Territories', 'Nova Scotia', 'Nunavut', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan', 'Yukon'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia', 'Tasmania'],
};

$(document).ready(function() {
    $('#btnRegister').click(function() {
        console.log('Register button clicked');
        //return false;
    });

    $('#btnRegister').dblclick(function() {
        console.log('Register button double clicked');
    });

    $('#btnRegister').toggle(function() {
        console.log('Register button toggled on');
        $('#btnRegister').css('backgroundColor', '#A0A0A0');
    }, function() {
        console.log('Register button toggled off');
        $('#btnRegister').css('backgroundColor', '#FFFFFF');
        $('#btnRegister').show();
    });

    $('#txtFirstName').mouseenter(function() {
        console.log('Mouse entered the text field');
    });

    $('#txtFirstName').mouseleave(function() {
        console.log('Mouse left the text field');
    });

    $('#txtFirstName').focus(function() {
        console.log('The text field now has focus');
    });

    $('#txtFirstName').change(function() {
        let name = $('#txtFirstName').val();
        if (name === '') {
            $('#txtFirstName').css({
                'backgroundColor': 'red',
            });
        } else {
            $('#txtFirstName').css({
                'backgroundColor': 'green',
            });
        }
    });

    $('#listCountry').change(function() {
        let country = $('#listCountry').val();
        let provs = provinces[country];
        $('#listProvince').html('');

        // kind of hacky way
        /*
        let content = '';
        $.each(provs, function(index, value) {
            content += `<option>${value}</option>`;
        });
        $('#listProvince').html(content);
        */
        
        // the fancy way
        $.each(provs, function(index, value) {
            let newOption = $('<option>');
            newOption.text(value);
            $('#listProvince').append(newOption);
        });

    }).change();

    $('form').submit(function() {
        console.log('Form submitted');
        return false;
    });
});