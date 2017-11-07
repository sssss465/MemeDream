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

// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
// if we're in PRODUCTION mode, then read the configration from a file
// use blocking file io to do this...
const fs = require('fs');
const path = require('path');
const fn = path.join(__dirname, 'config.json');
const data = fs.readFileSync(fn);

// our configuration file will be in json, so parse it and set the
// conenction string appropriately!
const conf = JSON.parse(data);
dbconf = conf.dbconf;
} else {
// if we're not in PRODUCTION mode, then use
dbconf = 'mongodb://localhost/final';
}

mongoose.connect(dbconf);
