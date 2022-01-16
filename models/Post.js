const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// Post schema used to track votes per post
// using post date as unique key
// votes is an array of user fingerprint ids
const PostSchema = new Schema({
	date: { type: Date, required: true, unique: true },
	votes: []
});

PostSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Post', PostSchema);