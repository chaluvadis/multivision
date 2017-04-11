let express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

let env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';
let app = express();

app.set('views', __dirname + '/server/views');
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(stylus.middleware({
    src: __dirname + '/public'
}));


app.use(express.static(__dirname + '/public'));

app.get('*', (req, res) => {
    res.render('index');
});


app.get('/partials/:partialsPath', (req, res) => {
    res.render('partials/' + req.params.partialsPath);
});

app.listen(3000, () => {
    console.log('app is running on 3000');
});