angular
.module('tradeTapp.actions')
.directive('dropdown', dropdown);

function dropdown() {
	var directive = {
		link: link,
		templateUrl: 'dropdown-select.html',
		restrict: 'E',
		scope: {
			list: "=",
			selected: "=",
			triggerController: "&",
			label: "@",
			selectclose: "@"
		}

	};
	return directive;

	function link(scope, element, attrs) {
		scope.showDropdown = false;
		scope.toggleLoad = false;
		scope.selectclose = angular.isDefined(scope.selectclose) ? (scope.selectclose !== 'false') : true;

		scope.toggleDropdown = function() {
			if(scope.showDropdown) {
				scope.showDropdown = false;
				//$(document).unbind('click');
			}
			else {
				scope.showDropdown = true;
			}
		};
		scope.setValue = function(value) {
			scope.selected = value;	
			if(scope.selectclose){
				scope.toggleDropdown();
			}
		};
		scope.clearSelected = function() {
			scope.selected = "";
			if(scope.selectclose){
				scope.toggleDropdown();
			}
		};
		$(document).bind('click', function(event){
			var isClickedElementChildOfPopup = element
			.find(event.target)
			.length > 0;

			if (isClickedElementChildOfPopup)
				return;

			scope.$apply(function(){
				scope.showDropdown = false;
				// $(document).unbind('click');
			});
		});
	}

}