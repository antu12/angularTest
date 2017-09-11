var app = angular.module('myapp',["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/first",{
			templateUrl:"partial/first.html",
			controller:"pageCtrl"
		})
		.when("/edit1st",{
			templateUrl:"partial/first.html",
			controller:"editPageCtrl"
		})
		.when("/second", {
			templateUrl:"partial/second.html",
			controller:"pageCtrl"
		})
		.when("/edit2nd",{
			templateUrl:"partial/second.html",
			controller:"editPageCtrl"
		})
		.when("/third", {
			templateUrl:"partial/third.html",
			controller:"pageCtrl"
		})
		.when("/edit3rd",{
			templateUrl:"partial/third.html",
			controller:"editPageCtrl"
		})
		.when("/fourth", {
			templateUrl:"partial/fourth.html",
			controller:"pageCtrl"
		})
		.when("/edit4th",{
			templateUrl:"partial/fourth.html",
			controller:"editPageCtrl"
		})
		.when("/landing", {
			templateUrl:"partial/landing.html",
			controller:"pageCtrl"
		})
		.when("/finish", {
			templateUrl:"partial/finish.html",
			controller:"pageCtrl"
		})
		.otherwise({
			redirectTo:"/landing"
		});
});

app.controller('headerCtrl', function($scope, $location) {
	$scope.logo={
		title: "Question Demo",
		tagline: "Get price calculation"
	}
	$scope.nav={};
	$scope.nav.isActive=function(path) {
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
});

app.factory('priceService', function() {
	var price=[0,0,0,0,0];
	var choices = ['','','','',''];
	var total=0;
	return{
		add: function() {
			// console.log(JSON.stringify(infoService.infos));
			total=0;
			for (var i = 0; i < price.length; i++) {
				total = total+price[i];
			}
		},
		getPrice: function() {
			
			return total;
		},
		getChoice: function() {
			
			return choices;
		},
		getAllPrice: function() {
			
			return price;
		},
		push: function(input,index,choice) {
			price[index]=input;
			choices[index]=choice;
			// console.log('pushed '+ input);
			// console.log(price);
		}
	}
});


app.controller('pageCtrl', function($scope, $location, priceService) {
	// priceService.add();
	$scope.price = priceService.getPrice();
	$scope.allPrice = priceService.getAllPrice();
	$scope.choices = priceService.getChoice();
	console.log($scope.choices);

	if ($scope.choices[0] != "start") {
		$location.path('/landing');
	}

	$scope.go = function(path,price,index,choice) {
		priceService.push(price,index,choice);
		priceService.add();
		$location.path(path);
	}

	$scope.edit = function(path) {
		
		$location.path(path);
	}

});

app.controller('editPageCtrl',function($scope,$location, priceService) {
	$scope.price = priceService.getPrice();
	$scope.choices = priceService.getChoice();
	console.log($scope.choices);
	$scope.go = function(path,price,index,choice) {
		priceService.push(price,index,choice);
		priceService.add();
		$location.path('/finish');
	}
})