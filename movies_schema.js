var mongoose = require('mongoose');
var schema = mongoose.Schema;
var movieSchema = new schema({
name: {type: String, index: 1, unique: true, required: true},
year: Number,
length: String,
director: String,
writer: String,
stars: String,
genre: String,
rate: Number,
plot: String,
poster: String,
temperature: Number,
similar: [String],
favorite: Boolean,
trailer: String
}, {collection: 'movies'});
exports.movieSchema = movieSchema;