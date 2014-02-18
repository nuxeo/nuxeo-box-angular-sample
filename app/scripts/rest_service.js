'use strict';

var restServiceModuleApp = angular.module('boxNuxeoSampleApp.rest_service', ['ngResource']);


restServiceModuleApp.factory('folderService', function ($resource, cacheService) {
  if (cacheService.getData('access') != null) {
    return $resource("https://api.box.com/2.0/folders/:folderId", {});
  }
});