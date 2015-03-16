'use strict';

angular.module('floopApp')
    .controller('RateController', function ($scope, $translate, $timeout, $filter, DateTimeService, Rate) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'YYYY-MM-DD';
        $scope.rate = {};

        $scope.now = moment();

        $scope.rate.startDate = $scope.now.format($scope.format);

        $scope.rate.endDate = $scope.now.add(1,'d').format($scope.format);

        $scope.rate.startDateTime = new Date();
        $scope.rate.endDateTime = new Date();

        $timeout(function (){angular.element('[ng-model="rate.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;

        $scope.startDateChange = function() {            
            var startDate = moment($scope.rate.startDate);
            var startDateTime = moment($scope.rate.startDateTime);
            var endDate = moment($scope.rate.endDate);
            var endDateTime = moment($scope.rate.endDateTime);

            if(startDate.isAfter(endDate)) {
                $scope.rate.endDate = DateTimeService.formatDate($scope.rate.startDate);
                $scope.rate.endDateTime = startDateTime.add(1, 'h').toDate();                
            } else if(startDate.isSame(endDate) && (startDateTime.isAfter(endDateTime) 
                || startDateTime.isSame(endDateTime))) {
                $scope.rate.endDateTime = startDateTime.add(1, 'h').toDate();
            }         
        };

        $scope.endDateChange = function() {
            var startDate = moment($scope.rate.startDate);
            var startDateTime = moment($scope.rate.startDateTime);
            var endDate = moment($scope.rate.endDate);
            var endDateTime = moment($scope.rate.endDateTime);

            if(endDate.isBefore(startDate)) {
                $scope.rate.endDate = DateTimeService.formatDate($scope.rate.startDate);
                $scope.rate.endDateTime = startDateTime.add(1, 'h').toDate(); 
            } else if(endDate.isSame(startDate) && (endDateTime.isAfter(startDateTime) 
                || endDateTime.isSame(startDateTime))) {                
                $scope.rate.endDateTime = startDateTime.add(1, 'h').toDate();
            }   
        };

        $scope.startDateTimeChange = function() {
            var startDate = moment($scope.rate.startDate);
            var startDateTime = moment($scope.rate.startDateTime);
            var endDate = moment($scope.rate.endDate);
            var endDateTime = moment($scope.rate.endDateTime);
    
            if(endDate.isSame(startDate) && (DateTimeService.isMomentTimeAfter(startDateTime, endDateTime))
                || (DateTimeService.isMomentTimeSame(startDateTime, endDateTime))) {
                $scope.rate.endDateTime = startDateTime.add(1, 'h').toDate();
            }
        };

        $scope.endDateTimeChange = function() {
            var startDate = moment($scope.rate.startDate);
            var startDateTime = moment($scope.rate.startDateTime);
            var endDate = moment($scope.rate.endDate);
            var endDateTime = moment($scope.rate.endDateTime);

            if(endDate.isSame(startDate) && (DateTimeService.isMomentTimeAfter(startDateTime, endDateTime))
                || (DateTimeService.isMomentTimeSame(startDateTime, endDateTime))) {
                $scope.rate.endDateTime = startDateTime.add(1, 'h').toDate();
            }
        };

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
