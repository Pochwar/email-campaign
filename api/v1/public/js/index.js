$(document).ready(function() {
    var token = getToken();

    if (!token) {
        $("#entreprise").hide();
        $("#login").show();
    } else {
        listCampaigns();
    }


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

})