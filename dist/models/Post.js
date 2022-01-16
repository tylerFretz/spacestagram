"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
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
module.exports = mongoose_1.default.model('Post', PostSchema);
