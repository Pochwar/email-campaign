$(document).ready(function()
{
    $("#submit").unbind('click').bind('click', function () {
        var label = $('#label').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var passwordConfirm = $('#password-confirm').val();
        var url_ad = $('#url-ad').val();
        var url_picture = $('#url-picture').val();

        if(password === passwordConfirm)
        {
            $.ajax({
                url: "/api/v1/entreprises",
                method: "POST",
                data: {
                    label: label,
                    email: email,
                    password: password,
                    url_ad: url_ad,
                    url_picture: url_picture
                },
                success: function (data) {
                    console.log("ok");
                    console.log(data);
                },
                error: function (error) {
                    console.log('pas ok');
                    console.log(error)
                }
            })
        }
    });
});