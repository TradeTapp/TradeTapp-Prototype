(function () {
  'use strict';
  angular.module('tradeTapp.subsearch').factory('subsearch', subsearch);

  subsearch.$inject = ['$http','$q'];

  function subsearch ($http,$q) {
    var service = {
      getsubs: getsubs
    };

    return service;

    function getsubs() {
      var promise = $http.get("../static/data/carddata.json").then(function (response) {
        console.log(response);
        return response.data;
      }, function(response) {
                  // something went wrong
                  return $q.reject(response.data);
                });      
      return promise;
    }
  }
})();