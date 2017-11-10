const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');
const passport = require('passport');

const app = express();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Math.random().toString(36).substring(7) + path.extname(file.originalname)); // semi random filenames
  }
});
const upload = multer({ storage: storage}); // https://github.com/expressjs/multer

const mongoose = require('mongoose');
require('./db.js');
const User = mongoose.model('User');
const Picture = mongoose.model('Picture');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

app.use('/', index);
app.use('/users', users);
app.get('/upload', (req, res) => {
    res.render('upload');
});

app.post('/login', // passport code, did some research on strategies (oauth too)
    passport.authenticate('local'),
    function(req, res) {
        // If this function gets called, authentication was successful.
        // `req.user` contains the authenticated user.
        res.redirect('/users/' + req.user.username);
});
app.post('/upload', upload.single('pic'), (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    console.log(req.body);
    const pic = new Picture({
        // todo
        name: req.file.filename,
        tags: req.body.tags.split(' ')
    });
    pic.save((err, saved) => {
        if (err){
            throw err;
        }
        console.log(saved);
    });
    res.redirect('/img/' + req.file.filename); // add tags to upload.hbs

});
app.get('/img/:filename', (req, res) => {
    Picture.findOne({name: req.params.filename}, (err, pic) => {
        if (err) {
            throw err;
        } else if (Object.keys(pic).length === 0){
            res.status(404);
            res.render('picture', {'err': true});
        } else {
            res.render('picture', {'pic': pic});
        }
    });
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
