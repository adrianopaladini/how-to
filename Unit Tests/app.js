
/* LIBs */
var express   	= require('express');
var bodyParser	= require('body-parser');
var app = express();

/* Prepare to parse JSON */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* config the Frontend */
app.use('/', express.static('./frontend/'));

/* config the Backend */
app.use('/api', require('./backend/index'));

/* Start the server */
app.listen(3000, function() {
	console.log('Server is running.');
});