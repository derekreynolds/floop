'use strict';

angular.module('floopApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('petition', {
                parent: 'site',
                url: '/petition',
                views: {
                    'main@': {
                        templateUrl: 'scripts/app/opinion/petition/petition.list.html',
                        controller: 'ListPetitionController'
                    }
                },  
                data: {
                    roles: []
                },                
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('petition');
                        $translatePartialLoader.addPart('geo');
                        return $translate.refresh();
                    }],
                    petitions: function(PetitionTemplateService) {
                        return PetitionTemplateService.one().customGET('top5');
                    }
                }
            })
            .state('petition.create', {              
                url: "/create",
                views: {
                    'main@': {
                        template: '<div ui-view></div>',
                        controller: 'CreatePetitionController'
                    }
                }                 
            }) 
            .state('petition.create.detail', {
                parent: 'petition.create',              
                url: "/detail",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/petition/petition.detail.html',
                        controller: 'CreatePetitionController'
                    }
                }                      
            })            
            .state('petition.create.option', {
                parent: 'petition.create',
                url: "/option",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/petition/petition.option.html',
                        controller: 'CreatePetitionController'
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
                    petition: function ($stateParams, PetitionTemplateService) {
                        return PetitionTemplateService.one($stateParams.id).get();
                    }
                },
                views: {
                    'main@': {
                        templateUrl: 'scripts/app/opinion/petition/petition.show.html',
                        controller: 'ShowPetitionController'
                    }
                }
            });
            
    });
