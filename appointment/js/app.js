var app = angular.module('myapp',["ngRoute"]);

app.config(function($routeProvider) {
	$routeProvider
		.when("/appointments",{
			templateUrl:"partial/appointments.html",
			controller:"appointmentCtrl"
		})
		.when("/cars", {
			templateUrl:"partial/cars.html",
			controller:"carsCtrl"
		})
		.when("/branches", {
			templateUrl:"partial/branches.html",
			controller:"branchesCtrl"
		})
		.when("/slots", {
			templateUrl:"partial/slots.html",
			controller:"slotsCtrl"
		})
		.otherwise({
			redirectTo:"/appointments"
		});
});

app.controller('headerCtrl', function($scope, $location) {
	$scope.logo={
		title: "Car Appointment",
		tagline: "Get cars on demand"
	}
	$scope.nav={};
	$scope.nav.isActive=function(path) {
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
});

app.factory('appointmentService', function(infoService) {
	var appointments=[];
	return{
		add: function() {
			// console.log(JSON.stringify(infoService.infos));
			var infos = infoService.getInfo();
			var tmpObj= {};
			tmpObj["car"]=infos[0];
			tmpObj["branch"]=infos[1];
			tmpObj["timeslot"]=infos[2];
			// console.log(tmpObj);
			appointments.push(tmpObj);
			// console.log(appointments);
			infoService.clear();
		},
		getAppointments: function() {
			return appointments;
		}
	}
});
app.factory('infoService', function() {
	var infos=[];
	return{
		add: function(input) {
			infos.push(input);
			 // console.log(input);
		},
		getInfo: function() {
			return infos;
		},
		clear: function() {
			infos=[];
		}
	}
});

app.controller('appointmentCtrl', function($scope, $location, appointmentService) {
	$scope.appointments = appointmentService.getAppointments();
	console.log($scope.appointments);
	$scope.go = function(path) {
		$location.path(path);
	}
});


app.controller('carsCtrl',function($scope, $http, infoService, $location) {
	$scope.cars = [];
	$http
    .get("https://carhouse-86ffa.firebaseio.com/Cars.json")
    .then(function(response){
      $scope.cars = response.data;
    });
    $scope.go2branch = function(car) {
    	infoService.add(car);
    	$location.path('/branches');
    };
});

app.controller('branchesCtrl',function($scope, $http, infoService, $location) {
	$scope.branches = [];
	$http
    .get("https://carhouse-86ffa.firebaseio.com/Branches.json")
    .then(function(response){
      $scope.branches = response.data;
      // console.log($scope.branches);
    });
    $scope.go2slot = function(branch) {
    	infoService.add(branch);
    	$location.path('/slots');
    };
});

app.controller('slotsCtrl',function($scope, $http, infoService, $location, appointmentService) {
	$scope.slots = [];
	$http
    .get("https://carhouse-86ffa.firebaseio.com/TimeSlot.json")
    .then(function(response){
      $scope.slots = response.data;
      // console.log($scope.slots);
    });
    $scope.appDone = function(slot) {
    	infoService.add(slot);
    	appointmentService.add();
    	// var appointment = appointmentService.getAppointments();
    	$location.path('/appointments');
    };
});