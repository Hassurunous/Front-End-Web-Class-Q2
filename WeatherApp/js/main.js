//Set variables
var citySelect = $("#city-selector");
var cityForm = $("#city-form");
var cityName = $("#city-name");
var dateSelect = $("#date-select");
var dateForm = $("#date-form");
var tempF = $("#current-temp-f");
var tempC = $("#current-temp-c");
var humidity = $("#humidity");
var wind = $("#wind-speed");
var icon = $("#icon");
var background = $("#background");
var foreground = $("#foreground");

var apikey = "2854c5771899ff92cd962dd7ad58e7b0";

function loadWeatherForLocation(city) {

    var path;
    console.log(city);

    if (city === null || city === "" || city === undefined) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var lat = location.coords.latitude;
            var lon = location.coords.longitude;
            path = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + apikey + "&units=imperial";
            console.log("Load weather for location:" + lat + " " + lon);
            getWeather();
        });
    } else {
        // Make a path with the city and api key
        path = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apikey;
        getWeather();
    }

    function getWeather() {
        // Use jQuery to load JSON data.
        $.get(path, function(data) {
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
            //weatherMain.html(data.weather[0].main);
            //desc.html(data.weather[0].description);
            // * Use the icon name to load an image for the weather.
            icon.html("<img src='weather-icons/" + data.weather[0].icon + ".png' width='300px'>");
            // For more info on icons and condition codes: https://openweathermap.org/weather-conditions

            // * Convert the temp from Kelvin to F or C.
            tempF.html("<h1>" + Math.round(data.main.temp) + "°</h1>");
            tempC.html("<h1>" + tempToC(data.main.temp) + "°</h1>");

            humidity.html("Humidity: " + data.main.humidity + "%");

            // Wind - These properties are some times missing. Check for undefined before displaying them!
            var windSpeed = data.wind.speed;
            var windDeg = data.wind.deg;
            var windGust = data.wind.gust;

            wind.html(windSpeed + " mph");

            //clouds.html(data.clouds.all);
            //dt.html(new Date(data.dt * 1000).toDateString());
            cityName.html(data.name);
        });
    }
}

// Helper functions

function tempToC(temp) {
    var result = Math.round((temp - 32) * (5 / 9));
    return result;
}

citySelect.click(function() {
    console.log("Clicked citySelect");
    cityForm.toggleClass("hidden");
});
