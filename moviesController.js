var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://peleg:bnp2210@ds043982.mongolab.com:43982/weathermovies');

var movieSchema = require('./movies_schema').movieSchema;
var moviesM = mongoose.model('moviesM', movieSchema);
var movie;

var userSchema = require('./user_schema').userSchema;
mongoose.model('userM', userSchema);
var user;

mongoose.connection.once('open', function () {
	var movies = this.model('moviesM');

	var query = movies.find();
	query.sort('temperature');
	query.exec(function(err, docs) {
		movie = docs;
		console.log("movies doc: " + movie);
		
		return movie;
	});

	var users = this.model('userM');

	var query = users.find();		
	query.exec(function(err, docs) {
		user = docs;
		console.log("user doc: " + user);
		
		return user;
	});
});

exports.getUser = function() {
	return user[0];
};

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

exports.getFavorites = function() {
	var moviesList = []
	for (var i=0 ; i<movie.length ; i++)
	{
		if(movie[i]["favorite"] == true) 
		{	
			moviesList.push(movie[i]);
		}	
	}
	return moviesList;
};

exports.setFavorite = function(movie_id) {
	console.log(movie_id);
	for (var i=0 ; i<movie.length ; i++)
	{
		if(movie[i]["_id"] == movie_id)
		{
			movie[i]["favorite"] = true;
			
			var query = moviesM.findOne().where('_id', movie_id);		
			query.exec(function(err, doc) {
				console.log(doc);
				var query = doc.update({$set:{favorite:true}});
				query.exec(function(err, results) {
					console.log("Results: " + JSON.stringify(results));
				});
			});
		}
	}
};

exports.findMovies = function(filter, query) {
	var moviesList = [];
	for (var i=0 ; i<movie.length ; i++)
	{
		switch(filter) {
		    case "year":
		        if(movie[i]["year"] == query) 
				{
					moviesList.push(movie[i]);
				}
		        break;
 			case "temperature":
		        if(movie[i]["temperature"] == query) 
				{
					moviesList.push(movie[i]);
				}
		        break;
		    case "genre":
		        if((movie[i]["genre"]).toLowerCase().indexOf(query.toLowerCase()) >= 0)
				{
					moviesList.push(movie[i]);
				}
		        break;

		     case "director":
		        if((movie[i]["director"]).toLowerCase().indexOf(query.toLowerCase()) >= 0)
				{
					moviesList.push(movie[i]);
				}
		        break;

		    case "stars":
		        if((movie[i]["stars"]).toLowerCase().indexOf(query.toLowerCase()) >= 0)
				{
					moviesList.push(movie[i]);
				}
		        break;

		    case "writer":
		        if((movie[i]["writer"]).toLowerCase().indexOf(query.toLowerCase()) >= 0)
				{
					moviesList.push(movie[i]);
				}
		        break;

		    case "all":
		        if(
		        	((movie[i]["genre"]).toLowerCase().indexOf(query.toLowerCase()) >= 0) 		||
		        	((movie[i]["director"]).toLowerCase().indexOf(query.toLowerCase()) >= 0) 	||
		        	(movie[i]["year"] == query) 												||
		        	((movie[i]["stars"]).toLowerCase().indexOf(query.toLowerCase()) >= 0) 		||
		        	((movie[i]["writer"]).toLowerCase().indexOf(query.toLowerCase()) >= 0) 		||
		        	((movie[i]["plot"]).toLowerCase().indexOf(query.toLowerCase()) >= 0) 		||
		        	((movie[i]["temperature"]) == query)								           )
				{
					moviesList.push(movie[i]);
				}
		        break;

		    default:

		        break;
		}		
	}
	return moviesList;
};



