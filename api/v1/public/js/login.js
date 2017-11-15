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
            $("#services").show();
            $(".login-card").hide();
            listCampaigns();
        },
        error: function(result, status, error)
        {
            console.dir(error);
        }
    });
});

var listCampaigns = function() {

    var token = localStorage.getItem('api_token');

    if(token == null || typeof token == "undefined") {
        location.href = "/login";
    }
    else {
        $.ajax({
            url: '/mock/campaigns',
            type: 'GET',
            headers: {"Authorization": token},
            dataType: 'json',
            success: function(data, status)
            {
                console.log(data)
                //redirect /api/v1/entreprises/data.entreprise
            },
            error: function(result, status, error)
            {
                console.dir(error);
            }
        });
    }
};

var deconnexion = function() {
    localStorage.removeItem('api_token');
    $('#services').hide();
    $('.login-card').show();
}