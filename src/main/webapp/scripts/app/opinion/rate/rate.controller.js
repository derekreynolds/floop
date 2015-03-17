'use strict';

angular.module('floopApp')
    .controller('RateController', function ($scope, $translate, $timeout, $filter, DateTimeService, Rate) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'YYYY-MM-DD';
        $scope.rate = {};

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


        $scope.addItem = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            var target = angular.element($event.target);
            var $grandParent = target.closest('span.input-group');
            var $button = $grandParent.find('button');
            $grandParent.find('i').removeClass('fa-plus').addClass('fa-minus');

        };

        $scope.enableAddButton = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            var target = angular.element($event.target);
            var $grandParent = target.closest('span.input-group');
            var $button = $grandParent.find('button');
            
        };

        $scope.create = function() {
            $scope.rate.startDate = DateTimeService.toDateTimeUTC($scope.rate.startDate, $scope.rate.startDateTime);
            $scope.rate.endDate = DateTimeService.toDateTimeUTC($scope.rate.endDate, $scope.rate.endDateTime);
            debugger
            delete $scope.rate['startDateTime'];
            delete $scope.rate['endDateTime'];

            Rate.post($scope.rate).then(
                function (value, responseHeaders) {
                    $scope.success = 'OK';
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                });

        };
    });
