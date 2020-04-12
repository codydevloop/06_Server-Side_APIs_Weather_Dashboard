// API Key b52ce1773e76080cb950272fcf749391
// documentation
// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}
let apiKey = "b52ce1773e76080cb950272fcf749391";

$(document).ready(function () {


    // ** Search City by name (get lat lon data pieces)
    $("#button-addon2").on("click",function(){


    let userSubmittedEl = $("#userCityName");
    let userZip = userSubmittedEl[0].value;
    
    let queryURL = "http://api.openweathermap.org/data/2.5/weather?q="+userZip+"&units=imperial&APPID="+apiKey;

        $.ajax({
            url:queryURL,
            method: "GET"
        })

        .then(function (response){

            let longitude = response.coord.lon;
            let latitiude = response.coord.lat;
            let cityName = response.name;

            //****make call to One Call API
            // ***5 day forcast

            $.ajax({
                url:"http://api.openweathermap.org/data/2.5/onecall?lat="+latitiude+"&lon="+longitude+"&units=imperial&appid="+apiKey,
                method: "GET"
            })

            .then(function(oneCall){

                let timeFromOneCall = oneCall.current.dt;


                //**set page to display current city and Date
                let newFormatTime = moment.unix(timeFromOneCall).format('dddd, MMMM Do, YYYY');
                $("#cityDateCurrent")[0].innerHTML = cityName +" ("+newFormatTime+") ";
                $("#tempFCurrent")[0].innerHTML = "Temperature:  "+oneCall.current.temp+" &#176;F";
                $("#humidityCurrent")[0].innerHTML = "Humidity:  "+oneCall.current.humidity+"%";
                $("#windSpeedCurrent")[0].innerHTML = "Wind Speed:  "+oneCall.current.wind_speed+"MPH";
                $("#uvIndexCurrent")[0].innerHTML = "UV Index:  "+oneCall.current.uvi;

               
               
                function genereateImg(img){
                    let icon = oneCall.daily[img].weather[0].icon
                    
                    let iconUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
                    return iconUrl;

                }

                $("#futureDay0Icon").attr("src", genereateImg(0));
                $("#futureDay0Temp").text(`${oneCall.daily[0].temp.day}`);
                $("#futureDay0Humidity").text(`${oneCall.daily[0].humidity}`+"%");


                $("#futureDay1Icon").attr("src", genereateImg(1));
                $("#futureDay1Temp").text(`${oneCall.daily[1].temp.day}`);
                $("#futureDay1Humidity").text(`${oneCall.daily[1].humidity}`+"%");


                $("#futureDay2Icon").attr("src", genereateImg(2));
                $("#futureDay2Temp").text(`${oneCall.daily[2].temp.day}`);
                $("#futureDay2Humidity").text(`${oneCall.daily[2].humidity}`+"%");

                $("#futureDay3Icon").attr("src", genereateImg(3));
                $("#futureDay3Temp").text(`${oneCall.daily[3].temp.day}`);
                $("#futureDay3Humidity").text(`${oneCall.daily[3].humidity}`+"%");

                $("#futureDay4Icon").attr("src", genereateImg(4));
                $("#futureDay4Temp").text(`${oneCall.daily[4].temp.day}`);
                $("#futureDay4Humidity").text(`${oneCall.daily[4].humidity}`+"%");
                


                //**add current and future info to a collection - store to session storage

                
                //** check session history on reload

        
                
                console.log(oneCall); 

            });

        });

    });


});