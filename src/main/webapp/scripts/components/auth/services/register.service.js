'use strict';

angular.module('floopApp')
    .factory('Register', function ($resource) {
        return $resource('api/register', {}, {
        });
    });


