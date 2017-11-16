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
    handleDisconnect();
    
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
                    localStorage.setItem("entreprise_id", data.id);
                    listCampaigns();
                },
                error: function (result, status, error)
                {
                    console.log(result);
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
            $('#register-card').hide();
            $("#entreprise").hide();
            $("#login").show();
            // Gère la page register
            handleRegister(token);
        }
        else
        {
            $.ajax({
                url: '/api/v1/entreprises/' + localStorage.getItem('entreprise_id'),
                type: 'GET',
                headers: {"Authorization": token},
                dataType: 'json',
                success: function(json, status)
                {
                    var campaigns = json.campaign;
                    $.ajax({
                        url: '/mock/campaigns',
                        type: 'GET',
                        dataType: 'json',
                        success: function (json, status) {
                            let str = `<p> `;
                            for(var j = 0; j < json.data.length; j++)
                            {
                                str += `<input type="checkbox" class="checkCampaign"`
                                for (var campaignId in campaigns) {
                                    if (campaignId == json.data[j].id)
                                        str += ` checked="checked" `
                                }
                                str += `id = ${json.data[j].id} />`
                                str += `<label for = ${json.data[j].id}>${json.data[j].sujet}</label>`
                                str += ` </p>`;
                            }
                            $("#campaigns").html(str);
                            // Ajoute ou enlève la campagne à l'entreprise lors du click sur la checkbox
                            $('.checkCampaign').unbind('change').bind('change', function ()
                            {
                                // On récupère d'abord l'entreprise qui est connectée
                                var that = this;
                                $.ajax({
                                    url: '/api/v1/entreprises/' + localStorage.getItem('entreprise_id'),
                                    type: 'GET',
                                    headers: {"Authorization": token},
                                    dataType: 'json',
                                    success: function (json, status)
                                    {
                                        var urlMethod = "";
                                        if(that.checked) // Si la checkbox est maintenant cochée, on ajoute la campagne
                                            urlMethod = '/api/v1/entreprises/' + localStorage.getItem('entreprise_id') + '/' + that.getAttribute('id') + '/add';
                                        else // Sinon on supprime
                                            urlMethod = '/api/v1/entreprises/' + localStorage.getItem('entreprise_id') + '/' + that.getAttribute('id') + '/remove';

                                        $.ajax({
                                            url: urlMethod,
                                            type: 'PUT',
                                            headers: {"Authorization": token},
                                            success: function (json, status) {

                                            },
                                            error: function (result, status, error) {
                                                that.checked = !that.checked;
                                                $('.alert-error').html(error.message);
                                            }
                                        });
                                    },
                                    error: function (error)
                                    {
                                        $('.alert-error').html(error.message);
                                    }
                                });
                            });
                        },
                        error: function (result, status, error) {
                            console.dir(error);
                        }
                    });
                }
            });
            $('#register-card').hide();
            $("#entreprise").show();
            $("#login").hide();
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
        $('#show-register').unbind('click').bind('click', function (e)
        {
            e.preventDefault();
            $('#login').hide();
            $('#register-card').show();
            bindSubmitForRegister(token);
        });
    }

    // Gère le process de création d'entreprise
    function bindSubmitForRegister(token)
    {
        $("#submit-register").unbind('click').bind('click', function (e)
        {
            e.preventDefault();
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

    function handleDisconnect() {
        $("#but_disconnect").unbind('click').bind('click', function (e) {
            e.preventDefault();
            localStorage.removeItem('api_token');
            $("#login").show();
            $('#register-card').hide();
            $("#entreprise").hide();
        });
    }

});