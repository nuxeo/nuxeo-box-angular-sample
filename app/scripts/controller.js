'use strict';

var controllerModuleApp = angular.module('boxNuxeoSampleApp.controller', ['ngResource']);

var BASE_URL_NUXEO = "https://demo.nuxeo.com/nuxeo/site/box/2.0";
var BASE_URL_BOX = "https://api.box.com/2.0";

controllerModuleApp.controller('NXBoxController', function ($scope, $resource, $http, cacheService, folderService, $route, fileService) {

  //Clear errors when refreshing
  $scope.requestError = null;
  $('#wrongToken').hide();
  $scope.restCalls = [];

  // UI init
  $scope.isCollapsed = true;

  // Authentication
  $scope.accessToken = cacheService.getData('access');
  $scope.authToken = cacheService.getData('auth');
  $scope.baseURL = cacheService.getData('baseURL');

  // Load folder origin if page refresh
  if ($scope.boxFolder == null && $scope.accessToken != null) {
    $http.defaults.headers.common['Authorization'] = 'Bearer ' + $scope.accessToken;
    fetchFolder(folderService, $scope, '0');
  }

  // Try to authenticate
  $scope.getToken = function (provider) {
    if ($scope.authToken) {
      OAuth.initialize($scope.authToken);//'VPGYq7b8oYyh-YqOe_W0NjpQTBk' -> vpasquier
      cacheService.setData('auth', $scope.authToken);
      OAuth.popup(provider, function (error, result) {
        if (error) $('#wrongToken').show();
        if (result) {
          cacheService.setData('access', result.access_token);
          cacheService.setData('baseURL', provider != 'nuxeo' ? BASE_URL_BOX : BASE_URL_NUXEO);
          $route.reload();
        }
      });
    } else {
      $('#wrongToken').show();
    }
  }

  // Clear the cache
  $scope.clearToken = function () {
    $scope.restCalls = [];
    cacheService.removeData('access');
    $route.reload();
  }

  // Reload page
  $scope.fetchRoot = function () {
    fetchFolder(folderService, $scope, '0');
  }

  $scope.refreshPage = function () {
    $route.reload();
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
  $scope.restCalls.push($scope.baseURL + "/folder/" + folderId);
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
  $scope.restCalls.push($scope.baseURL + "/files/" + fileId);
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