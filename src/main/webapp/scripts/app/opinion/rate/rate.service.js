/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('RateService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/rate');
    }]);

