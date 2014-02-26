'use strict';

var controllerModuleApp = angular.module('boxNuxeoSampleApp.controller', ['ngResource']);

var BASE_URL_NUXEO = 'https://starship.nuxeo.com/nuxeo/box/2.0';
var BASE_URL_BOX = 'https://api.box.com/2.0';
var SITE_URL_BOX = 'https://box.com';
var SITE_URL_NUXEO = 'https://starship.nuxeo.com';

controllerModuleApp.controller('NXBoxController', function ($scope, $resource, $http, cacheService, documentService, $route) {

  //Clear errors when refreshing
  $scope.requestError = null;
  $scope.restCalls = [];
  $scope.breadcrumb = [];

  // UI init
  $scope.isCollapsed = true;

  // Authentication
  $scope.accessToken = cacheService.getData('access');
  $scope.baseURL = cacheService.getData('baseURL');
  $scope.siteURL = cacheService.getData('siteURL');

  // Load folder origin if page refresh
  if ($scope.boxFolder === undefined && $scope.accessToken !== null) {
    $http.defaults.headers.common.Authorization = 'Bearer ' + $scope.accessToken;
    fetchFolder(documentService, $scope, '0');
  }

  // Try to authenticate
  $scope.getToken = function (provider) {
    OAuth.initialize('EfLa1jHVR7sZ4DQQp4NgIGiuBr4');
    OAuth.popup(provider, function (error, result) {
      if (error) {
        console.log(error);
      }
      if (result) {
        cacheService.setData('access', result.access_token);
        cacheService.setData('baseURL', provider !== 'nuxeo' ? BASE_URL_BOX : BASE_URL_NUXEO);
        cacheService.setData('siteURL', provider !== 'nuxeo' ? SITE_URL_BOX : SITE_URL_NUXEO);
        $route.reload();
      }
    });
  },

    // Clear the cache
    $scope.clearToken = function () {
      $scope.restCalls = [];
      cacheService.clearAll();
      $route.reload();
    },

    // Reload page
    $scope.fetchRoot = function () {
      fetchFolder(documentService, $scope, '0');
      $scope.breadcrumb = [];
    },

    $scope.refreshPage = function () {
      $route.reload();
    },

    // Fetch folder
    $scope.fetchFolder = function (folderId) {
      return fetchFolder(documentService, $scope, folderId);
    },

    // Fetch file
    $scope.fetchFile = function (fileId) {
      return fetchFile(documentService, $scope, fileId);
    }
});

function fetchFolder(documentService, $scope, folderId) {
  $scope.requestError = null;
  $('#loadingWidget').show();
  $scope.restCalls.push("GET " + $scope.baseURL + '/folder/' + folderId);
  documentService.getFolder($scope.baseURL).get({folderId: folderId}, function (response) {
    $scope.boxFolder = response;
    $scope.breadcrumb.push(response);
    $('#loadingWidget').hide();
  }, function (error) {
    $scope.requestError = error.status;
    if (error.status === 401) {
      $scope.clearToken();
    }
  });
}

function fetchFile(documentService, $scope, fileId) {
  $scope.requestError = null;
  $('#loadingWidget').show();
  $scope.restCalls.push("GET " + $scope.baseURL + '/files/' + fileId);
  documentService.getFile($scope.baseURL).get({fileId: fileId}, function (response) {
    $scope.boxFolder = response;
    $('#loadingWidget').hide();
  }, function (error) {
    $scope.requestError = error.status;
    if (error.status === 401) {
      $scope.clearToken();
    }
  });
}