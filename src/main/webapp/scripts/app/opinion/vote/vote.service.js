/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('VoteTemplateService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/vote/template');
    }]);

