angular
.module('tradeTapp.actions')
.directive('dropdown', dropdown);

function dropdown() {
	var directive = {
		link: link,
		templateUrl: 'dropdown.html',
		restrict: 'E',
		scope: {
			list: "=",
			selected: "=",
			label: "@"
		}

	};
	return directive;

	function link(scope, element, attrs) {
		scope.showDropdown = false;
		scope.toggleLoad = false;
		scope.selected = "";

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
			scope.toggleDropdown();
		};
		scope.clearSelected = function() {
			scope.selected = "";
			scope.toggleDropdown();
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