/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('PetitionService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/petition');
    }]);

