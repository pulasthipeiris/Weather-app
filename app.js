const express = require ('express');
const { get } = require('http');
const https = require('https'); //don't need to install because it is native and is already bundled
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const port = 3000;

app.get('/', function(req, res){

    res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
    const query = req.body.cityName;
    const apiKey = "853f72376b905a0a783e4dec1370de6f";
    const units = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

    https.get(url, function(response){

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const desc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius with " + desc + ".</h1>");
            res.write("<img src=" + imageURL + "></img>");
            res.send();
        })
    })
})

app.listen(port, function(){
    console.log("Server is running on port 3000")
});