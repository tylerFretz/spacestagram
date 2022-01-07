import mongoose from 'mongoose';
const Schema = mongoose.Schema;

interface Post {
	date: Date,
	votes: [Record<string, unknown>]
}

// Post schema used to track votes per post
// using post date as unique key
const PostSchema = new Schema<Post>({
	date: { type: Date, required: true, unique: true },
	votes: [{ fingerPrintId: { type: String } }]
});

PostSchema.set('toJSON', {
	transform: (_document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Post', PostSchema);