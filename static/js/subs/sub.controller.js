angular.module('tradeTapp').controller('SubsController', function (subs,$scope){

  var self = this;
  subs.getsubs().then(function(data){ 
    self.cardlist = data;
  }); 

  $scope.tradeSelected = "";
  $scope.applyFilters = function(sub) {
    if($scope.tradeSelected !== "" && sub.trade !== $scope.tradeSelected){
      return false;
    } else {
      return true;
    }
  };

  $scope.getTradeList = function(){
    unique_trades = [];
    if(self.cardlist === undefined) {
      return unique_trades;
    }
    for(var sub_index = 0; sub_index < self.cardlist.length;sub_index++) {
      if(unique_trades.indexOf(self.cardlist[sub_index].trade) == -1) {
        unique_trades.push(self.cardlist[sub_index].trade);
      }      
    }
    return unique_trades;
  };
  $scope.setFilter = function(trade) {
    $scope.tradeSelected = trade;
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