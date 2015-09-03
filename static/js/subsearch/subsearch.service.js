(function () {
  'use strict';
  angular.module('tradeTapp.subsearch').factory('subsearch', subsearch);

  subsearch.$inject = ['$http','$q'];

  function subsearch ($http,$q) {
    var service = {
      get_local_subs: get_local_subs,
      get_global_subs: get_global_subs,
      get_filter_values: get_filter_values,
      get_display_count: get_display_count,
      filter_results: filter_results
    };
    var filter_details = 
    {"revenue": 
    {"< 5 Million": { "min": 0,"max": 4999999},
     "5 to 10 Million": {"min": 5000000,"max": 9999999},
     "10 to 100 Million": {"min": 10000000, "max": 99999999},
     "100+ Million": {"min": 100000000, "max": 999999999999}}
     };
     var display_count = 0

  return service;

  function get_local_subs() {
    var promise = $http.get("../static/data/carddata_local.json").then(function (response) {
      var sub_data = response.data;
      for(var sub in sub_data){
        sub_data[sub].hide = false;
        sub_data[sub].type = "local";
        sub_data[sub].location = sub_data[sub].location_city + ", " + sub_data[sub].location_state;
      }
      return sub_data;
    }, function(response) {
                  // something went wrong
                  return $q.reject(response.data);
                });      
    return promise;
  }
 function get_global_subs() {
    var promise = $http.get("../static/data/carddata_global.json").then(function (response) {
      var sub_data = response.data;
      for(var sub in sub_data){
        sub_data[sub].name = "";
        sub_data[sub].hide = false;
        sub_data[sub].type = "global";
        sub_data[sub].location = sub_data[sub].location_city + ", " + sub_data[sub].location_state;
      }
      return sub_data;
    }, function(response) {
                  // something went wrong
                  return $q.reject(response.data);
                });      
    return promise;
  }


  function filter_results(subs,filters) {
    display_count = subs.length;
    for(var sub_index in subs) {
      subs[sub_index].hide = false;
    }
    for(var filter in filters) {
      var subs_to_filter = {};
      var filter_found = false;
      for(var value_index in filters[filter].value) {
        if(filters[filter].value[value_index] === "") {
          break;
        }
        filter_found = true;
        for(sub_index in subs) {
          if(subs[sub_index].hide === false) {
           if(filters[filter].compare === "equals" &&
            subs[sub_index][filter] === filters[filter].value[value_index]) {
             subs_to_filter[sub_index] = true;   
           }
           else if(filters[filter].compare === "range" &&
                   (subs[sub_index][filter] >= filter_details[filter][filters[filter].value[value_index]].min && 
                   subs[sub_index][filter] <= filter_details[filter][filters[filter].value[value_index]].max)) {
             subs_to_filter[sub_index] = true;     
           }
           else if(filters[filter].compare === "contains" &&
             (subs[sub_index][filter].search(new RegExp(filters[filter].value[value_index], "i")) > -1)) {
             subs_to_filter[sub_index] = true;     
           }
          }
        }
    }
    if(! filter_found) {
      continue;
    }
    for(sub_index in subs) {
      if(! (sub_index in subs_to_filter)) {
          if(!subs[sub_index].hide) {
              subs[sub_index].hide = true;  
              display_count--;
        }
      }
    }
  }
  return subs;
}
function get_display_count() {
    return display_count;
}

function get_filter_values(subs,filter_name) {
  if(filter_name in filter_details) {
    var filter_options = [];
    for(var filter_params in filter_details[filter_name]) {
      filter_options.push(filter_params);
    }
    return filter_options;
  }
  else {
    var unique_values = [];
    for(var sub_index = 0; sub_index < subs.length;sub_index++) {
      if(unique_values.indexOf(subs[sub_index][filter_name]) == -1) {
        unique_values.push(subs[sub_index][filter_name]);
      }      
    }
    return unique_values;
  }
}
}
})();