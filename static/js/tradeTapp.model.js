var tradeTapp = angular.module('tradeTapp', [
	'ui.router'
	]);

tradeTapp.config(function($interpolateProvider,$httpProvider,$stateProvider,$urlRouterProvider) 
{
	$interpolateProvider.startSymbol('[[');
	$interpolateProvider.endSymbol(']]');
	$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

	$urlRouterProvider.otherwise("/");
	$stateProvider
	.state('grid', {
		url: "/grid",
		templateUrl: "grid.html"
	})
	.state('form', {
		url: "/form",
		templateUrl: "form.html"
	})
		.state('form2', {
			url: "/form2",
			templateUrl: "form2.html"
		})
		.state('form3', {
			url: "/form3",
			templateUrl: "form3.html"
		})
		.state('form4', {
			url: "/form4",
			templateUrl: "form4.html"
		})
		.state('form5', {
			url: "/form5",
			templateUrl: "form5.html"
		})
		.state('setup', {
			url: "/setup",
			templateUrl: "setup.html"
		})
	.state('profile', {
		url: "/profile",
		templateUrl: "profile.html"
	});


});