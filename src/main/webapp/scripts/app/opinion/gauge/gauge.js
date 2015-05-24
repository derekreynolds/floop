'use strict';

angular.module('floopApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('gauge', {
                parent: 'site',
                url: '/gauge',
                views: {
                    'main@': {
                        templateUrl: 'scripts/app/opinion/gauge/gauge.list.html',
                        controller: 'ListGaugeController'
                    }
                },  
                data: {
                    roles: []
                },                
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('gauge');
                        $translatePartialLoader.addPart('geo');
                        return $translate.refresh();
                    }],
                    gauges: function(GaugeTemplateService) {
                        return GaugeTemplateService.one().customGET('top5');
                    }
                }
            })
            .state('gauge.create', {              
                url: "/create",
                views: {
                    'main@': {
                        template: '<div ui-view></div>',
                        controller: 'CreateGaugeController'
                    }
                }                      
            }) 
            .state('gauge.create.detail', {
                parent: 'gauge.create',              
                url: "/detail",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/gauge/gauge.detail.html',
                        controller: 'CreateGaugeController'
                    }
                }                      
            })            
            .state('gauge.create.option', {
                parent: 'gauge.create',
                url: "/option",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/gauge/gauge.option.html',
                        controller: 'CreateGaugeController'
                    }
                }
            })
            .state('gauge.edit', {
                url: "/edit/:id",
                templateUrl: 'scripts/app/opinion/gauge/gauge.html'
            })
            .state('gauge.delete', {
                url: "/delete/:id",
                templateUrl: 'scripts/app/opinion/gauge/gauge.html'
            })
            .state('gauge.show', {
                url: "/show/:id",
                resolve: {
                    gauge: function ($stateParams, GaugeTemplateService) {
                        return GaugeTemplateService.one($stateParams.id).get();
                    }
                },
                views: {
                    'main@': {
                        templateUrl: 'scripts/app/opinion/gauge/gauge.show.html',
                        controller: 'ShowGaugeController'
                    }
                }
            });
            
    });
