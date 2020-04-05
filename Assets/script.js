// API Key b52ce1773e76080cb950272fcf749391
// documentation 

$(document).ready(function () {

    var movieNameC = $(this).attr("data-name");
    var queryURL = "https://www.omdbapi.com/?t=" + movieNameC + "&apikey=80df7118";


        $.ajax({
            url:queryURL,
            method: "GET"
        })

        .then(function (response){
            // let m = $("movie-view");
            // console.log(response);
            // movieView = $("#move-view");
            // console.log(movieView);
            // console.log(m);

            // $("#movie-view").text(JSON.stringify(response));
            $("#movie-view").text(JSON.stringify(response));

        });


});