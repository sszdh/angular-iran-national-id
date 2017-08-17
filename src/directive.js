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

  function link(scope, element, attrs, ngModelCtrl) {
    var REGEX_DIGITS = /[^0-9]/g;
    var REGEX_EQUAL_DIGITS =  /^\D*(\d)(?:\D*|\1)*$/;
    var REGEX_LEADING_ZERO =  /^000/;

    if (!ngModelCtrl) {
      console.warn('ngModelCtrl does not exist!');
      return;
    }

    // Push custom parser to pipline
    ngModelCtrl.$parsers.push(parseToNumber);

    // Push custom validator to model validators collection
    ngModelCtrl.$validators.iranNationalId = function(modelValue, viewValue) {
      var value = modelValue || viewValue;
      return check(value);
    };

    // Parse the view value to number only.
    function parseToNumber(value) {
      var transformedValue = value.replace(REGEX_DIGITS, '');

      if (transformedValue !== value) {
          ngModelCtrl.$setViewValue(transformedValue);
          ngModelCtrl.$render();
      }

      return transformedValue;
    }

    // National Code check algorithm
    function check(code) {
      var digitArray = code.split('');
      var checkDigit = digitArray.pop();
      var sigma = 0;

      // Prevent same digits
      if(REGEX_EQUAL_DIGITS.test(code)) {
        return false;
      }

      // Prevent leading 3-zero digits
      if(REGEX_LEADING_ZERO.test(code)) {
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
