(function() {

	angular.module('tradeTapp').config(config);

	function config($interpolateProvider,$httpProvider,$stateProvider,$urlRouterProvider) 
	{
		$interpolateProvider.startSymbol('[[');
		$interpolateProvider.endSymbol(']]');
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

		$urlRouterProvider.otherwise("/");
		$stateProvider
		.state('home', {
			url: "/",
			templateUrl: "home.html"
		})
		.state('grid', {
			url: "/grid",
			templateUrl: "grid.html"
		})
		.state('newsubform', {
			url: "/newsubform",
			templateUrl: "newsubform.html"
		})
		.state('newsubform.profile', {
			url: "/profile",
			templateUrl: "newsubform-profile.html"
		})
		.state('newsubform.contacts', {
			url: "/contacts",
			templateUrl: "newsubform-contacts.html"
		})
		.state('newsubform.safety', {
			url: "/safety",
			templateUrl: "newsubform-safety.html"
		})
		.state('newsubform.financials', {
			url: "/financials",
			templateUrl: "newsubform-financials.html"
		})
		.state('newsubform.uploads', {
			url: "/uploads",
			templateUrl: "newsubform-uploads.html"
		})
		.state('setup', {
			url: "/setup",
			templateUrl: "setup.html"
		})
		.state('profile', {
			url: "/profile",
			templateUrl: "profile.html"
		});

	}
})();