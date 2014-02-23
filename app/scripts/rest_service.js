'use strict';

var restServiceModuleApp = angular.module('boxNuxeoSampleApp.rest_service', ['ngResource']);
var baseURL;
restServiceModuleApp.factory('folderService', function ($resource, cacheService) {
  baseURL = cacheService.getData('baseURL');
  return $resource(baseURL + "/folders/:folderId", {});
});

restServiceModuleApp.factory('fileService', function ($resource, cacheService) {
  baseURL = cacheService.getData('baseURL');
  return $resource(baseURL + "/files/:fileId", {});
});