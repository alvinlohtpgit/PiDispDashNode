var request = require('request');
var m = require('moment');
var fs = require('fs');


// Form our date string, we want to format it 15 minutes before the current time
var now = new Date()
const query_date = m(now).subtract(15 , "minutes").format(m.HTML5_FMT.DATETIME_LOCAL_SECONDS);


// Form our temperature query string
const query_temp_url = `https://api.data.gov.sg/v1/environment/air-temperature?date_time=${query_date}`;

request.get(query_temp_url, function(error, response,body){
    //console.log(body);
    /*  
    fs.writeFile('temp.json', body , function(err){
        if (err){
            return console.log(err);
        }
    });
    console.log("Wrote File");
    */

    const tempJson = JSON.parse(body);
    const tempReadings = tempJson['items'][0]['readings'];

    for(var counter = 0; counter < tempReadings.length; counter++){
        var currentReading = tempReadings[counter];

        if (currentReading.station_id === 'S111'){
            var currentTemp = currentReading.value;
            console.log("Temp : " + currentTemp);
        }
    }

});