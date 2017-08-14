var app = angular.module("groceryapp",["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
	.when("/items",{
		templateUrl:"views/items.html",
		controller: "homeCtrl"
	})
	.when("/addItem",{
		templateUrl:"views/addItem.html",
		controller:"itemsCtrl"
	})
	.when("/addItem/edit/:id",{
		templateUrl:"views/addItem.html",
		controller:"itemsCtrl"
	})
	.otherwise({
		redirectTo:"/items"
	})
});

app.controller("headerCtrl", function($scope) {
	$scope.title = "Shopping List"
});

app.controller("homeCtrl",function($scope, groceryService) {
	$scope.items= groceryService.groceryItems;

	$scope.removeItem = function(input) {
		groceryService.removeItem(input);
	};

	$scope.toggle = function(input) {
		groceryService.toggle(input);
	};

	$scope.$watch(function() {
		return  groceryService.groceryItems;
	}, function(groceryItems) {
		$scope.items = groceryItems;
	})
})

app.controller("itemsCtrl",function($scope, $routeParams, groceryService, $location) {
	

	if (!$routeParams.id) {
		$scope.item = {id:0, completed:false, itemName:"", date:new Date()};
	}else{
		$scope.item = _.clone(groceryService.findById(parseInt($routeParams.id)));
	}
	$scope.save = function() {
		groceryService.save($scope.item);
		console.log(groceryService.groceryItems);
		$location.path("/items");
	}
});

app.service("groceryService",function($http) {
	var groceryService = {};

	groceryService.groceryItems = [];

	var maxId = 0;

	$http
	.get("data/data.json")
	.then(function(response) {
		groceryService.groceryItems = response.data;
		for(var item in groceryService.groceryItems){
			groceryService.groceryItems[item].date = new Date(groceryService.groceryItems[item].date);
		}
		maxId = _.max(groceryService.groceryItems, function(entry) {
		return entry.id;
		});
		groceryService.newId = maxId.id + 0;
	});

	
	
	groceryService.getNewId = function() {

			if (groceryService.newId) {
				groceryService.newId++;
				return groceryService.newId;
			}
	};

	groceryService.findById = function(id) {
		for(var item in groceryService.groceryItems){
			if (groceryService.groceryItems[item].id === id) {
				return groceryService.groceryItems[item];
			}
		}
	};

	groceryService.save = function(input) {
		var updatedItem = groceryService.findById(input.id);
		if (updatedItem) {
			updatedItem.completed=input.completed;
			updatedItem.itemName=input.itemName;
			updatedItem.date=input.date;
		}else{
			// $http
			// .post("data/new.json", input)
			// .then(function(data) {
			// 	input.id=data.newId;
			// })
			input.id = groceryService.getNewId();
			groceryService.groceryItems.push(input);
		}
	};

	groceryService.removeItem = function(input) {
		var index = groceryService.groceryItems.indexOf(input);
		groceryService.groceryItems.splice(index, 1);
	};

	groceryService.toggle = function(input) {
		input.completed = !input.completed;
	};
	
	return groceryService;
});