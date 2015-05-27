'use strict';

angular.module('floopApp')
    .controller('CreateGaugeController', function ($scope, $translate, $timeout, $filter, $state, $compile, DateTimeService, GaugeTemplateService) {
        
        if(_.isUndefined($scope.gauge)) {
            $scope.gauge = {
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
            $scope.gauge.timeBox.startDate = $scope.now.format($scope.format);

            $scope.gauge.timeBox.endDate = $scope.now.add(1,'d').format($scope.format);

            $scope.gauge.timeBox.startTime = new Date();
            $scope.gauge.timeBox.endTime = new Date(); 


            $translate(['gauge.form.type.options.hot', 'gauge.form.type.options.happy', 
                'gauge.form.type.options.positive', 'gauge.form.type.options.like']).then(function (options) {
                var hot = options['gauge.form.type.options.hot'];
                var happy = options['gauge.form.type.options.happy'];
                var positive = options['gauge.form.type.options.positive'];
                var like = options['gauge.form.type.options.like'];                
                $scope.types = [];
                $scope.types.push({id: 'gauge.form.type.options.hot', text: hot});
                $scope.types.push({id: 'gauge.form.type.options.happy', text: happy});
                $scope.types.push({id: 'gauge.form.type.options.positive', text: positive});
                $scope.types.push({id: 'gauge.form.type.options.like', text: like});

            });

            $state.go('.detail');
        }       

   
        $timeout(function (){angular.element('[ng-model="gauge.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;

        $scope.create = function() {

            var gauge = _.clone($scope.gauge);
            delete gauge['timeBox'];
            gauge.startDate = DateTimeService.toDateTimeUTC($scope.gauge.timeBox.startDate, 
                                    DateTimeService.formatTime($scope.gauge.timeBox.startTime));
            gauge.endDate = DateTimeService.toDateTimeUTC($scope.gauge.timeBox.endDate, 
                                    DateTimeService.formatTime($scope.gauge.timeBox.endTime));

            GaugeTemplateService.post(gauge).then(
                function (value, responseHeaders) {
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );

        };
    })
    .controller('ShowGaugeController', function ($state, $scope, GaugeTemplateService, gauge) {
          
        $scope.gauge = gauge;

        $scope.save = function() {            
            GaugeTemplateService.put().then(
                function (value, responseHeaders) {
                    $state.go('gauge');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );
        }
    })
    .controller('ListGaugeController', function ($scope, gauges) { 

        $scope.gauges = gauges;
    });
