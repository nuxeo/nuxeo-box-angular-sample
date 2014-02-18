'use strict';

var controllerModuleApp = angular.module('boxNuxeoSampleApp.controller', ['ngResource']);

controllerModuleApp.controller('NXBoxController', function ($scope, $resource, $http, cacheService, folderService, $route) {

  //Clear errors
  $scope.requestError = null;

  // Authentication
  var access = cacheService.getData('access')

  // Load folder origin if page refresh
  if ($scope.boxFolder == null && access != null) {
    $scope.accessToken = access.access_token;
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.accessToken;
    fetchFolder(folderService, $scope, '0');
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

  // Clear the cache
  $scope.clearToken = function () {
    cacheService.clearAll();
    $route.reload();
  }

  // Reload page
  $scope.refreshPage = function () {
    fetchFolder(folderService, $scope, '0');
  }

  // Fetch folder
  $scope.fetchFolder = function (folderId) {
    return fetchFolder(folderService, $scope, folderId);
  }
});

function fetchFolder(folderService, $scope, folderId) {
  $scope.requestError = null;
  $('#loadingWidget').show();
  folderService.get({folderId: folderId}, function (response) {
    $scope.boxFolder = response;
    $('#loadingWidget').hide();
  }, function (error) {
    $scope.requestError = error.status;
    if (error.status === 401) {
      localStorage.clear();
    }
  });
}