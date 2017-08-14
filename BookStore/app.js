var myapp = angular.module('myapp', ["ngRoute", "ngAnimate"]);

myapp.config(function($routeProvider) {
	$routeProvider
		.when("/books",{
			templateUrl:"book-list.html",
			controller:"bookListCtrl"
		})
		.when("/cart", {
			templateUrl:"cart-list.html",
			controller:"cartListCtrl"
		})
		.otherwise({
			redirectTo:"/books"
		});
});

myapp.factory("bookService", function() {
	var books = [
		{
			cover:"cover1.jpg",
			title:"DUNE",
			price:150,
			rating:5,
			binding:"Nilkhet",
			publisher:"GP",
			releaseDate: "14 Feb, 2017",
			details:"lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum."
		},
		{
			cover:"cover2.jpg",
			title:"The Happy Lemon",
			price:130,
			rating:3,
			binding:"Nilkhet",
			publisher:"Anondo",
			releaseDate: "19 Apr, 2017",
			details:"lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum."
		},
		{
			cover:"cover3.jpg",
			title:"Love Does",
			price:180,
			rating:8,
			binding:"Nilkhet",
			publisher:"Modern",
			releaseDate: "14 Feb, 2017",
			details:"lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum."
		},
		{
			cover:"cover4.jpg",
			title:"Pattern Maker",
			price:170,
			rating:6,
			binding:"Nilkhet",
			publisher:"Vai Vai",
			releaseDate: "25 Aug, 2017",
			details:"lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum. lorem Ipsum."
		},
	];
	return{
		getBooks: function() {
			return books;
		}
	}
});

myapp.factory("cartService", function() {
	var cart= [];
	return{
		getCart: function() {
			return cart;
		},
		add: function(book) {
			cart.push(book);
		},
		buy: function(book) {
			alert("Thank you for buying ", book.title);
		}
	}
});

myapp.controller('headerCtrl', function($scope, $location){
	$scope.header={
		title:"BookMart",
		tagline:"We give you the knowledge of 1 Million"
	};
	$scope.nav={};
	$scope.nav.isActive=function(path) {
		if (path === $location.path()) {
			return true;
		}
		return false;
	}
})

myapp.controller('bookListCtrl', function($scope, bookService, cartService){
	$scope.books=bookService.getBooks();

	$scope.add2Cart = function(book) {
		cartService.add(book);
	}
})

myapp.controller("cartListCtrl", function($scope, cartService) {
	$scope.cart= cartService.getCart();

	$scope.buy=function(book) {
		cartService.buy(book);
	}
})