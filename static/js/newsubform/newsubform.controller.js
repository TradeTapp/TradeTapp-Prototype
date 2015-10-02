(function () {
  angular.module('tradeTapp.newsubform').controller('subFormController', function (newsubform,$scope, $state){

    var vm = this;
    //variable
    vm.page_number = 0;
    vm.form_pages = [];
    //functions
    vm.change_page = change_page;
    vm.next_page = next_page;
    vm.back_page = back_page;
    vm.get_form_pages = get_form_pages;

    activate();

    function activate() {
    	vm.form_pages = vm.get_form_pages();
    	vm.change_page(vm.page_number);
    }
    function change_page(page_number) {
    	vm.page_number = page_number;
    	$state.go(vm.form_pages[page_number].route);
    }
    function next_page() {
    	vm.page_number++;
    	vm.change_page(vm.page_number);
    }
    function back_page() {
    	vm.page_number--;
    	vm.change_page(vm.page_number);
    }
    function get_form_pages() {
    	return [{ 'route': 'newsubform.profile',
    	          'label': "Company Information"},
    	         {'route': 'newsubform.contacts',
    	          'label': 'Contacts'},
    	         {'route': 'newsubform.safety',
    	          'label': 'Safety Input'},
                 {'route': 'newsubform.insurance',
                  'label': 'Insurance'},
    	         {'route': 'newsubform.financials',
    	          'label': 'Financial Input'},
    	         {'route': 'newsubform.uploads',
    	          'label': 'Document Uploads'}];
    }


});
})();