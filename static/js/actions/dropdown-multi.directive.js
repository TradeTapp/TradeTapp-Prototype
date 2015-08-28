angular
.module('tradeTapp.actions')
.directive('dropdownmulti', dropdownmulti);

function dropdownmulti() {
	var directive = {
		link: link,
		templateUrl: 'dropdown-multi-select.html',
		restrict: 'E',
		scope: {
			list: "=",
			selected: "=",
			triggerController: "&",
			label: "@",
		}

	};
	return directive;

	function link(scope, element, attrs) {
		scope.showDropdown = false;
		scope.toggleLoad = false;
		scope.selected_display = "";
		scope.selections = {};

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
			var value_index = scope.selected.indexOf(value);
			if(value_index > -1) {
				scope.selections[value] = false;
				scope.selected.splice(value_index,1);
			}
			else {
				scope.selections[value] = true;
				scope.selected.push(value);
			}
		};
		scope.clearSelected = function() {
			scope.selected = [];
     		scope.selections = {};
		};
		scope.getSelected = function() {
			var items_selected = scope.selected.length;
			if(items_selected > 1) {
				return items_selected + " Selected";
			}
			else {
			    return scope.selected[0];
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