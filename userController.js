var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://peleg:bnp2210@ds043982.mongolab.com:43982/weathermovies');

var userSchema = require('./user_schema').userSchema;
mongoose.model('userM', userSchema);
var user;

mongoose.connection.once('open', function () {
		var users = this.model('userM');

		var query = users.find();		
		query.exec(function(err, docs) {
			user = docs;
			console.log("doc: " + user);
			mongoose.disconnect();
			return user;
		});
});

exports.getUser = function(temperature) {
	// for (var i=0 ; i<movie.length ; i++)
	// {
	// 	if(movie[i]["_id"] == movieId)
	// 		return movie[i];
	// }
	return user;
};
