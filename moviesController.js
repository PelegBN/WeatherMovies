var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://peleg:bnp2210@ds043982.mongolab.com:43982/weathermovies');

var movieSchema = require('./movies_schema').movieSchema;
mongoose.model('moviesM', movieSchema);
var movie;

mongoose.connection.once('open', function () {
		var movies = this.model('moviesM');

		var query = movies.find();
		//query.where('action').ne('PRIVATE');
		query.sort('temperature');
		query.exec(function(err, docs) {
			movie = docs;
			console.log("doc: " + movie);
			mongoose.disconnect();
			return movie;
		});
});

exports.getMovie = function(temperature) {

	var temp = temperature;
	var spot = Math.floor((movie.length)/2);

	if (temp > movie[spot]["temperature"]){
		while ((temp > movie[spot-1]["temperature"]) && (temp > movie [spot+1]["temperature"]) && (Math.floor((movie.length - spot)/2) > 0)) {
			if (temp > movie[spot]["temperature"]) spot = spot + Math.floor((movie.length - spot)/2);
			if (temp < movie[spot]["temperature"]) spot = spot - Math.floor((movie.length - spot)/2);
			if ((spot+1) == (movie.length)) break;
		} 
	} 
	else {
			if (temp < movie[spot]["temperature"]){
			while ((temp < movie[spot+1]["temperature"]) && (temp < movie [spot-1]["temperature"]) && (Math.floor(spot/2) > 0)) {
				if (temp < movie[spot]["temperature"]) spot = spot - Math.floor(spot/2);
				if (temp > movie[spot]["temperature"]) spot = spot + Math.floor(spot/2);
				if ((spot-1) < 0) break;
			} 
		}
	}

	if (((spot+1) == (movie.length)) || ((spot-1) < 0)) return movie[spot];

	var closest = spot-1;
	for (var i=0 ; i < 2 ; i++){
		if (Math.abs(temp - movie[spot+i]["temperature"]) < Math.abs(temp - movie[closest]["temperature"])) closest = spot+i;
	}
	return movie[closest];
};

exports.getMovieByID = function(movieId) {
	for (var i=0 ; i<movie.length ; i++)
	{
		if(movie[i]["_id"] == movieId)
			return movie[i];
	}
};

exports.getMovieUp = function(movieId, temp) {
	for (var i=0 ; i<movie.length ; i++)
	{
		if(movie[i]["_id"] != movieId && movie[i]["temperature"]>temp)
		{
			return movie[i];
		}
	}
	return movie[i-1];
};

exports.getMovieDown = function(movieId, temp) {
	for (var i=(movie.length-1) ; i>=0 ; i--)
	{
		if(movie[i]["_id"] != movieId  && movie[i]["temperature"]<temp) 
		{	
				return movie[i];
		}	
	}
	return movie[0];
};

exports.getMovieSameTemp = function(movieId, temp) {
	for (var i=0 ; i<movie.length ; i++)
	{
		if(movie[i]["_id"] != movieId  && movie[i]["temperature"]==temp) 
		{	
				return movie[i];
		}	
	}
	return exports.getMovieByID(movieId);
};
