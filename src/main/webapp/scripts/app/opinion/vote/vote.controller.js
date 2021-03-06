'use strict';

angular.module('floopApp')
    .controller('CreateVoteController', function ($scope, $translate, $timeout, $filter, $state, $compile, DateTimeService, DateUtilService, VoteTemplateService) {
        
        if(_.isUndefined($scope.vote)) {
            $scope.vote = {
                'option' : {
                    'private':false,
                    'anonymous': false,
                    'resultViewable':true,
                    'location': {
                        'selected': false,
                        'geo': {
                            'center' : {
                                'latitude': 0,
                                'longitude': 0
                            },
                            'accuracy': 0,
                            'zoom': 0,
                            'distance': 0 
                        }
                    },
                    'socialize': {
                        'selected': true,
                        'message': ''
                    }
                }, 
                'timeBox' : {
                    
                },
                'items': []
            };

            DateUtilService.setMinMaxDates($scope);

            $scope.vote.timeBox.startDate = moment($scope.now).format($scope.format);

            $scope.vote.timeBox.endDate = moment($scope.now).add(1,'w').format($scope.format);

            $scope.vote.timeBox.startTime = new Date();
            $scope.vote.timeBox.endTime = new Date(); 

            $state.go('.detail');
        }       

   
        $timeout(function (){angular.element('[ng-model="vote.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;

        $scope.create = function() {

            var vote = _.clone($scope.vote);
            delete vote['timeBox'];
            vote.startDate = DateTimeService.toDateTimeUTC($scope.vote.timeBox.startDate, 
                                    DateTimeService.formatTime($scope.vote.timeBox.startTime));
            vote.endDate = DateTimeService.toDateTimeUTC($scope.vote.timeBox.endDate, 
                                    DateTimeService.formatTime($scope.vote.timeBox.endTime));

            VoteTemplateService.post(vote).then(
                function (value, responseHeaders) {
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );

        };
    })
    .controller('ShowVoteController', function ($state, $scope, VoteTemplateService, vote) {
          
        $scope.vote = vote;

        $scope.save = function() {            
            VoteTemplateService.put().then(
                function (value, responseHeaders) {
                    $state.go('vote');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );
        }
    })
    .controller('ListVoteController', function ($scope, votes) { 
        $scope.votes = votes;
    });
