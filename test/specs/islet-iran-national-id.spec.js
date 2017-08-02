describe('islet-iran-national-id directive', function() {

  var elm, scope, form;

  beforeEach(module('angular-iran-national-id'));

  beforeEach(inject(function($rootScope, $compile, $timeout) {
    scope = $rootScope;
    timeout = $timeout;
    scope.model = { nationalid: '0000000000' };
    element = angular.element(
      '<form name="form"><input name="nationalid" ng-model="model.nationalid" maxlength="10" min-length="10" islet-iran-national-id /></form>'
    );

    $compile(element)(scope);

    scope.$digest();
    form = scope.form;
  }));

  var triggerKeyDown = function(element, keyCode) {
    angular.element(element).triggerHandler({type:"keydown", which:keyCode});
  };

  // UNITS
  
  it('should pass with correct national ID', function() {
    form.nationalid.$setViewValue('2286224331');
    expect(scope.model.nationalid).toEqual('2286224331');
    expect(form.nationalid.$valid).toBe(true);
  });

  it('should not pass with incorrect national ID', function() {
    form.nationalid.$setViewValue('9876543219');
    expect(scope.model.nationalid).toBeUndefined();
    expect(form.nationalid.$valid).toBe(false);
  });

  it('should not pass with equal digits', function() {
    form.nationalid.$setViewValue('5555555555');
    expect(scope.model.nationalid).toBeUndefined();
    expect(form.nationalid.$valid).toBe(false);
  });

  it('should not pass with leading 3-zero digits', function() {
    form.nationalid.$setViewValue('0003425673');
    expect(scope.model.nationalid).toBeUndefined();
    expect(form.nationalid.$valid).toBe(false);
  });
});
