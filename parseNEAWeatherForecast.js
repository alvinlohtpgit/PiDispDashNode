var request = require('request');
var m = require('moment');
var fs = require('fs');


// Form our date string, we want to format it 15 minutes before the current time
var now = new Date()
const query_date = m(now).subtract(15 , "minutes").format(m.HTML5_FMT.DATETIME_LOCAL_SECONDS);

// Do a HTTP Get to the NEA weather service
const query_weather_url = `https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=${query_date}`;


request.get(query_weather_url, function(error, response,body){

    // Search for area = Tanglin
    const weatherjson = JSON.parse(body);
    const weather_forecasts = weatherjson['items'][0]['forecasts'];

    for(var counter = 0 ; counter < weather_forecasts.length ; counter++){
        
        var current_forecast_area = weather_forecasts[counter].area;

        if (current_forecast_area === 'Tanglin'){
            var current_forecast_weather =  weather_forecasts[counter].forecast;
            // Strip any brackets to get the absolute weather currently
            if ( ( current_forecast_weather.indexOf(' (') ) > 0){
                current_forecast_weather = current_forecast_weather.substr(0,  ( current_forecast_weather.indexOf(' (') ) );
                console.log(current_forecast_weather);
            }
        }
    }

});

