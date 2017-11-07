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
    author: {type: String, default: 'Anonymous'},
    path: String, // store path;
    votes: {type: Number, default: 0}, // array of voted on items;
    tags: [String], // list of tags that the user has liked
    voted: [User] // List of users that voted on this image.
});

User.plugin(URLSlugs('username'));
Picture.plugin(URLSlugs('name'));

mongoose.model('User', User);
mongoose.model('Picture', Picture);

mongoose.connect('mongodb://localhost/final');
