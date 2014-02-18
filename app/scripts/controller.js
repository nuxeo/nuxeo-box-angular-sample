'use strict';

var controllerModuleApp = angular.module('boxNuxeoSampleApp.controller', ['ngResource']);


controllerModuleApp.controller('NXBoxController', function ($scope, $resource, $http, cacheService, folderService, $route) {

  //Clear errors
  $scope.requestError = null;

  // Authentication
  var access = cacheService.getData('access')

  if (access != null) {
    $scope.accessToken = access.access_token;
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.accessToken;
  }

  // Try to authenticate
  $scope.getToken = function (provider) {
    if ($scope.accessToken == null) {
      OAuth.initialize('VPGYq7b8oYyh-YqOe_W0NjpQTBk');
      OAuth.popup(provider, function (error, result) {
        if (error) console.log(error);
        if (result) {
          cacheService.setData('access', result);
          $route.reload();
        }
      });
    } else {
      return cacheService.getData('access').access_token;
    }
  }

  // Fetch folder
  if (folderService != null) {
    folderService.get({folderId: '0'}, function (response) {
      $scope.boxFolder = response;
    }, function (error) {
      $scope.requestError = error.data;
      if (error.status === 401) {
        localStorage.clear();
      }
    });
  }

  // Clear the cache
  $scope.clearToken = function () {
    cacheService.clearAll();
    $route.reload();
  }

  // Reload page
  $scope.refreshPage = function () {
    $route.reload();
  }
});