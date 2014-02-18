'use strict';

var controllerModuleApp = angular.module('boxNuxeoSampleApp.controller', ['ngResource']);

controllerModuleApp.config(['$httpProvider', function ($httpProvider) {
  var $http,
    interceptor = ['$q', '$injector', function ($q, $injector) {
      function success(response) {
        // get $http via $injector because of circular dependency problem
        $http = $http || $injector.get('$http');
        if ($http.pendingRequests.length < 1) {
          $('#loadingWidget').hide();
        }
        return response;
      }

      function error(response) {
        // get $http via $injector because of circular dependency problem
        $http = $http || $injector.get('$http');
        if ($http.pendingRequests.length < 1) {
          $('#loadingWidget').hide();
        }
        return $q.reject(response);
      }

      return function (promise) {
        $('#loadingWidget').show();
        return promise.then(success, error);
      }
    }];
  $httpProvider.responseInterceptors.push(interceptor);
}]);


controllerModuleApp.controller('NXBoxController', function ($scope, $resource, $http, cacheService, folderService, $route) {

  //Clear errors
  $scope.requestError = null;

  if ($scope.boxFolder == null) {
    fetchFolder(folderService, $scope, '0');
  }

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
  folderService.get({folderId: folderId}, function (response) {
    $scope.boxFolder = response;
  }, function (error) {
    $scope.requestError = error.data;
    if (error.status === 401) {
      localStorage.clear();
    }
  });
}