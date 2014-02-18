'use strict';

var restServiceModuleApp = angular.module('boxNuxeoSampleApp.rest_service', ['ngResource']);

restServiceModuleApp.factory('folderService', function ($resource) {
  return $resource("https://api.box.com/2.0/folders/:folderId", {});
});

restServiceModuleApp.factory('fileService', function ($resource) {
  return $resource("https://api.box.com/2.0/files/:fileId", {});
});