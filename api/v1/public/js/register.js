$(document).ready(function()
{
    $("#submit").unbind('click').bind('click', function () {
        var label = $('#label').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var passwordConfirm = $('#password-confirm').val();
        var urlAd = $('#url-ad').val();
        var urlPicture = $('#url-picture').val();

        if(password === passwordConfirm)
        {

        }
    });
});