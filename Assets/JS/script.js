

function getWeather(requestLonLatUrl) {
    console.log(requestLonLatUrl);
    // fetch(requestLonLatUrl)
    //     .then(function (response) {
    //         return response.json();
    //     })
    //     .then(function (data) {
    //         console.log(data);

    //         var myLon = data.results[0].geometry.lng;
    //         var myLat = data.results[0].geometry.lat;

    //         console.log(myLon, myLat);
    //         var requestUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + myLat + '&lon=' + myLon + '&exclude=minutely,hourly&units=imperial&appid=dab01b8bddbfbb7b2a1f2c1e8f59e186';

    //         fetch(requestUrl)
    //             .then(function (response) {
    //                 return response.json();
    //             })
    //             .then(function (data) {
    //                 console.log(data);
    //                 for (i = 0; i < 5; i++) {
    //                     var myDate = new Date(data.daily[i].dt * 1000);
    //                     console.log("Date: " + myDate);
    //                     var dateString = myDate.toLocaleDateString();
    //                     console.log(dateString);
    //                     var myIcon = data.daily[i].weather[0].icon;
    //                     console.log(myIcon);
    //                     $("h1").append("<img src='https://openweathermap.org/img/wn/" + myIcon + "@2x.png'></img>");

    //                 }

    //             });

    //     });
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
            var city = cityList[parseInt(this.id.substring(10))];
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
    var city = $("#inlineFormInputName2").val();
    upDateCityList(city);
    $("#inlineFormInputName2").val("City");
    var requestLonLatUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=ee5b200caf5e4e0c89120f545016875d"
    getWeather(requestLonLatUrl);
});


// Program Start
var cityList = [];
checkCityList();

// var city = prompt("Enter City");

// var requestLonLatUrl = "https://api.opencagedata.com/geocode/v1/json?q=" + city + "&key=ee5b200caf5e4e0c89120f545016875d"

// getWeather(requestLonLatUrl);

// UV Index 0-2 = Low (green) 3-7 Moderate (yellow)  8+ High (red)  per https://www.epa.gov/sunsafety/uv-index-scale-0