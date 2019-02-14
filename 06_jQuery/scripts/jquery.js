var provinces = {
                 Canada: ['Alberta', 'BC', 'Manitoba', 'Ontario'],
                 USA: ['Alabama', 'Alaska', 'Arkansas']
              };

$(document).ready(function() {
   $('#btnRegister').click(function() {
      console.log('Register button clicked');
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
      console.log('Mouse entered first name field');
   });

   $('#txtFirstName').mouseleave(function() {
      console.log('Mouse left first name field');
   });

   $('#txtFirstName').focus(function() {
      console.log('First name field has focus');
   });

   $('#txtFirstName').change(function() {
      name = $('#txtFirstName').val();
      if (name === '') {
         $('#txtFirstName').css({
            backgroundColor: 'red'
         });
      } else {
         $('#txtFirstName').css({
            backgroundColor: 'green'
         });
      }
   });

   $('#listCountry').change(function() {
      country = $('#listCountry').val();
      provs = provinces[country];
      content = '';

      $.each(provs, function(index, value) {
         content += '<option>' + value + '</option>';
      });
      $('#listProvince').html(content);
   }).change();

   $('form').submit(function() {
      console.log('Form submitted');
      return false;
   });
});
