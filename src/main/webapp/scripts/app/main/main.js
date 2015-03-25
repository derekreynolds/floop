'use strict';

angular.module('floopApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home', {
                parent: 'site',
                url: '/',
                data: {
                    roles: []
                },
                views: {
                    'content@': {
                        templateUrl: 'scripts/app/main/main.html',
                        controller: 'MainController'
                    }
                },
                resolve: {
                    mainTranslatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate,$translatePartialLoader) {
                        $translatePartialLoader.addPart('main');
                        $translatePartialLoader.addPart('rate');
                        $translatePartialLoader.addPart('petition');
                        $translatePartialLoader.addPart('vote');
                        return $translate.refresh();
                    }],
                    ratings: function(RateService) {
                        return RateService.one().customGET('top5');
                    }
                }
            });
    });
