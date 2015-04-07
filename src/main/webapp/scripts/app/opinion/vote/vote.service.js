/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('VoteService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/vote');
    }]);

