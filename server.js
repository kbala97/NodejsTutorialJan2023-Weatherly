const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()

const apiKey = '229d8a3801f9f396af9110654b2b59c7';
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')
 
app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})
 
app.post('/', function (req, res) {
    let city1 = req.body.city1;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city1}&units=metric&appid=${apiKey}`
    console.log(req.body.city1)
    request(url, function (err, response, body) {
      if(err){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weather = JSON.parse(body)
        if(weather.main == undefined){
          res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
          let weatherText = `It's ${weather.main.temp} degrees with ${weather.weather[0].main} in ${weather.name}!`;
          res.render('index', {weather: weatherText, error: null});
          console.log("body:", body)
        }
      }
    });
  })

  app.listen(3000, function () {
    console.log('Weatherly app listening on port 3000!')
  })