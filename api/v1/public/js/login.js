$("#submit").click(function()
{
    $.ajax({
        url: '/api/v1/login',
        type: 'POST',
        data: { user: $("#user").val(), pass: $("#pass").val() },
        dataType: 'json',
        success: function(json, status)
        {

        },
        error: function(result, status, error)
        {

        }
    });
});