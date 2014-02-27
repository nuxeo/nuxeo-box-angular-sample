'use strict';

var restServiceModuleApp = angular.module('boxNuxeoSampleApp.rest_service', ['ngResource']);

restServiceModuleApp.factory('documentService', function ($resource) {
  return {
    getFolder: function (baseURL) {
      return $resource(baseURL + '/folders/:folderId', {});
    },
    getFile: function (baseURL) {
      return $resource(baseURL + '/files/:fileId', {});
    },
    getCollaboration: function (baseURL) {
      return $resource(baseURL + '/folders/:folderId/collaborations', {});
    }
  };
});