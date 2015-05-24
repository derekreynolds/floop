/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('GaugeTemplateService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/gauge/template');
    }]);

