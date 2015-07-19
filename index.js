var express = require('express');
var http = require('http');
var app = express();
var moviesCtrl = require('./moviesController');
//var userCtrl = require('./userController');
var Client = require('node-rest-client').Client; 
client = new Client();
var path = require('path');
var url = require('url');

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
            temperature = JSON.parse(data);
	    	temperature = temperature['main']['temp'];
	      	res.json(moviesCtrl.getMovie(temperature));       
    
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

app.get('/getMovieByIdMain/:id', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	res.json(moviesCtrl.getMovieByID(req.params.id));
});

app.get('/getMovieUp/:id/:temp', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	res.json(moviesCtrl.getMovieUp(req.params.id, req.params.temp));
});

app.get('/getMovieDown/:id/:temp', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	res.json(moviesCtrl.getMovieDown(req.params.id, req.params.temp));
});

app.get('/getMovieSameTemp/:id/:temp', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	res.json(moviesCtrl.getMovieSameTemp(req.params.id, req.params.temp));
});

app.get('/getMovieByTemp/:temp', function(req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	res.json(moviesCtrl.getMovie(req.params.temp));
});

app.get('/userDetails', function(req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	
	res.json(moviesCtrl.getUser());
});

app.get('/getFavorites', function(req, res) {

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	
	res.json(moviesCtrl.getFavorites());
});

app.get('/addToFavorite', function(req, res) {
	var urlPart = url.parse(req.url, true);
	var query = urlPart.query;
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);
	
	res.json(moviesCtrl.setFavorite(query.movieID));
});

app.get('/find', function (req, res) {
	var urlPart = url.parse(req.url, true);
	var query = urlPart.query;
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
	app.set('json spaces', 4);
	app.set('Content-Type', 'application/json');
	res.status(200);

	res.json(moviesCtrl.findMovies(query.filter, query.query));
});

app.listen(process.env.PORT || 3000);
console.log("Server is listening on port 3000");

