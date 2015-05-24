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
                    'main@': {
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
                    feedbacks: function(FeedbackTemplateService) {
                        return FeedbackTemplateService.one().customGET('');
                    }
                }
            });
    });
