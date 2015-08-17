(function () {
  angular.module('tradeTapp.subsearch').controller('SubsController', function (subsearch,$scope){

    var self = this;
    self.cardlist = [];
    subsearch.getsubs().then(function(data){ 
     self.cardlist = data;
   }); 

    $scope.tradeSelected = "";
    $scope.applyFilters = function(sub) {
      console.log("Running filter")
      if($scope.tradeSelected !== "" && sub.trade !== $scope.tradeSelected){
        return false;
      } else {
        return true;
      }
    };
    $scope.clearFilter = function() {
      $scope.tradeSelected = "";
      for(var sub_index = 0; sub_index < self.cardlist.length;sub_index++) {
        self.cardlist[sub_index].visable = false;
      }
    }

    $scope.getTradeList = function(){
      unique_trades = [];
      for(var sub_index = 0; sub_index < self.cardlist.length;sub_index++) {
        if(unique_trades.indexOf(self.cardlist[sub_index].trade) == -1) {
          unique_trades.push(self.cardlist[sub_index].trade);
        }      
      }
      return unique_trades;
    };
    for(var sub_index = 0; sub_index < self.cardlist.length;sub_index++) {
     self.cardlist[sub_index].visable = true;
     console.log("Show me");
   }
   $scope.setFilter = function(trade) {
    $scope.tradeSelected = trade;
    for(var sub_index = 0; sub_index < self.cardlist.length;sub_index++) {
     if($scope.tradeSelected !== "" &&  self.cardlist[sub_index].trade !== $scope.tradeSelected){
       console.log("Show me");
       self.cardlist[sub_index].visable = true;
     }
     else {
       self.cardlist[sub_index].visable = false;
     }
   }
   $scope.toggleCustom();
 };

 $scope.menuDropdown = true;
 $scope.toggleCustom = function() {
  $scope.menuDropdown = $scope.menuDropdown === false ? true:false;
  event.stopPropagation();
};
window.onclick = function() {
  if (! $scope.menuDropdown) {
    $scope.menuDropdown = true;

        // You should let angular know about the update that you have made, so that it can refresh the UI
        $scope.$apply();
      }
    };

  });
})();