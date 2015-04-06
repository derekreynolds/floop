'use strict';

angular.module('floopApp')
    .controller('CreateRateController', function ($scope, $translate, $timeout, $filter, $state, $compile, DateTimeService, RateService) {
        
        if(!angular.isDefined($scope.rate)) {
            $scope.rate = {
                'option' : {
                    'publiclyViewable': true, 
                    'anonymous': true, 
                    'location': false
                }
            };
            $state.go('.detail');
        }

        $scope.success = null;
        $scope.error = null;
        $scope.format = 'YYYY-MM-DD';        
        
        $scope.now = moment();

        $scope.minDate = $scope.now.format($scope.format);
        $scope.rate.startDate = $scope.now.format($scope.format);

        $scope.rate.endDate = $scope.now.add(1,'d').format($scope.format);

        $scope.rate.startDateTime = new Date();
        $scope.rate.endDateTime = new Date();             

        $timeout(function (){angular.element('[ng-model="rate.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;



        $scope.create = function() {

            var items = [];
            var rate = _.clone($scope.rate);

            delete rate['startDateTime'];
            delete rate['endDateTime'];

            rate.startDate = DateTimeService.toDateTimeUTC($scope.rate.startDate, 
                                    DateTimeService.formatTime($scope.rate.startDateTime));
            rate.endDate = DateTimeService.toDateTimeUTC($scope.rate.endDate, 
                                    DateTimeService.formatTime($scope.rate.endDateTime));
            var counter = 0;
            // Moves the items into an array
            _.forEach(rate, function(value, key) {
                if(_.startsWith(key, 'item')) {
                    if(value) {                  
                        items.push({'ordinal': counter, 'name': value});
                        counter++;  
                    }                 
                    delete rate[key];
                }                
            });

            rate['items'] = items;   

            RateService.post(rate).then(
                function (value, responseHeaders) {
                    $scope.success = 'OK';
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );

        };
    })
    .controller('ShowRateController', function ($state, $scope, RateService, rate) {
          
        $scope.rate = rate;
        _.forEach($scope.rate.items, function(item, index) {
            $scope.rate.items[index] = angular.fromJson(item); 
            $scope.rate.items[index].score = 0;                  
        });

        $scope.save = function() {            
            RateService.put().then(
                function (value, responseHeaders) {
                    $scope.success = 'OK';
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );
        }
    });
