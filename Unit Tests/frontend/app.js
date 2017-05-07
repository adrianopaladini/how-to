angular.module('todo', ['todo.controllers']);


angular.module('todo.controllers', [])
.controller('todoctrl', function($scope, $http) {

	$scope.saving = false;
	$scope.status = 0;
	$scope.statusFilter = '';
	$scope.remainingCount = 0;
	$scope.todos = [];

	$scope.addTodo = function() {
		if ($scope.newTodo == '' || $scope.newTodo === undefined) {
			$scope.newTodo = '';
			alert('New todo item can\'t be empty');
		} else if ($scope.newTodo.length > 254) {
			$scope.newTodo = '';
			alert('New todo is too long. Keep it to 255 characters or less');
		} else {
			var n = $scope.todos.length+1;
			$scope.todos.push({id: n ,title:$scope.newTodo,completed:false});
			$scope.remainingCount = $scope.todos.filter(function(e){ return e.completed==false; }).length;
			$scope.newTodo = '';
		}
	};

	$scope.doneTodo = function(todo) {
		//alert('Done');
		$scope.remainingCount = $scope.todos.filter(function(e){ return e.completed==false; }).length;

	};

	$scope.removeTodo = function(index) {
		$scope.todos.splice(index, 1);
		$scope.remainingCount = $scope.todos.filter(function(e){ return e.completed==false; }).length;
	};

	var loadTodos = function() {
		/*
		$http.get('/api/?').then(function(sucess){
			alert(sucess.data);
		},function(error){
			alert(error.data);
		});
		*/
	

		// MOCK
		// $scope.todos =	[
		//               		{id:1,title:'Dojo',completed:false},
		//               		{id:2,title:'CLAIN',completed:true},
		//               		{id:3,title:'Send a mail to Mateus',completed:false}
		//               	];



		$scope.remainingCount = $scope.todos.filter(function(e){return e.completed==false;}).length;
	};

	$scope.filter = function(filter) {
		$scope.status = filter;
		switch(filter){
			case 0:
				$scope.statusFilter = '';
				break;
			case 1:
				$scope.statusFilter = {completed:false};
				break;
			case 2:
				$scope.statusFilter = {completed:true};
		}
	};

	var init = function() {
		loadTodos();
	}();

});