// Get references to all of the elements that display info
var weatherMain = $("#weather-main");
var desc = $("#desc");
var icon = $("#icon");
var temp = $("#temp");
var humidity = $("#humidity");
var speed = $("#speed");
var clouds = $("#clouds");
var dt = $("#dt");
var locationName = $("#location-name");

var cityForm = $("#city-form");
var cityInput = $("#city-input");
var saveCityButton = $("#save-city-button");

// Load weather for the city saved in local storage, if there is a one...
var savedCity = getCity();
// Check this city if nothing was saved it should be undefined.
if (savedCity !== undefined) {
    // We saved a city load the weather!
    console.log("Loading Saved city:"+saveCity);
    loadData(savedCity);
} else {
    console.log("No saved city to load");
    $("body").addClass("no-weather");
}

// Call this method with the city name to load weather for that city
function loadData(city) {
    // Register and get an api key
    var apikey = "2854c5771899ff92cd962dd7ad58e7b0";
    // Make a path with the city and api key
    var path = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;

    // Use jQuery to load JSON data.
    $.get(path, function (data) {
        // Print the data to console. Go look at it right now!
        console.log(data);

        // Check for errors
        if (data.cod == 200) {
            $("body").removeClass("no-weather");
        } else {
            $("body").addClass("no-weather");
            return;
        }

        // data.weather array sometimes has more than one item!
        weatherMain.html(data.weather[0].main);
        desc.html(data.weather[0].description);
        // * Use the icon name to load an image for the weather.
        icon.html("<img src='weather-icons/" + data.weather[0].icon + ".png' width='300px'>");
        // For more info on icons and condition codes: https://openweathermap.org/weather-conditions

        // * Convert the temp from Kelvin to F or C.
        temp.html(kToF(data.main.temp, 0));

        humidity.html(data.main.humidity + "%");

        // Wind - These properties are some times missing. Check for undefined before displaying them!
        var windSpeed = MSToMPH(data.wind.speed, 1);
        var windDeg = data.wind.deg;
        var windGust = data.wind.gust;

        speed.html(windSpeed + " mph");

        clouds.html(data.clouds.all);
        dt.html(new Date(data.dt * 1000).toDateString());
        locationName.html(data.name);
    });
}


// Form

$("#city-form").submit(function (event) {
    event.preventDefault();
    console.log("City form Submit");
    var city = cityInput.val();
    $(".city-form-container").removeClass("show");
    // Show loading progress??
    loadData(city);
});

saveCityButton.click(function (event) {
    event.preventDefault();
    var city = cityInput.val();
    saveCity(city);
});

// Save city to local storage

function saveCity(cityName) {
    localStorage.setItem("weather-app", cityName);
}

// !!! This possibly returns null you must handle this!
function getCity() {
    return localStorage.getItem("weather-app");
}


// Buttons

$("#location-button").click(function(){
    $(".city-form-container").addClass("show");
});

$("#save-city-button").click(function(){
    // $(".city-form-container").addClass("show");
});


// Helper functions


function padWithZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function getTimeFrom(date) {
    var h = padWithZero(date.getHours());
    var m = padWithZero(date.getMinutes());
    var s = padWithZero(date.getSeconds());
    return h + ":" + m + ":" + s;
}

function kToF(t, decimals) {
    // Do some math and round to two decimal places.
    return (t * 9 / 5 - 459.67).toFixed(decimals);
}

function MSToMPH(s, decimals) {
    // Convert wind speed from m/s to mph
    return (s * 2.23694).toFixed(decimals);
}

function kToC(t, decimals) {
    return (t - 273.15).toFixed(decimals);
}
