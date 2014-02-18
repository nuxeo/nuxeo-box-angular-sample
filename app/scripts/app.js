'use strict';

angular.module('boxNuxeoSampleApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'boxNuxeoSampleApp.controller',
    'boxNuxeoSampleApp.storage_service',
    'boxNuxeoSampleApp.rest_service'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'NXBoxController',
        templateUrl: 'views/main.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
