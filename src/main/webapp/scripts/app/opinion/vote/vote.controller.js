'use strict';

angular.module('floopApp')
    .controller('CreateVoteController', function ($scope, $translate, $timeout, $filter, $state, $compile, DateTimeService, VoteService) {
        
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
            $scope.format = 'YYYY-MM-DD';  
            $scope.now = moment();
            $scope.minDate = $scope.now.format($scope.format);
            $scope.vote.timeBox.startDate = $scope.now.format($scope.format);

            $scope.vote.timeBox.endDate = $scope.now.add(1,'d').format($scope.format);

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

            VoteService.post(vote).then(
                function (value, responseHeaders) {
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );

        };
    })
    .controller('ShowVoteController', function ($state, $scope, VoteService, vote) {
          
        $scope.vote = vote;
        _.forEach($scope.vote.items, function(item, index) {
            $scope.vote.items[index] = angular.fromJson(item); 
            $scope.vote.items[index].score = 0;                  
        });

        $scope.save = function() {            
            VoteService.put().then(
                function (value, responseHeaders) {
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );
        }
    })
    .controller('ListVoteController', function ($scope, votings) {          
        $scope.votings = votings;       
    });
