// API Key b52ce1773e76080cb950272fcf749391
// documentation
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
let apiKey = "b52ce1773e76080cb950272fcf749391"

$(document).ready(function () {


    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q=phoenix&units=imperial&APPID="+apiKey;


        $.ajax({
            url:queryURL,
            method: "GET"
        })

        .then(function (response){

            let longitude = response.coord.lon;
            let latitiude = response.coord.lat;

            let cityName = response.name;

            //****make call to One Call API

            $.ajax({
                url:"http://api.openweathermap.org/data/2.5/onecall?lat="+latitiude+"&lon="+longitude+"&units=imperial&appid="+apiKey,
                method: "GET"
            })

            .then(function(oneCall){

                let timeFromOneCall = oneCall.current.dt;


                //**set page to display current city and Date
                let newFormatTime = moment.unix(timeFromOneCall).format('dddd, MMMM Do, YYYY');
                $("#cityDateCurrent")[0].innerHTML = cityName +" ("+newFormatTime+") ";
                // let currentTempEl =  $("#tempFCurrent");
                // let currentTemp = oneCall.current.temp;
                // currentTempEl[0].innerHTML = currentTemp+" &#176;F";
                $("#tempFCurrent")[0].innerHTML = "Temperature:  "+oneCall.current.temp+" &#176;F";
                $("#humidityCurrent")[0].innerHTML = "Humidity:  "+oneCall.current.humidity+"%";
                $("#windSpeedCurrent")[0].innerHTML = "Wind Speed:  "+oneCall.current.wind_speed+"MPH";
                
                console.log(oneCall);  


            });

        });


});