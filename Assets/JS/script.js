

function getWeather(requestLonLatUrl) {
    fetch(requestLonLatUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);

            var myLon = data.results[0].geometry.lng;
            var myLat = data.results[0].geometry.lat;

            console.log(myLon, myLat);
            var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + myLat + '&lon=' + myLon + '&exclude=minutely,hourly&units=imperial&appid=dab01b8bddbfbb7b2a1f2c1e8f59e186';


            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    for (i = 0; i < 5; i++) {
                        var myDate = new Date(data.daily[i].dt * 1000);
                        console.log("Date: " + myDate);
                        var dateString = myDate.toLocaleDateString();
                        console.log(dateString);
                        var myIcon = data.daily[i].weather[0].icon;
                        console.log(myIcon);
                        $("h1").append("<img src='https://openweathermap.org/img/wn/" + myIcon + "@2x.png'></img>");

                    }

                });

        });
}

// var city = prompt("Enter City");

// var requestLonLatUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=ee5b200caf5e4e0c89120f545016875d"

// getWeather(requestLonLatUrl);

// UV Index 0-2 = Low (green) 3-7 Moderate (yellow)  8+ High (red)  per https://www.epa.gov/sunsafety/uv-index-scale-0