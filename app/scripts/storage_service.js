'use strict';

var storageServiceModuleApp = angular.module('boxNuxeoSampleApp.storage_service', []);

storageServiceModuleApp.factory('storageService', function () {
  return {
    get: function (key) {
      return localStorage.getItem(key);
    },
    save: function (key, data) {
      localStorage.setItem(key, JSON.stringify(data));
    },
    remove: function (key) {
      localStorage.removeItem(key);
    },
    clearAll: function () {
      localStorage.clear();
    }
  };
});

storageServiceModuleApp.factory('cacheService', function ($http, storageService) {
  return {
    getData: function (key) {
      return JSON.parse(storageService.get(key));
    },
    setData: function (key, data) {
      storageService.save(key, data);
    },
    removeData: function (key) {
      storageService.remove(key);
    },
    clearAll: function () {
      storageService.clearAll();
    }
  };
});