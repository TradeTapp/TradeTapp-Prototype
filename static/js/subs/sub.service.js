angular.module('tradeTapp').factory('subs', function($http,$location,$q){
   var subs = {
       getsubs: function() {
       	    url = "../static/data/carddata.json";
       	    var promise = $http.get(url).then(function (response) {
       	    	console.log(response);
                return response.data;
            }, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });      
            return promise;
       }

    };
    
	return subs;
});