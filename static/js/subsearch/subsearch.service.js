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
        var sub_data = response.data;
        for(var sub in sub_data){
          sub_data[sub].trade = sub_data[sub].trade.substr(11);
        }
        return sub_data;
      }, function(response) {
                  // something went wrong
                  return $q.reject(response.data);
                });      
      return promise;
    }
  }
})();