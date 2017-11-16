$(document).ready(function ()
{
    var token = getToken();

    if (!token)
    {
        $('#register-card').hide();
        $("#entreprise").hide();
        $("#login").show();

        // Gère la page register
        handleRegister(token);
    }
    else
    {
        listCampaigns();
    }



    handleLogin();
    // Gère le submit pour le login
    function handleLogin() {
        $("#submit").unbind('click').bind('click', function (e)
        {
            e.preventDefault();
            $.ajax({
                url: '/api/v1/login',
                type: 'POST',
                data: {email: $("#email").val(), password: $("#password").val()},
                dataType: 'json',
                success: function (data, status)
                {
                    localStorage.setItem("api_token", data.token);
                    listCampaigns();
                },
                error: function (result, status, error)
                {
                    console.dir(error);
                }
            });
        });
    }

    function listCampaigns()
    {
        var token = getToken();

        if (!token)
        {
            //todo gestion de l'erreur
        }
        else
        {
            $.ajax({
                url: '/mock/campaigns',
                type: 'GET',
                headers: {"Authorization": token},
                dataType: 'json',
                success: function (data, status)
                {
                    $("#entreprise").show();
                    $("#login").hide();
                },
                error: function (result, status, error)
                {
                    console.dir(error);
                }
            });
        }
    }

    // Récupère un token
    function getToken()
    {
        var token = localStorage.getItem('api_token');

        if (token == null || typeof token == "undefined")
        {
            return false
        }
        return token;
    }

    // Gère l'affichage et la création d'entreprise
    function handleRegister(token) {
        $('#show-register').unbind('click').bind('click', function ()
        {
            $('#login').hide();
            $('#register-card').show();
            bindSubmitForRegister(token);
        });
    }

    // Gère le process de création d'entreprise
    function bindSubmitForRegister(token)
    {
        $("#submit-register").unbind('click').bind('click', function ()
        {
            var label = $('#label').val();
            var email = $('#emailRegister').val();
            var password = $('#passwordRegister').val();
            var passwordConfirm = $('#passwordConfirmRegister').val();
            var url_ad = $('#url-ad').val();
            var url_picture = $('#url-picture').val();

            if (password === passwordConfirm)
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
                    success: function ()
                    {
                        $('#register-card').hide();
                        $('#login').show();
                    },
                    error: function (error)
                    {
                        $('.alert-error').html(error.message);
                    }
                })
            }
            else
            {
                $('.alert-error').html("Erreur les mots de passes ne corresponde pas");
            }
        });
    }

    function disconnect() {
        localStorage.removeItem('api_token');
        $("#login").show();
        $('#register-card').hide();
        $("#entreprise").hide();
    }

});