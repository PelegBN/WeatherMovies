var express = require('express');
var http = require('http');
var app = express();
var moviesCtrl = require('./moviesController');
var Client = require('node-rest-client').Client; 
client = new Client();
var path = require('path');

app.use('/', express.static('./public'));
app.use('/images',express.static(path.join(__dirname, 'images')));

app.get('/', function(req, res) {
	console.log("Out Docs: " + moviesCtrl.getMovie());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	
	var temperature;

  	client.get("http://api.openweathermap.org/data/2.5/weather?id=293397&units=metric", function(data, response){
            // parsed response body as js object 

            temperature = JSON.parse(data);
	    	temperature = temperature['main']['temp'];

	    	console.log(temperature);

	      	res.json(moviesCtrl.getMovie(temperature));
	      	//res.json(moviesCtrl.getMovie(29));
       
    });
});

app.get('/getMovieByID/:id', function(req, res) {
	console.log("Out Docs: " + moviesCtrl.getMovie());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	
	res.json(moviesCtrl.getMovieByID(req.params.id)); 
});

app.get('/getMovieByTemp/:temp', function(req, res) {
	//console.log("Out Docs: " + moviesCtrl.getMovie());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	res.json(moviesCtrl.getMovie(req.params.temp));
	//res.json(moviesCtrl.getMovieByID(req.params.id)); 
});

app.get('/getMovieUp/:id/:temp', function(req, res) {
	//console.log("Out Docs: " + moviesCtrl.getMovie());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	console.log("MovieUp " + req.params.id+" "+req.params.temp);
	res.json(moviesCtrl.getMovieUp(req.params.id, req.params.temp));
	//res.json(moviesCtrl.getMovieByID(req.params.id)); 
});

app.get('/getMovieDown/:id/:temp', function(req, res) {
	//console.log("Out Docs: " + moviesCtrl.getMovie());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	console.log("MovieDown " + req.params.id+" "+req.params.temp);

	res.json(moviesCtrl.getMovieDown(req.params.id, req.params.temp));
	//res.json(moviesCtrl.getMovieByID(req.params.id)); 
});

app.get('/getMovieSameTemp/:id/:temp', function(req, res) {
	//console.log("Out Docs: " + moviesCtrl.getMovie());
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	console.log("MovieDown " + req.params.id+" "+req.params.temp);

	res.json(moviesCtrl.getMovieSameTemp(req.params.id, req.params.temp));
	//res.json(moviesCtrl.getMovieByID(req.params.id)); 
});


app.listen(3000);
console.log("Server is listening on port 3000");