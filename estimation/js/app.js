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
	.when("/webdev", {
		templateUrl:"partial/webdev.html",
		controller:"webdevCtrl"
	})
	.when("/webdev-finish", {
		templateUrl:"partial/webdevfin.html",
		controller:"webdevfinCtrl"
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
		},
		estimate: function() {
			total=0;
			for (var i = 0; i < price.length; i++) {
				total = total+price[i];
			}
			var estimate = "";
			if (total >= 0 && total <= 10000) {
				estimate = "$"+total + " - $" + (total+590);
			} else if (total > 10000 && total <= 15000) {
				estimate = "$"+total + " - $" + (total+1090);
			} else if (total > 15000 && total <= 20000) {
				estimate = "$"+total + " - $" + (total+1290);
			} else if (total > 20000 && total <= 25000) {
				estimate = "$"+total + " - $" + (total+1390);
			} else if (total > 25000 && total <= 30000) {
				estimate = "$"+total + " - $" + (total+1490);
			}
			return estimate;
		}
	}
});


app.controller('pageCtrl', function($scope, $location, priceService) {
	// priceService.add();
	$scope.price = priceService.getPrice();
	$scope.allPrice = priceService.getAllPrice();
	$scope.choices = priceService.getChoice();
	$scope.estimate = priceService.estimate();
	// console.log($scope.allPrice);
	// console.log($scope.price);

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

app.factory('webdevService', function() {
	var features = [
	{
		name:"email login",
		price:300,
		icon:"glyphicon glyphicon-envelope",
		status:false
	},
	{
		name:"social login",
		price:300,
		icon:"glyphicon glyphicon-user",
		status:false
	},
	{
		name:"activity feed",
		price:1300,
		icon:"glyphicon glyphicon-thumbs-up",
		status:false
	},
	{
		name:"rating system",
		price:600,
		icon:"glyphicon glyphicon-star",
		status:false
	},
	{
		name:"multilingual",
		price:800,
		icon:"glyphicon glyphicon-globe",
		status:false
	},
	{
		name:"geo-location",
		price:800,
		icon:"glyphicon glyphicon-map-marker",
		status:false
	},
	{
		name:"custom UI",
		price:800,
		icon:"glyphicon glyphicon-eye-open",
		status:false
	},
	{
		name:"accept payments",
		price:1000,
		icon:"glyphicon glyphicon-credit-card",
		status:false
	},
	{
		name:"user profiles",
		price:600,
		icon:"glyphicon glyphicon-blackboard",
		status:false
	},
	{
		name:"messaging",
		price:800,
		icon:"glyphicon glyphicon-comment",
		status:false
	},
	{
		name:"maps",
		price:500,
		icon:"glyphicon glyphicon-screenshot",
		status:false
	},
	{
		name:"shopping cart",
		price:2800,
		icon:"glyphicon glyphicon-shopping-cart",
		status:false
	},
	{
		name:"notification",
		price:500,
		icon:"glyphicon glyphicon-ok-sign",
		status:false
	},
	{
		name:"search",
		price:800,
		icon:"glyphicon glyphicon-search",
		status:false
	},
	{
		name:"gallery",
		price:300,
		icon:"glyphicon glyphicon-picture",
		status:false
	},
	{
		name:"calander",
		price:300,
		icon:"glyphicon glyphicon-calendar",
		status:false
	},
	{
		name:"social sharing",
		price:800,
		icon:"glyphicon glyphicon-share",
		status:false
	},
	{
		name:"3rd-party API",
		price:4800,
		icon:"glyphicon glyphicon-hourglass",
		status:false
	},
	{
		name:"user privacy",
		price:300,
		icon:"glyphicon glyphicon-eye-close",
		status:false
	},
	{
		name:"sms intregation",
		price:800,
		icon:"glyphicon glyphicon-pencil",
		status:false
	},
	{
		name:"approval/moderation",
		price:0,
		icon:"glyphicon glyphicon-ban-circle",
		status:false
	},
	{
		name:"reporting",
		price:500,
		icon:"glyphicon glyphicon-alert",
		status:false
	},
	{
		name:"cms",
		price:1800,
		icon:"glyphicon glyphicon-equalizer",
		status:false
	},
	{
		name:"analytics",
		price:600,
		icon:"glyphicon glyphicon-stats",
		status:false
	},
	{
		name:"user administration",
		price:500,
		icon:"glyphicon glyphicon-modal-window",
		status:false
	},
	{
		name:"ticketing system",
		price:800,
		icon:"glyphicon glyphicon-bell",
		status:false
	},
	{
		name:"feedback system",
		price:500,
		icon:"glyphicon glyphicon-console",
		status:false
	},
	{
		name:"dashboard",
		price:300,
		icon:"glyphicon glyphicon-th-list",
		status:false
	},
	];
	var selected = [];
	var totalfin = 0;
	var state = false;
	return{
		getitems: function() {
			return features;
		},
		add: function(input) {
			selected = input;
			totalfin = 0;
			for (var i = 0; i < selected.length; i++) {
			totalfin += selected[i].price;
			}
			state=true;
		},
		getAll: function() {
			return selected;
		},
		getTotal: function() {
			return totalfin;
		},
		getState: function() {
			return state;
		}
	}

});

app.controller('webdevCtrl', function($scope, $location, webdevService) {
	
	$scope.items = webdevService.getitems();
	$scope.total=webdevService.getTotal();
	// console.log($scope.items);
	$scope.added =  webdevService.getAll();
	


	$scope.toggle = function (item) {
		
		if (!item.status) {
			$scope.add(item);
			item.status = !item.status;
		}
		else{
			$scope.remove(item);
			item.status = !item.status;
		}
	}

	$scope.add = function (item) {
		$scope.added.push(item);
		$scope.count();
		console.log($scope.added);
	};
	$scope.remove = function (item) {
		var index =$scope.added.indexOf(item);
		$scope.added.splice(index, 1);
		$scope.count();
		console.log($scope.added);
	};
	$scope.count = function() {
		var sum = 0;
		for (var i = 0; i < $scope.added.length; i++) {
			sum += $scope.added[i].price;
		}
		$scope.total = sum;
	};
	$scope.filled = function() {
		if ($scope.added.length >=1 ) {
			return true;
		}else{
			return false;
		}
	};
	$scope.go = function(path) {
		webdevService.add($scope.added);
		$location.path(path);
	};
	


});

app.controller('webdevfinCtrl', function($scope, $location, webdevService){
	$scope.fin = webdevService.getAll();
	$scope.total=webdevService.getTotal();

	// console.log(webdevService.getState());
	if (!webdevService.getState()) {
		$location.path('/landing');
	}
	$scope.reload = function() {
		$scope.fin = [];
		$scope.total=0;
		$location.path('/webdev');
	};
});