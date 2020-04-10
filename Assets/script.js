// API Key b52ce1773e76080cb950272fcf749391
// documentation
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
let apiKey = "b52ce1773e76080cb950272fcf749391"

$(document).ready(function () {

    // let movieNameC = $(this).attr("data-name");
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=phoenix&units=imperial&APPID="+apiKey;


        $.ajax({
            url:queryURL,
            method: "GET"
        })

        .then(function (response){

            // console.log(response);

            // Get the lat and long
            // console.log(response.coord.lon);
            let longitude = response.coord.lon;
            let latitiude = response.coord.lat;
            console.log(response);

            let cityName = response.name;
            // console.log("this is city name :"+cityName);

            //make call to One Call API
            // https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={YOUR API KEY}

            $.ajax({
                url:"http://api.openweathermap.org/data/2.5/onecall?lat="+latitiude+"&lon="+longitude+"&units=imperial&appid="+apiKey,
                method: "GET"
            })

            .then(function(oneCall){
                
                console.log(oneCall);
                // let searchedData = JSON.stringify(oneCall);
                // console.log("this is One CAll: " + searchedData);

                let timeFromOneCall = oneCall.current.dt;
                console.log("This is city timie : "+timeFromOneCall);

                let newFormatTime = moment.unix(timeFromOneCall).format('dddd, MMMM Do, YYYY');

                // let timeUTCconversion = moment.utc(timeFromOneCall);
                console.log(newFormatTime);
                // let regularTime = moment(timeUTCconversion, 'MM/DD/YYYY');
                


            });

        });


});