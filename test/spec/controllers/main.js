'use strict';

describe('Controller: NXBoxController', function () {

  // load the controller's module
  beforeEach(module('boxNuxeoSampleApp'));

  var NXBoxCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    NXBoxCtrl = $controller('NXBoxController', {
      $scope: scope
    });
  }));

  it('scope should be defined', function () {
    expect(scope).toBeDefined();
  });
});
