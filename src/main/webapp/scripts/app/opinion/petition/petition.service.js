/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('PetitionTemplateService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/petition/template');
    }]);

