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
    vm.cardcount = 0;
    vm.pagenumber = 1;
    vm.pagecount = 0;
    vm.items_per_page =36;
    vm.page_list = [];
    vm.page_display_count = 0;
    //Functions
    vm.return_filters = return_filters;
    vm.trigger_filters = trigger_filters;
    vm.return_sort_data = return_sort_data;
    vm.sort_grid = sort_grid;
    vm.select_dataset = select_dataset;
    vm.show_current_page = show_current_page;
    vm.calc_page_info = calc_page_info;

    activate();

    function activate() {
      subsearch.get_local_subs().then(function(data){ 
        vm.local_subs = data;
        vm.cardlist = vm.local_subs;
        vm.filters = vm.return_filters();
        vm.sort_data = vm.return_sort_data();
        vm.trigger_filters();
        subsearch.get_global_subs().then(function(data){ 
            vm.global_subs = data;
        });
     });
    }

    function trigger_filters() {
      vm.cardlist = subsearch.filter_results(vm.cardlist, vm.filters);
      vm.cardcount = subsearch.get_display_count();
      vm.calc_page_info();
    }
    function sort_grid() {
      if(vm.sort_value === 'Financial: High to Low') {
          vm.reverse = true;
          vm.predicate = 'financial_rank';
      }
      else if(vm.sort_value ===  'Financial: Low to High') {
          vm.reverse = false;
          vm.predicate = 'financial_rank';
      }
      else if(vm.sort_value ===  'Safety: High to Low') {
          vm.reverse = true;
          vm.predicate = 'safety_rank';
      }
      else if(vm.sort_value === 'Safety: Low to High') {
          vm.reverse = false;
          vm.predicate = 'safety_rank';
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
        vm.trigger_filters();
    }
    function show_current_page(sub, index) {
      if(index === 0) {
          vm.page_display_count = 0;
      }
      if(sub.hide === true){
          return false;
      }
      min_index = (vm.pagenumber - 1) * vm.items_per_page;
      max_index = (vm.pagenumber * vm.items_per_page) - 1;
      if(vm.page_display_count >= min_index && vm.page_display_count <= max_index) {
        vm.page_display_count++;
        return true;
      }
      else {
        vm.page_display_count++;
        return false;
      }
    }
    function calc_page_info() {
        vm.page_list = [];
        vm.pagecount = ((vm.cardcount / vm.items_per_page) | 0) + 1;
        for(var page_number = 1; page_number <= vm.pagecount; page_number++) {
            vm.page_list.push(page_number);
        }
        vm.page_display_count = 0;
        vm.pagenumber = 1;
     }
    function return_filters () {
       return {
                  "name": {
                               "value": [],
                               "compare": "contains"},
                  "trade_name": {
                            "value": [],
                            "compare": "equals",
                            "possible_values": subsearch.get_filter_values(vm.cardlist, "trade_name")},
                  "location": {
                               "value": [],
                               "compare": "equals",
                              "possible_values": subsearch.get_filter_values(vm.cardlist, "location")},
                  "financial_rank_year": {
                             "value": [],
                             "compare": "equals",
                             "possible_values": (subsearch.get_filter_values(vm.cardlist, "financial_rank_year")).sort().reverse()},
                  "safety_rank_year": {
                             "value": [],
                             "compare": "equals",
                             "possible_values": subsearch.get_filter_values(vm.cardlist, "safety_rank_year")},
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
      return {"possible_values": ['Financial: High to Low','Financial: Low to High', 'Safety: High to Low', 'Safety: Low to High']
              };
    }
});
})();