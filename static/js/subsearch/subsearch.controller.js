(function () {
  angular.module('tradeTapp.subsearch').controller('SubsController', function (subsearch,$scope){

    var self = this;
    self.cardlist = [];
    self.filter_values = {
      "trades": [],
      "locations": [],
      "regions": []
    };
    self.selected_filters = {
      "trade": "",
      "location": "",
      "region": ""
    };

    subsearch.getsubs().then(function(data){ 
     self.cardlist = data;
     self.filter_values.trades = subsearch.get_unique_values(self.cardlist, "trade");
     self.filter_values.locations = subsearch.get_unique_values(self.cardlist, "location");
     self.filter_values.regions = subsearch.get_unique_values(self.cardlist, "region");
   });


    function filter_change() {
      for(var sub_index = 0; sub_index < self.cardlist.length;sub_index++) {
        self.cardlist[sub_index].hide = false;
      }
      for(var filter in self.selected_filters) {
        for(var sub_index = 0; sub_index < self.cardlist.length;sub_index++) {
          if(self.cardlist[sub_index].hide === false &&
             self.selected_filters[filter] !== "" &&
             self.cardlist[sub_index][filter] !== self.selected_filters[filter]) {
              self.cardlist[sub_index].hide = true;   
        }
      }
    }
  };

  $scope.$watch(function() {return self.selected_filters.trade}, function() { filter_change("trade")} );
  $scope.$watch(function() {return self.selected_filters.location}, function() { filter_change("location")} );
  $scope.$watch(function() {return self.selected_filters.region}, function() { filter_change("region")} );

});
})();