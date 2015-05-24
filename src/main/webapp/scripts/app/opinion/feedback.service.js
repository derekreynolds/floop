/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('FeedbackTemplateService', ['Restangular',
    function (Restangular) {
        return Restangular.service('api/feedback');
    }]);