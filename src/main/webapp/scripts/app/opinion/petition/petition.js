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
            })
            .state('petition.create', {
                url: "/create",
                views: {
                    'content@home': {
                        templateUrl: 'scripts/app/opinion/petition/petition.html',
                        controller: 'PetitionController'
                    }
                }
            })
            .state('petition.edit', {
                url: "/edit/:id",
                templateUrl: 'scripts/app/opinion/petition/petition.html'
            })
            .state('petition.delete', {
                url: "/delete/:id",
                templateUrl: 'scripts/app/opinion/petition/petition.html'
            })
            .state('petition.show', {
                url: "/show/:id",
                resolve: {
                    rate: function ($stateParams, RateService) {
                        return RateService.one($stateParams.id).get();
                    }
                },
                views: {
                    'content@home': {
                        templateUrl: 'scripts/app/opinion/petition/petition.show.html',
                        controller: 'ShowPetitionController'
                    }
                }
            });
    });
