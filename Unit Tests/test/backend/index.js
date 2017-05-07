var request	= require('request');
var assert 	= require('assert');

var url = 'http://localhost:3000/api';

describe('Todo Backend', function(){

	describe('API', function() {
	 
	    it('Should verify if the API is alive!', function(done){

			request
				.get(url + '/')
				.on('response', function(response) {
					assert.equal(response.statusCode, 200, "Error in response status code. Should be 200");
					done();
				});
	    });
	});


	describe('Add', function() {
	 
	    it('should return an error if the string is null', function(done) {
			request.post({url: url + '/add', form: {title: null}}, function(error, response, body) {
					
					assert.equal(response.statusCode != 200, true, "Response must not be 200 if the title is null.");
					done();
				});
		});

	    it('should return an error if the string has more than 255 characters', function(done) {
		
			var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc imperdiet in nisi id facilisis. Aliquam tristique mi nec ligula dictum malesuada. Nullam tincidunt, erat quis blandit fringilla, nibh ante sodales ante, sed gravida arcu eros et sapien. Sed lobortis ipsum elit, sed fringilla massa luctus in. Vestibulum sit amet nibh non quam congue cursus id in est. Aenean lobortis non quam feugiat cursus. Sed lorem massa, volutpat id mollis id, vehicula vel quam. Nullam imperdiet est quam, a pulvinar erat rutrum nec. Donec condimentum sem vitae velit cursus, vel pretium dui pellentesque. Nulla suscipit felis orci, sed tempus nibh facilisis nec. Aenean at imperdiet elit, sit amet aliquam nibh. Maecenas aliquet felis non dolor ornare, nec imperdiet sem pretium. Integer tempor commodo consequat. Maecenas enim erat, dictum mollis diam non, feugiat ornare est";

			request.post({url: url + '/add', form: {title: lorem}}, function(error, response, body) {
					
					assert.equal(response.statusCode != 200, true, "Response must not be 200 if the title has more than 255 characters.");
					done();
				});
		});

	    it('should return OK if the string is valid and the todo is added successfully', function(done){

			request.post({url: url + '/add', form: {title: "Lorem ipsum dolor."}}, function(error, response, body) {
					
					assert.equal(response.statusCode, 200, "Response must be 200 if everything goes as planned.");
					done();
				});
	    });

	});

	describe('Remove', function() {

		it('should return an error if the ID is not passed', function(done){
			request.delete({url: url + '/del', form: {id: null}}, function(error, response, body) {
					
					assert.equal(response.statusCode != 200, true, "Response must not be 200 if ID is empty.");
					done();
				});
		});

		it('should return an error if the ID is not found', function(done){
			request.delete({url: url + '/del', form: {id: 99}}, function(error, response, body) {
					
					assert.equal(response.statusCode, 404, "Response must be 404 if ID is not found");
					done();
				});
		});

		it('should return OK if the ID is found and the todo is deleted successfully', function(done){
			request.delete({url: url + '/del', form: {id: 1}}, function(error, response, body) {
					
					assert.equal(response.statusCode, 200, "Response must be 200 if ID is found and was successfully deleted");
					done();
				});
		});

	});

	describe('Done', function(){

		it('should return an error if the ID is not passed', function(done){
			request.post({url: url + '/done', form: {id: null}}, function(error, response, body) {
					
					assert.equal(response.statusCode != 200, true, "Response must not be 200 if ID is empty.");
					done();
				});
		});

		it('should return an error if the ID is not found', function(done){
			request.post({url: url + '/done', form: {id: 99}}, function(error, response, body) {
					
				assert.equal(response.statusCode, 404, "Response must be 404 if ID is not found");
				done();
			});
		});

		it('should return OK if the ID is found and the todo is set as done successfully', function(done){
			request.post({url: url + '/done', form: {id: 1}}, function(error, response, body) {
					
				assert.equal(response.statusCode, 200, "Response must be 200 if ID is found and was successfully checked");
				done();
			});
		});

	});

	describe('List', function(){

		it('should return a JSON object with an array of todos', function(done) {
			request({url: url + '/list'}, function(error, response, body) {
					var parsedResponse = JSON.parse(body);
					assert.equal(parsedResponse.constructor, Array, "Response must be an array.");
					done();
				});
		});

	});

});