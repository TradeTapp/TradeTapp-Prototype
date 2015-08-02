angular.module('tradeTapp').controller('SubsController', function (subs,$scope){
    
  var self = this;
  subs.getsubs().then(function(data){ 
      self.cardlist = data;
  }); 
  $scope.filterByCheckbox = function(sub) {
  	   console.log("I am doing it");
      if($scope.filters && sub.name != 'Subcontractor A'){
          return false;
      } else {
          return true;
      }
  };
});