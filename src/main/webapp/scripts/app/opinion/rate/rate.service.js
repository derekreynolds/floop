/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('RateTemplateService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/rate/template');
    }]);

