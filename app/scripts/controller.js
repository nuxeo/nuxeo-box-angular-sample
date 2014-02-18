'use strict';

var controllerModuleApp = angular.module('boxNuxeoSampleApp.controller', ['ngResource']);

controllerModuleApp.controller('NXBoxController', function ($scope, $resource, $http, cacheService, folderService, $route, fileService) {

  //Clear errors when refreshing
  $scope.requestError = null;

  // Authentication
  $scope.accessToken = cacheService.getData('access');
  $scope.authToken = cacheService.getData('auth');

  // Load folder origin if page refresh
  if ($scope.boxFolder == null && $scope.accessToken != null) {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.accessToken;
    fetchFolder(folderService, $scope, '0');
  }

  // Try to authenticate
  $scope.getToken = function (provider) {
    OAuth.initialize($scope.authToken);//'VPGYq7b8oYyh-YqOe_W0NjpQTBk' -> vpasquier
    cacheService.setData('auth', $scope.authToken);
    OAuth.popup(provider, function (error, result) {
      if (error) console.log(error);
      if (result) {
        cacheService.setData('access', result.access_token);
        $route.reload();
      }
    });
  }

  // Clear the cache
  $scope.clearToken = function () {
    cacheService.removeData('access');
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

  // Fetch file
  $scope.fetchFile = function (fileId) {
    return fetchFile(fileService, $scope, fileId);
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
      $scope.clearToken();
    }
  });
}

function fetchFile(fileService, $scope, fileId) {
  $scope.requestError = null;
  $('#loadingWidget').show();
  fileService.get({fileId: fileId}, function (response) {
    $scope.boxFolder = response;
    $('#loadingWidget').hide();
  }, function (error) {
    $scope.requestError = error.status;
    if (error.status === 401) {
      $scope.clearToken();
    }
  });
}