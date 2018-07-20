class Weather {
    fetchFromAPI() {
        Ajax.getURL(
            "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22Balingen%2C%20de%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
            function(resTxt) {
                var parsedJSON = JSON.parse(resTxt);

                this.findMatchingIcon(parsedJSON.query.results.channel.item.condition.text);

                document.getElementById("weatherTemperature").innerText = Math.round((parsedJSON.query.results.channel.item.condition.temp - 32) / 1.8) + " °C";
            }.bind(this),
            function() {
                Popup.open("Wetter konnte nicht geladen werden!");
            }
        );
    }

    findMatchingIcon(weatherValue) {
        var weatherType = "close";
        console.log('weather', weatherValue.toLowerCase());
        switch(weatherValue.toLowerCase()) {
            case "freezing drizzle":
            case "drizzle":
            case "freezing rain":
            case "showers":
            case "hail":
            case "mixed rain and hail":
            case "scattered showers":
            case "rain":
                weatherType = "rainy";
                break;
            case "tornado":
            case "tropical storm":
            case "hurricane":
            case "severe thunderstorms":
            case "thunderstorms":
            case "blustery":
                weatherType = "thunderstorm";
                break;
            case "dust":
            case "foggy":
            case "haze":
            case "smoky":
            case "cloudy":
            case "mostly cloudy (night)":
            case "mostly cloudy (day)":
            case "mostly cloudy":
                weatherType = "cloudy";
                break;
            case "mixed rain and snow":
            case "mixed rain and sleet":
            case "mixed snow and sleet":
            case "snow flurries":
            case "light snow showers":
            case "blowing snow":
            case "snow":
            case "sleet":
            case "heavy snow":
            case "scattered snow showers":
            case "snow showers":
            case "cold":
                weatherType = "snow";
                break;
            case "windy":
            case "clear(night)":
            case "clear(day)":
            case "clear":
            case "sunny":
            case "hot":
                weatherType = "sunny";
                break;
            case "partly cloudy":
            case "partly cloudy (night)":
            case "partly cloudy (day)":
            case "fair (night)":
            case "fair (day)":
            case "fair":
                weatherType = "sunny";
                break;
        }

        this.changeIcon(weatherType);
    }

    changeIcon(iconName) {
        document.getElementById("weatherIcon").classList.add("ion-ios-" + iconName + "-outline");
    }
}