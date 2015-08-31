(function () {
  angular.module('tradeTapp.subsearch').controller('SubsController', function (subsearch,$scope){

    var vm = this;
    //Variables
    vm.cardlist = [];
    vm.local_subs = [];
    vm.global_subs = [];
    vm.filters = {};
    vm.sort_data = {};
    vm.sort_value = "";
    vm.predicate = "";
    vm.reverse = false;
    vm.filter_change = false;
    vm.sort_change = false;
    vm.dataset_selected = "local";
    //Functions
    vm.return_filters = return_filters;
    vm.trigger_filters = trigger_filters;
    vm.return_sort_data = return_sort_data;
    vm.sort_grid = sort_grid;
    vm.select_dataset = select_dataset;

    activate();

    function activate() {
      subsearch.get_local_subs().then(function(data){ 
        vm.local_subs = data;
        vm.cardlist = vm.local_subs;
        vm.filters = vm.return_filters();
        vm.sort_data = vm.return_sort_data();
        subsearch.get_global_subs().then(function(data){ 
            vm.global_subs = data;
        });
     });
    }

    function trigger_filters() {
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
    function select_dataset() {
        if(vm.dataset_selected === "local"){
            vm.cardlist = vm.local_subs;
        }
        else if (vm.dataset_selected === "global") {
            vm.cardlist = vm.global_subs;
        }
        else if (vm.dataset_selected === "all") {
            vm.cardlist = vm.local_subs.concat(vm.global_subs);
        }
    }
    function return_filters () {
       return {
                  "trade_name": {
                            "value": [],
                            "compare": "equals",
                            "possible_values": subsearch.get_filter_values(vm.cardlist, "trade_name")},
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