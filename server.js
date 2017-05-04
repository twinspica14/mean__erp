var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public')); //this middleware gives access to front end
app.use('/api', appRoutes);




//mongoose.connect('mongodb://localhost:27017/grocery');
mongoose.connect('mongodb://nile649:kakashi649@ds161069.mlab.com:61069/plz');


app.get('*', function(req, res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});



app.listen(process.env.PORT || 3000);


