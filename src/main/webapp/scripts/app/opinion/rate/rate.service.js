/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('Rate', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/rate');
    }]);

