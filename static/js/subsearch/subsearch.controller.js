(function () {
  angular.module('tradeTapp.subsearch').controller('SubsController', function (subsearch,$scope){

    var vm = this;
    vm.cardlist = [];
    vm.filters = {};
    vm.return_filters = return_filters;
    vm.trigger_filters = trigger_filters;
    vm.current_sort = 
    vm.filter_change = false;

    activate();

    function activate() {
      subsearch.getsubs().then(function(data){ 
       vm.cardlist = data;
       vm.filters = vm.return_filters();
     });
    }

    function trigger_filters() {
        vm.cardlist = subsearch.filter_results(vm.cardlist, vm.filters);
    }
    function return_filters () {
       return {
                  "trade": {
                            "value": [],
                            "compare": "equals",
                            "possible_values": subsearch.get_filter_values(vm.cardlist, "trade")},
                  "location": {
                               "value": [],
                               "compare": "equals",
                              "possible_values": subsearch.get_filter_values(vm.cardlist, "location")},
                  "region": {
                             "value": [],
                             "compare": "equals",
                             "possible_values": subsearch.get_filter_values(vm.cardlist, "region")},
                  "revenue": {
                               "value": [],
                               "compare": "range",
                               "possible_values": subsearch.get_filter_values(vm.cardlist, "revenue")},
                  "union": {
                               "value": [],
                               "compare": "equals",
                               "possible_values": subsearch.get_filter_values(vm.cardlist, "union")}
              };
    }
    function return_sort_data () {
      return {"name": "Company Name",
              "trade": "Trade",
              "location": "Location",
              "region": "Region",
              "revenue": "Revenue",
              "union": "Union"
      }
    }

    $scope.$watch(function() {return vm.filter_change}, function() { vm.filter_change = false; vm.trigger_filters()});
});
})();