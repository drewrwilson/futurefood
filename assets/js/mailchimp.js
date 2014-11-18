function validate_input () {
  return true;
}

function register($form) {
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: $form.serialize(),
        cache       : false,
        dataType    : 'json',
        contentType: "application/json; charset=utf-8",
        error       : function(err) { alert("Could not connect to the registration server. Please try again later."); },
        success     : function(data) {
            if (data.result != "success") {
                console.log('result: ' + JSON.stringify(data));
                $form.show();
                $('#emailForm').html('Oops! Error: ' + JSON.stringify(data.msg));
            } else {
                $('#emailForm').html('<button class="btn btn-success btn-lg" disabled>Subscribed &#10003;</button>');
            }
        }
    });
}

$(document).ready( function () {

    var $form = $('#signup');

    if ( $form.length > 0 ) {
        $('#submitIt').bind('click', function ( event ) {
            if ( event ) event.preventDefault();
            if ( validate_input($form) ) {
              register($form);
              $form.hide();
              $('#emailForm').html('<img src="assets/img/loading.gif" />');
            }
        });
    }
});
