'use strict';

angular.module('floopApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('rate', {
                parent: 'site',
                url: '/rate',
                data: {
                    roles: []
                },
                controller: 'RateController',
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('rate');
                        return $translate.refresh();
                    }]
                }
            })
            .state('rate.create', {
                url: "/create",
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/opinion/rate/rate.html',
                        controller: 'RateController'
                    }
                }
            })
            .state('rate.edit', {
                url: "/edit/:id",
                templateUrl: 'scripts/app/opinion/rate/rate.html'
            })
            .state('rate.delete', {
                url: "/delete/:id",
                templateUrl: 'scripts/app/opinion/rate/rate.html'
            })
            .state('rate.show', {
                url: "/show/:id",
                resolve: {
                    rate: function ($stateParams, RateService) {
                        return RateService.one($stateParams.id).get();
                    }
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/opinion/rate/rate.show.html',
                        controller: 'ShowRateController'
                    }
                }
            })
    });
