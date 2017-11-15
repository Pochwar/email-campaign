$(document).ready(function() {
    var token = getToken();

    if (!token) {
        $('#register-card').hide();
        $("#entreprise").hide();
        $("#login").show();
    } else {
        listCampaigns();
    }

    $('#show-register').unbind('click').bind('click', function () {
        $('#login-card').hide();
        $('#register-card').show();
        handleRegister();
    });

    $("#submit").click(function(e)
    {
        e.preventDefault();
        $.ajax({
            url: '/api/v1/login',
            type: 'POST',
            data: { email: $("#email").val(), password: $("#password").val() },
            dataType: 'json',
            success: function(data, status)
            {
                localStorage.setItem("api_token", data.token);
                listCampaigns();
            },
            error: function(result, status, error)
            {
                console.dir(error);
            }
        });
    });

    function listCampaigns() {
        var token = getToken();

        if (!token) {
           //todo gestion de l'erreur
        }
        else {
            $.ajax({
                url: '/mock/campaigns',
                type: 'GET',
                headers: {"Authorization": token},
                dataType: 'json',
                success: function(data, status)
                {
                    $("#entreprise").show();
                    $("#login").hide();
                },
                error: function(result, status, error)
                {
                    console.dir(error);
                }
            });
        }
    }

    function getToken() {
        var token = localStorage.getItem('api_token');

        if(token == null || typeof token == "undefined") {
            return false
        }
        return token;
    }

    function handleRegister() {
        var token = localStorage.getItem('api_token');

        if(token == null || typeof token == "undefined") {
            $('#register-card').hide();
            $('#login-card').show();
        } else {
            $("#submit-register").unbind('click').bind('click', function () {
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
                        headers: {"Authorization": token},
                        method: "POST",
                        data: {
                            label: label,
                            email: email,
                            password: password,
                            url_ad: url_ad,
                            url_picture: url_picture
                        },
                        success: function () {
                            $('#register-card').hide();
                            $('#login-card').show();
                        },
                        error: function (error) {
                            $('.alert-error').html(error.message);
                        }
                    })
                } else {
                    $('.alert-error').html("Erreur les mots de passes ne corresponde pas");
                }
            });
        }
    }

});