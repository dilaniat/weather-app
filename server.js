const express = require('express'); //server-side js framework
const bodyParser = require('body-parser'); 
const request = require('request');
const app = express()

const apiKey = '865a6af1e0c888883e72bcc0a7ec4741';

app.use(express.static('public'));//allows express to access css file
app.use(bodyParser.urlencoded({ extended: true}));//allows access to req-body object
app.set('view engine', 'ejs')

//retrieves info from the server
app.get('/', function(req, res){
  res.render('index'); //render our view and sends equivalent HTML to client
})

//submits data to be processed
app.post('/', function(req, res){
    let city = req.body.city;//retrieve city input by user
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`//access API

//make API call
request(url, function (err, response, body) {
  //check for error
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      //parse JSON file
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's currently ${weather.main.temp} degrees with ${weather.weather[0].description} in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null});
      }
    }
  });
})

//server listening on port 3000 for connections
app.listen(3000, function() {
  console.log('Example listening on port 3000!')
})

