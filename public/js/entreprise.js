$(document).ready(function()
{
    var token = localStorage.getItem('api_token');

    console.log(token)

    if(token == null || typeof token == "undefined") {
        location.href = "/login";
    }
    $.ajax({
        url: '/api/v1/kittens',
        type: 'GET',
        dataType: 'json',
        success: function(json, status)
        {
            let str = `<table border="2" cellpading="5px" cellspacing="5px">
                       <th>Name</th>
                       <th>Couleur</th>
                       <th>Qualité n°1</th>
                       <th>Qualité n°2</th>
                       <th>Défaut</th>
                       <th>Kibbles</th>
                       <th>Adopted</th>`;

            for(let i in json)
            {
                str += `<tr><td>${json[i].name}</td><td>${json[i].color}</td><td>${json[i].primaryQuality}</td><td>${json[i].secondQuality}</td><td>${json[i].primaryDefault}</td><td>${json[i].kibbles}</td><td>${json[i].isAvailable}</td></tr>`
            }


            str += `</table>`;
            $("#kittenBox").html(str);
        },
        error: function(result, status, error)
        {

        }
    });
});