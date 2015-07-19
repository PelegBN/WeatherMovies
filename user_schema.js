var mongoose = require('mongoose');
var schema = mongoose.Schema;
var userSchema = new schema({
name: {type: String, index: 1, unique: true, required: true},
picture: String,
Friends: [{Picture: String}],
Temperatures: [{year: Number, temp: Number}]
}, {collection: 'users'});
exports.userSchema = userSchema;