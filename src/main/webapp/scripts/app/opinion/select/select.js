'use strict';

angular.module('floopApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('select', {
                parent: 'opinion',
                url: '/select',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/opinion/select/select.html',
                        controller: 'SelectController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('select');
                        return $translate.refresh();
                    }]
                }
            });
    });
