var tradeTapp = angular.module('tradeTapp', []);

tradeTapp.config(function($interpolateProvider,$httpProvider) 
{
    $interpolateProvider.startSymbol('[[');
    $interpolateProvider.endSymbol(']]');
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

});