var express	= require('express');

var app = express();

/* Mocking the Data */

var mock = [
	{id:1,title:'Dojo',completed:false},
	{id:2,title:'CLAIN',completed:true},
	{id:3,title:'Send a mail to Mateus',completed:false}
];

app.get('/',function(req,res,err){
	res.status(200).json('API for todo');
});

app.get('/list',function(req,res,err){
	res.status(200).json(mock);
});

app.post('/add',function(req,res,err) {
	if (!req.body.hasOwnProperty('title')){
		return res.status(400).json({});
	}

	if (req.body['title'].length == 0) {
		return res.status(400).json({});	
	}

	if (req.body['title'].length > 255) {
		return res
			.status(400)
			.json({
				error: 'Title has more than 255 characters.'
			});
	}

	res.status(200).json({});
});

app.delete('/del',function(req,res,err){
	if (!req.body.hasOwnProperty('id')){
		return res.status(400).json({});
	}

	if (req.body['id'].length == 0) {
		return res.status(400).json({});
	}

	var worked = false;
	mock.forEach(function(item){
		if (item.id == req.body.id) {
			worked = true;
		}
	});

	if (!worked) {
		return res.status(404).json({});
	}

	res.status(200).json({});
});

app.post('/done',function(req,res,err){
	if (!req.body.hasOwnProperty('id')){
		return res.status(400).json({});
	}

	if (req.body['id'].length == 0) {
		return res.status(400).json({});
	}

	var worked = false;
	mock.forEach(function(item){
		if (item.id == req.body.id) {
			worked = true;
		}
	});

	if (!worked) {
		return res.status(404).json({});
	}

	res.status(200).json({});
	
});

module.exports = app;