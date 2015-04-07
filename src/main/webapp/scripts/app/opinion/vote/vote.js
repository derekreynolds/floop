'use strict';

angular.module('floopApp')
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('vote', {
                parent: 'home',
                url: '/vote',
                data: {
                    roles: []
                },                
                resolve: {
                    translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                        $translatePartialLoader.addPart('vote');
                        $translatePartialLoader.addPart('geo');
                        return $translate.refresh();
                    }]
                }
            })
            .state('vote.create', {              
                url: "/create",
                views: {
                    'content@home': {
                        template: '<div ui-view></div>',
                        controller: 'CreateVoteController'
                    }
                }                      
            }) 
            .state('vote.create.detail', {
                parent: 'vote.create',              
                url: "/detail",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/vote/vote.detail.html',
                        controller: 'CreateVoteController'
                    }
                }                      
            })            
            .state('vote.create.option', {
                parent: 'vote.create',
                url: "/option",
                views: {
                    '': {
                        templateUrl: 'scripts/app/opinion/vote/vote.option.html',
                        controller: 'CreateVoteController'
                    }
                }
            })
            .state('vote.edit', {
                url: "/edit/:id",
                templateUrl: 'scripts/app/opinion/vote/vote.html'
            })
            .state('vote.delete', {
                url: "/delete/:id",
                templateUrl: 'scripts/app/opinion/vote/vote.html'
            })
            .state('vote.show', {
                url: "/show/:id",
                resolve: {
                    vote: function ($stateParams, RateService) {
                        return VoteService.one($stateParams.id).get();
                    }
                },
                views: {
                    'content@home': {
                        templateUrl: 'scripts/app/opinion/vote/vote.show.html',
                        controller: 'ShowVoteController'
                    }
                }
            });
            
    });
