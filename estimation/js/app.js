var app = angular.module('myapp',["ngRoute","ngAnimate"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/first",{
			templateUrl:"partial/first.html",
			controller:"pageCtrl"
		})
		.when("/second", {
			templateUrl:"partial/second.html",
			controller:"pageCtrl"
		})
		.when("/third", {
			templateUrl:"partial/third.html",
			controller:"pageCtrl"
		})
		.when("/fourth", {
			templateUrl:"partial/fourth.html",
			controller:"pageCtrl"
		})
		.when("/fifth", {
			templateUrl:"partial/fifth.html",
			controller:"pageCtrl"
		})
		.when("/sixth", {
			templateUrl:"partial/sixth.html",
			controller:"pageCtrl"
		})
		.when("/seventh", {
			templateUrl:"partial/seventh.html",
			controller:"pageCtrl"
		})
		.when("/eighth", {
			templateUrl:"partial/eighth.html",
			controller:"pageCtrl"
		})
		.when("/ninth", {
			templateUrl:"partial/ninth.html",
			controller:"pageCtrl"
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
	var price=[0,0,0,0,0,0,0,0,0];
	var choices = ['','','','','','','','',''];
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
	// console.log($scope.choices);

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
	$scope.reload = function() {
		location.reload();
	}

});