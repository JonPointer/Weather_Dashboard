// var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid=dab01b8bddbfbb7b2a1f2c1e8f59e186';

// var requestUrl = 'http://api.openweathermap.org/data/2.5/forecast?q=Denver&appid=dab01b8bddbfbb7b2a1f2c1e8f59e186';


// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}



// lat: 39.7392, lon: -104.9847}


// function getApi(requestUrl) {
// fetch(requestUrl)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//         for (i = 0; i < 5; i++) {
//             var myDate = new Date(data.daily[i].dt * 1000);
//             console.log("Date: " + myDate);
//             var dateString = myDate.toLocaleDateString();
//             console.log(dateString);
//             var myIcon = data.daily[i].weather[0].icon;
//             console.log(myIcon);
//             $("h1").append("<img src='http://openweathermap.org/img/wn/" + myIcon + "@2x.png'></img>");

//         }

//     });
// }


// var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=39.7392&lon=-104.9847&exclude=minutely,hourly&units=imperial&appid=dab01b8bddbfbb7b2a1f2c1e8f59e186';

// function getLonLat(requestLonLatUrl) {
//     fetch(requestLonLatUrl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             myLon = data.data[0].longitude;
//             myLat = data.data[0].latitude;
//             console.log(myLon, myLat);
//         });
// }

function getWeather(requestLonLatUrl) {
    fetch(requestLonLatUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var myLon = data.data[0].longitude;
            var myLat = data.data[0].latitude;
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
                        $("h1").append("<img src='http://openweathermap.org/img/wn/" + myIcon + "@2x.png'></img>");

                    }

                });

        });
}

var city = prompt("Enter City");
var requestLonLatUrl = "http://api.positionstack.com/v1/forward?access_key=f0859cfa66e6e18465547266ac22d22d&query=" + city;
getWeather(requestLonLatUrl);







    // getApi(requestUrl);