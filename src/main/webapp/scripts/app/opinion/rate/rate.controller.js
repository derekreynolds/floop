'use strict';

angular.module('floopApp')
    .controller('CreateRateController', function ($scope, $translate, $timeout, $filter, $state, $compile, DateTimeService, DateUtilService, RateTemplateService) {
        
        if(_.isUndefined($scope.rate)) {
            $scope.rate = {
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

            $scope.rate.timeBox.startDate = moment($scope.now).format($scope.format);

            $scope.rate.timeBox.endDate = moment($scope.now).add(1,'w').format($scope.format);

            $scope.rate.timeBox.startTime = new Date();
            $scope.rate.timeBox.endTime = new Date(); 

            $state.go('.detail');
        }        
                   

        $timeout(function (){angular.element('[ng-model="rate.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;

        $scope.create = function() {
            var rate = _.clone($scope.rate);
            delete rate['timeBox'];
            rate.startDate = DateTimeService.toDateTimeUTC($scope.rate.timeBox.startDate, 
                                    DateTimeService.formatTime($scope.rate.timeBox.startTime));
            rate.endDate = DateTimeService.toDateTimeUTC($scope.rate.timeBox.endDate, 
                                    DateTimeService.formatTime($scope.rate.timeBox.endTime));

            RateTemplateService.post(rate).then(
                function (value, responseHeaders) {
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );

        };
    })
    .controller('ShowRateController', function ($scope, RateService, rate) {
          
        $scope.rate = rate;
        _.forEach($scope.rate.items, function(item, index) {
            $scope.rate.items[index] = angular.fromJson(item); 
            $scope.rate.items[index].score = 0;                  
        });
        
        $scope.r = {rateTemplate: rate, items: []};

        $scope.buttonEnabled = false;

        $scope.enableButton = function() {                    
             $scope.buttonEnabled = true;      
            _.forEach($scope.rate.items, function(item, index) {
                if(item.score === 0) {
                    $scope.buttonEnabled = false;
                    return false;                    
                }
            });            
        }

        $scope.save = function() { 

            _.forEach($scope.rate.items, function(item, index) {
                $scope.rate.items[index] = angular.fromJson(item); 
                $scope.r.items.push($scope.rate.items[index].score);                  
            });
debugger
            RateService.post($scope.r).then(
                function (value, responseHeaders) {
                    $scope.success = 'OK';
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );
        }
    })
    .controller('ListRateController', function ($scope, rates) {          
        $scope.rates = rates;       
    });
