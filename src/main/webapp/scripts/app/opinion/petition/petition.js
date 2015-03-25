'use strict';

angular.module('floopApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('petition', {
                parent: 'home',
                url: '/petition',
                data: {
                    roles: []
                },
                views: {
                    'content@home': {
                        templateUrl: 'scripts/app/opinion/petition/petition.html',
                        controller: 'PetitionController'
                    }
                },
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('petition');
                        return $translate.refresh();
                    }]
                }
            });
    });
