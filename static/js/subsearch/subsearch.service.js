(function () {
  'use strict';
  angular.module('tradeTapp.subsearch').factory('subsearch', subsearch);

  subsearch.$inject = ['$http','$q'];

  function subsearch ($http,$q) {
    var service = {
      getsubs: getsubs,
      get_unique_values: get_unique_values,
    };

    return service;

    function getsubs() {
      var promise = $http.get("../static/data/carddata.json").then(function (response) {
        var sub_data = response.data;
        for(var sub in sub_data){
          sub_data[sub].trade = sub_data[sub].trade.substr(11);
          sub_data[sub].hide = false;
          sub_data[sub].location = sub_data[sub].location_city + ", " + sub_data[sub].location_state;
        }
        return sub_data;
      }, function(response) {
                  // something went wrong
                  return $q.reject(response.data);
                });      
      return promise;
    }

    function get_unique_values(subs,property) {
      var unique_values = [];
      for(var sub_index = 0; sub_index < subs.length;sub_index++) {
        if(unique_values.indexOf(subs[sub_index][property]) == -1) {
          unique_values.push(subs[sub_index][property]);
        }      
      }
      return unique_values;
    }
  }
})();