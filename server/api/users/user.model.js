var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tourtrack');
mongoose.connection.on('error', console.error.bind(console, 'MongoDb connection error: '));


var userSchema = new mongoose.Schema({

	name

})