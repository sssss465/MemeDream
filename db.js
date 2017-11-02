const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs'); // possible usage
// example schema for meme dream

const User = new Schema({
    username: String,
    avatar: String,// avatar
    password: String,//hash;
    votes: [String], // array of voted on items by URL;
    tags: [String] // list of tags that the user has liked
});

const Picture = new Schema({
    name: String,
    path: String, // store path;
    votes: Number, // array of voted on items;
    tags: [String], // list of tags that the user has liked
    voted: [User] // List of users that voted on this image.
});

mongoose.model('User', User);
mongoose.model('Picture', Picture);

mongoose.connect('mongodb://localhost/final');
