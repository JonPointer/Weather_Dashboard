
// Function to get and display the weather
function getWeather(requestLonLatUrl) {
    // First fetch the longitude and latitude of the desired city
    fetch(requestLonLatUrl)
        .then(function (response) {
            return response.json();
        })
        .then(function (dataLL) {
            console.log(dataLL);
            // Grab longitude and latitude from returned data
            var myLon = dataLL.results[0].geometry.lng;
            var myLat = dataLL.results[0].geometry.lat;
            // Build API URL for getting the weather at this longitude and latitude
            var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + myLat + '&lon=' + myLon + '&exclude=minutely,hourly&units=imperial&appid=dab01b8bddbfbb7b2a1f2c1e8f59e186';
            // Now, fetch the weather for that location
            fetch(requestUrl)
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    // Now utilize returned data to update city name, date, weather symbol, and current weather items at the top of the screen
                    // First, the cityString at the top of the page
                    var todaysDate = new Date();
                    var todaysDateString = todaysDate.toLocaleDateString();
                    var currentIcon = data.current.weather[0].icon;
                    var currentIconImage = "<img src='https://openweathermap.org/img/wn/" + currentIcon + "@2x.png' width='60'></img>"
                    // Instead of using city variable, use the actual city and state the first API found
                    cityString = dataLL.results[0].components.city + ", " + dataLL.results[0].components.state_code + " (" + todaysDateString + ") ";
                    $("#cityString").text(cityString);
                    $(currentIconImage).appendTo("#cityString");
                    // Now fill in current weather values
                    $("#temperature").text(data.current.temp.toString());
                    $("#humidity").text(data.current.humidity.toString());
                    $("#windSpeed").text(data.current.wind_speed.toString());
                    // And the UV Index, color coded per the following:
                    // UV Index 0-2 = Low (green) 3-7 Moderate (yellow)  8+ High (red)  per https://www.epa.gov/sunsafety/uv-index-scale-0
                    var UVI = data.current.uvi;
                    if (UVI <= 2) {
                        $("#uvIndex").html("UV Index: <span class='badge badge-secondary badge-success'><h5>" + UVI.toString() + "</h5></span>");
                    } else if (UVI <= 7) {
                        $("#uvIndex").html("UV Index: <span class='badge badge-secondary badge-warning'><h5>" + UVI.toString() + "</h5></span>");
                    } else {
                        $("#uvIndex").html("UV Index: <span class='badge badge-secondary badge-danger'><h5>" + UVI.toString() + "</h5></span>");
                    }
                    // Fist, clear any previous cards
                    $("#fiveDay").empty();
                    // Now build the 5-Day forecast cards in a loop
                    for (i = 0; i < 5; i++) {
                        // First build the needed variables
                        var myDate = new Date(data.daily[i].dt * 1000);
                        var dateString = myDate.toLocaleDateString();
                        var myIcon = data.daily[i].weather[0].icon;
                        var currentIconImage = "<img src='https://openweathermap.org/img/wn/" + myIcon + "@2x.png' width='60'></img>"
                        var temperature = data.daily[i].temp.day.toString();
                        var humidity = data.daily[i].humidity.toString();
                        // Now build and append the card
                        $("#fiveDay").append("<article class='card col-lg m-2 pl-1 bg-primary text-white'><div class='card-body'><h3 class='card-title mb-4'>" + dateString + "</h3><p class='card-text'>" + currentIconImage + "</p><p class='card-text'>Temp: " + temperature + " &#176;F</p><p class='card-text'>Humidity: " + humidity + " %</p></div></article>");

                    }

                });

        });
}

function displayCityList() {
    // Write the array of cities to the unordered HTML list
    // Empty the list
    $("#cityList").empty();
    // Now build the list
    for (i = 0; i < cityList.length; i++) {
        // Append the next array item to the list - with a button ID
        var buttonString = "cityButton".concat(i);
        $("#cityList").append("<li class='list-group-item'><button type='button' class='btn btn-light w-100 text-left' id=" + buttonString + ">" + cityList[i] + "</button></li>");

        // Now create an on click event for this button
        buttonJQName = "#".concat(buttonString);
        $(buttonJQName).on('click', function () {
            // When the button is clicked, display the weather for that city 
            city = cityList[parseInt(this.id.substring(10))];
            var requestLonLatUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=ee5b200caf5e4e0c89120f545016875d"
            getWeather(requestLonLatUrl);
        });
    }
}

// Initial check to see if there is a city list in local storage 
function checkCityList() {
    cityList = localStorage.getItem("cityList");

    if (cityList === null) {
        // There is no list of cities in local storage, so set variable to empty
        cityList = [];
    } else {
        // City List already existed in local storage, so read in and display
        cityList = JSON.parse(cityList);
        displayCityList();
    }

}

// Function to update the list of cities with current entry 
function upDateCityList(newCity) {
    // See if the current array of cities does not include the entered city
    if (!cityList.includes(newCity)) {
        // Not part of the list, so add the new city
        cityList.push(newCity);
        // Write the city list to storage
        localStorage.setItem("cityList", JSON.stringify(cityList));
        // Now rewrite the list
        displayCityList();
    }
}

// City Search Button
$("#searchButton").click(function (e) {
    e.preventDefault();
    // Grab the city value from the input form
    city = $("#inlineFormInputName2").val();
    // Update the list of cities with this entry
    upDateCityList(city);
    // Change the form back to the default "City" value
    $("#inlineFormInputName2").val("");
    // $("#inlineFormInputName2").empty();
    // Set the API URL for locating the Longitude and Latitude from the city name
    var requestLonLatUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=ee5b200caf5e4e0c89120f545016875d"
    // Call the get weather function
    getWeather(requestLonLatUrl);
});


// Program Start
// Declare city variable
var city = "";
// Create an empty city list
var cityList = [];
// Check local storage for an existing city list
checkCityList();

