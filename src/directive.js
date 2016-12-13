/**
 * @desc directive that will validate an IRANIAN national ID and impose relevant character and structure limits
 * @example <input ng-model="nationalid" maxlength="10" min-length="10" islet-iran-national-id />
 * @todo: Structure code in human-readable format (ex: xxx-xxxxxx-x)
**/
angular
  .module('angular-iran-national-id')
  .directive('isletIranNationalId', iranNationalId);

function iranNationalId() {
  var directive = {
    require: '?ngModel',
    restrict: 'A',
    link: link
  };
  return directive;

  function link(scope, element, attrs, ctrl) {
    var regexEqualDigits =  /^\D*(\d)(?:\D*|\1)*$/;
    var regexZeroLeadingDigits =  /^000/;

    if (!ctrl) {
      console.warn('ngModelCtrl does not exist!');
      return;
    }

    // Attach key evaluator to the element keypress event
    element.bind('keypress', keyPress);

    // Push custom validator to model validators collection
    ctrl.$validators.iranNationalId = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      return check(value);
    };

    function keyPress(e) {
      // Stop key press from propagating if the character code is not number...
      if (e.which < 48 || e.which > 57) {
        e.preventDefault();
      }
    }

    function input(val) {
      // If val is falsey (undefined, empty string, 10> length, etc)...
      if (!val || val.length > 10) {
        // Set the field validity to true since it should be the responsibility of 'required' & 'maxlenght' to stop blank & 10> entries
        ctrl.$setValidity('iranNationalId', true);
        return val;
      }

      var validationResult = true;

      // Check the Code validation with algorithm
      validationResult = check(val);

      // Set validity of field (will be displayed as class 'ng-valid-ip-address' or 'ng-invalid-ip-address')
      ctrl.$setValidity('iranNationalId', validationResult);

      // Replace the input value with the cleaned value in the view
      ctrl.$setViewValue(val);
      ctrl.$render();

      return val;
    }

    // National Code check algorithm
    function check(code) {
      var digitArray = code.split('');
      var checkDigit = digitArray.pop();
      var sigma = 0;

      // Prevent same digits
      if(regexEqualDigits.test(code)) {
        return false;
      }

      // Prevent leading 3-zero digits
      if(regexZeroLeadingDigits.test(code)) {
        return false;
      }

      digitArray.reverse();
      digitArray.forEach(function (item, index, array) {
        var pos = index + 2;
        sigma += (parseInt(item) * pos);
      });

      var r = sigma % 11;
      return r < 2 
        ? checkDigit == r 
        : checkDigit == 11 - r
      }
  }
}
