'use strict';

angular.module('floopApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('rate', {
                parent: 'home',
                url: '/rate',
                data: {
                    roles: []
                },                
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
                    'content@home': {
                        template: '<div ui-view></div>',
                        controller: 'CreateRateController'
                    }
                }                      
            }) 
            .state('rate.create.detail', {
                parent: 'rate.create',              
                url: "/detail",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/rate/rate.detail.html',
                        controller: 'CreateRateController'
                    }
                }                      
            })            
            .state('rate.create.option', {
                parent: 'rate.create',
                url: "/option",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/rate/rate.option.html',
                        controller: 'CreateRateController'
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
                    'content@home': {
                        templateUrl: 'scripts/app/opinion/rate/rate.show.html',
                        controller: 'ShowRateController'
                    }
                }
            });
            
    });
