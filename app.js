const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

const index = require('./routes/index');
const users = require('./routes/users');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');

const app = express();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Math.random().toString(36).substring(7) + path.extname(file.originalname)); // semi random filenames
    }
});
const upload = multer({
    storage: storage
}); // https://github.com/expressjs/multer

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
app.use(bodyParser.urlencoded({
    extended: false
}));
// app.use(cors()); // vue js
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'dist'))); // webpack testing


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const api = require('./routes/api');

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    Picture.find({}, (err, pics) => {
        if (err) {
            throw err;
        } else {
            res.render('index', {
                user: req.user,
                pics: pics
            }); // get all images.. may be slow
        }
    });
});
app.use('/users', users);
app.use('/api', api);
app.get('/upload', (req, res) => {
    res.render('upload', {
        user: req.user
    });
});
app.get('/register', (req, res) => {
    res.render('register');
});
app.post('/register', (req, res) => {
    console.log(req.body);
    User.register(new User({
        username: req.body.username
    }), req.body.password, (err, account) => {
        if (err) {
            return res.render('register', {
                err: err.message
            });
            console.log(account);
            // res.send({err: account});
        } else {
            passport.authenticate('local')(req, res, function() {
                res.redirect('/users/' + account.username);
                console.log('success!');
                // res.send({success: account.username});
            });
        }
    });
});
app.get('/users/:username', (req, res) => {
    User.findOne({
        username: req.params.username
    }, (err, user) => {
        if (err) {
            res.render('user', {
                error: true
            });
            // res.send({user: user});
        } else {
            console.log(req.user);
            if (req.user) {
                const sha256 = crypto.createHash('sha256').update('Apple').digest("hex");
                res.cookie('login', sha256);
            }
            res.render('user', {
                prof: user,
                user: req.user
            });
            // res.send({user: user});
        }
    });
});
app.get('/login', (req, res) => {
    res.render('register', {
        act: '/login'
    });
});
app.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login'
    }),
    function(req, res) {
        res.redirect('/users/' + req.user.username);
    });
app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
app.post('/upload', upload.single('pic'), (req, res) => {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    console.log(req.body);
    const pic = new Picture({
        // todo
        author: req.body.author || 'Anonymous',
        name: req.file.filename,
        tags: req.body.tags.split(' ')
    });

    pic.save((err, saved) => {
        if (err) {
            throw err;
        }
        console.log(saved);
        res.redirect('/img/' + req.file.filename); // add tags to upload.hbs
    });
});
app.get('/img/:filename', (req, res) => {
    Picture.findOne({
        name: req.params.filename
    }, (err, pic) => {
        if (err) {
            res.render('picture', {
                'err': true
            });
        } else {
            res.render('picture', {
                'pic': pic,
                user: req.user
            });
        }
    });
});
app.post('/img/:filename', (req, res) => { // edit tags / other attributes?
    Picture.findOne({
        name: req.params.filename
    }, (err, pic) => {
        if (err) {
            throw err;
        } else if (pic === undefined) {
            res.status(404);
            res.render('picture', {
                'err': true
            });
        } else {
            pic.tags = req.body.tags.split(' ');
            pic.save(function(err, savepic) {
                console.log(savepic);
                res.redirect('/img/' + req.params.filename);
            });
        }
    });
});
app.post('/img/:filename/upvote', (req, res) => { // edit tags / other attributes?
    Picture.findOne({
        name: req.params.filename
    }, (err, pic) => {
      console.log('pic found on the upvote route!')
        if (err) {
            throw err;
        } else if (pic === undefined) {
            res.status(404);
            res.send({'err': true});
        } else {
            pic.votes += 1;
            pic.save(function(err, savepic) {
                console.log(savepic);
                res.send({votes: savepic.votes});
            });
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
