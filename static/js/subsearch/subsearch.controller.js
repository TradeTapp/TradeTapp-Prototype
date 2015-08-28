(function () {
  angular.module('tradeTapp.subsearch').controller('SubsController', function (subsearch,$scope){

    var vm = this;
    vm.cardlist = [];
    vm.filters = {};
    vm.sort_data = {};
    vm.return_filters = return_filters;
    vm.trigger_filters = trigger_filters;
    vm.return_sort_data = return_sort_data;
    vm.sort_grid = sort_grid;
    vm.sort_value = "";
    vm.predicate = "";
    vm.reverse = false;
    vm.filter_change = false;
    vm.sort_change = false;

    activate();

    function activate() {
      subsearch.getsubs().then(function(data){ 
       vm.cardlist = data;
       vm.filters = vm.return_filters();
       vm.sort_data = vm.return_sort_data();
     });
    }

    function trigger_filters() {
      console.log("Filter");
      vm.cardlist = subsearch.filter_results(vm.cardlist, vm.filters);
    }
    function sort_grid() {
      if(vm.sort_value !== "") {
        vm.reverse = (vm.predicate === vm.sort_data[vm.sort_value]) ? !vm.reverse : false;
        vm.predicate = vm.sort_data[vm.sort_value];
      }
      else {
        vm.reverse = false;
        vm.predicate = "";
      }
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
      return {"possible_values": ['Financial Rank','Safety Rank'],
              "Financial Rank": 'financial_rank',
              "Safety Rank": 'safety_rank'};
    }
});
})();