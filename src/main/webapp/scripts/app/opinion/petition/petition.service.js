/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('Petition', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/petition');
    }]);

