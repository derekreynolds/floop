'use strict';

angular.module('floopApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('opinion', {
                abstract: true,
                parent: 'site'
            });
    });
