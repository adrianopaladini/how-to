require('chai').should();
var assert	= require('assert');
var selenium = require('selenium-webdriver');
var driver;

var url = 'http://localhost:3000';

before(function(done) {
	driver = new selenium.Builder().usingServer('http://localhost:4444/wd/hub').withCapabilities(
		selenium.Capabilities.chrome()
	).build();

	// open start page
	driver.get('http://localhost:3000').then(function() {
		done();
	});
	
});

after(function(done) {
	//driver.sleep(1000);
	driver.quit().then(done);
});


describe('Todo Frontend', function(){

	describe('Page load', function() {
		 
	    it('Should verify if the home page is loaded',function(done){
			driver.findElement({id: 'todo-form'}).then(function(element){
			   	element.should.not.be.null;
			   	done();
			});			
			
	    });
	
	});

	describe('Add', function() {

		 
	    it('Should show an error message if the todo text is empty or null', function(done) {
			var searchBox = driver.findElement({id:'new-todo'});
			searchBox.clear();
			searchBox.click();
	        searchBox.sendKeys('\n').then(function() {
	            driver.switchTo().alert().then(function(alert){
					var errorTxt = alert['text_']['value_'];
					assert.equal(errorTxt,'New todo item can\'t be empty');
					alert.accept();
					done();
	            });
	        });
	    });

	    it('Should show an error message if the todo text is longer than 255 characters', function(done) {
			var newTodoText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc dignissim, velit sit amet congue bibendum, purus lorem convallis nibh, eget lobortis mi nibh id eros. Nullam laoreet interdum eros, at viverra mi ornare sed. Nam ornare sodales rhoncus. Nulla p";
			var searchBox = driver.findElement({id:'new-todo'});
			searchBox.clear();
			searchBox.click();
			searchBox.sendKeys(newTodoText).then(function(){
				driver.sleep(100);
				searchBox.sendKeys('\n').then(function(){
		            driver.switchTo().alert().then(function(alert){
						var errorTxt = alert['text_']['value_'];
						assert.equal(errorTxt,'New todo is too long. Keep it to 255 characters or less');
						alert.accept();
						done();
		            });
				});
	        });
	    });


	    it('Should verify if todo item has been successfully added', function(done) {
			var newTodoText = 'Agora vai';
			var addedElement = '';
			var searchBox = driver.findElement({id:'new-todo'});
			searchBox.clear();
			searchBox.click();
	        searchBox.sendKeys(newTodoText).then(function() {
				driver.sleep(100);
				searchBox.sendKeys('\n').then(function() {
					driver.findElement({xpath:"//ul[@id='todo-list']/li[1]/div[1]/label[1]"}).then(function(el) {
						el.getText().then(function(text) {
							assert.equal(text, newTodoText);
							done();
						});

				    }, function(err) {
						if (err.name == 'NoSuchElementError') {
							assert.ifError('Todo was not added to the list');
							done();
				        } else {
				            selenium.promise.rejected(err);
				        }
				    });


				});
	        });
	    });
	
	});

	describe('List', function(){

		it('Should have a list with a todo', function(done) {
			
			driver.findElement({xpath:"//ul[@id='todo-list']/li[1]"}).then(function(el) {
				done();
		    }, function(err) {
				if (err.name == 'NoSuchElementError') {
					assert.ifError('Todo was not added to the list');
					done();
		        } else {
		            selenium.promise.rejected(err);
		        }
		    });
	    });
	});

	describe('Done', function() { 

		it("Should have the class 'completed' if the todo is successfully marked as done", function(done){

			driver.findElement({xpath:"//ul[@id='todo-list']/li[1]/div[1]/input[1]"}).then(function(el) {
				el.click();

				driver.findElement({xpath:"//ul[@id='todo-list']/li[1]"}).then(function(el) {
					el.getAttribute('class').then(function(classes) {
						if (classes.indexOf('completed') == -1) {
							assert.ifError('Todo was not added to the list');
						};
						done();
					});
				});
		    });
		});
	});

	describe('Remove', function() {

		it('Should verify if the todo is successfully removed', function(done){

			driver.findElement({xpath:"//ul[@id='todo-list']/li[1]/div[1]/button[@class='destroy']"}).then(function(el) {
				el.click();

				driver.findElement({xpath:"//ul[@id='todo-list']/li[1]"}).then(function(el) {
					assert.ifError('Todo item should not exist in the list');
			    }, function(err) {
					if (err.name == 'NoSuchElementError') {
						done();
			        } else {
			            selenium.promise.rejected(err);
			        }
				});

		    });

		});

	});

	describe('Remain todos', function() {


		it('Should add three itens, and set done for one to the nexts tests', function(done){
			var searchBox = driver.findElement({id:'new-todo'});
			searchBox.click();
	        searchBox.sendKeys('Item 1').then(function() {
				driver.sleep(50);
				searchBox.sendKeys('\n').then(function() {
					driver.sleep(100);
					searchBox.sendKeys('Item 2').then(function() {
						driver.sleep(50);
						searchBox.sendKeys('\n').then(function() {
							driver.sleep(100);
							searchBox.sendKeys('Item 3').then(function() {
								driver.sleep(50);
								searchBox.sendKeys('\n').then(function() {
									driver.sleep(200);
									driver.findElement({xpath:"//ul[@id='todo-list']/li[2]/div[1]/input[1]"}).then(function(el){
										el.click();
										done();
									});
									
								});
							});
						});
					});
				});
			});
		});

		it('Should show correctly remains todos number', function(done) {
			driver.findElement({xpath:"//footer[1]/span[1]/strong[1]"}).then(function(el) {
				el.getText().then(function(text) {
					assert.equal(text, '2');
					done();
				});
			});
		});

	});

	describe('Filter', function() {


		it('Should show only active todos when the active filter is selected', function(done){
			driver.findElement({xpath:"//footer[1]/ul[1]/li[2]/a[1]"}).then(function(el) {
				el.click();
				driver.sleep(500);
				
				driver.executeScript(`
					var elements = document.getElementById('todo-list');
					var items = elements.getElementsByTagName('li');
					return items.length;
				`).then(function(items_count) {
					assert.equal(items_count, 2);
					done();
				});
			});
		});

		it('Should show only done todos when the Completed filter is selected', function(done){
			driver.findElement({xpath:"//footer[1]/ul[1]/li[3]/a[1]"}).then(function(el) {
				el.click();
				driver.sleep(500);
				
				driver.executeScript(`
					var elements = document.getElementById('todo-list');
					var items = elements.getElementsByTagName('li');
					return items.length;
				`).then(function(items_count) {
					assert.equal(items_count, 1);
					done();
				});
			});
		});

		it('Should show all todos when the all filter is selected', function(done){
			driver.findElement({xpath:"//footer[1]/ul[1]/li[1]/a[1]"}).then(function(el) {
				el.click();
				driver.sleep(500);
				
				driver.executeScript(`
					var elements = document.getElementById('todo-list');
					var items = elements.getElementsByTagName('li');
					return items.length;
				`).then(function(items_count) {
					assert.equal(items_count, 3);
					done();
				});
			});
		});


	});

});