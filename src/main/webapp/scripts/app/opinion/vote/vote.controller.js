'use strict';

angular.module('floopApp')
    .controller('CreateVoteController', function ($scope, $translate, $timeout, $filter, $state, $compile, DateTimeService, RateService) {
        
        if(!angular.isDefined($scope.vote)) {
            $scope.vote = {
                'option' : {
                    'private': true, 
                    'anonymous': true, 
                    "resultViewable": true,
                    'location': false
                }
            };
            $state.go('.detail');
        }

        $scope.format = 'YYYY-MM-DD';        
        
        $scope.now = moment();

        $scope.minDate = $scope.now.format($scope.format);
        $scope.vote.startDate = $scope.now.format($scope.format);

        $scope.vote.endDate = $scope.now.add(1,'d').format($scope.format);

        $scope.vote.startDateTime = new Date();
        $scope.vote.endDateTime = new Date();             

        $timeout(function (){angular.element('[ng-model="vote.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;

        $scope.create = function() {

            var items = [];
            var vote = _.clone($scope.vote);

            delete vote['startDateTime'];
            delete vote['endDateTime'];

            vote.startDate = DateTimeService.toDateTimeUTC($scope.vote.startDate, 
                                    DateTimeService.formatTime($scope.vote.startDateTime));
            vote.endDate = DateTimeService.toDateTimeUTC($scope.vote.endDate, 
                                    DateTimeService.formatTime($scope.vote.endDateTime));
            var counter = 0;
            // Moves the items into an array
            _.forEach(vote, function(value, key) {
                if(_.startsWith(key, 'item')) {
                    if(value) {                  
                        items.push({'ordinal': counter, 'name': value});
                        counter++;  
                    }                 
                    delete vote[key];
                }                
            });

            vote['items'] = items;   

            RateService.post(vote).then(
                function (value, responseHeaders) {
        
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
    });
