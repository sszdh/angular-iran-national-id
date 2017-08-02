(function() {
  'use strict';
  angular.module('app', ['angular-iran-national-id']);

  angular.module('app')
    .controller('MainController', MainController);

  function MainController() {
    var vm = this;

    vm.submit = submit;
    vm.national_id = '2286224331';

    function submit() {
      console.info('Form submitted successfully. ' + vm.national_id);
    }
  }
})();
