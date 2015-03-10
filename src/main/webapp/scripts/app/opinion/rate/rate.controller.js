'use strict';

angular.module('floopApp')
    .controller('RateController', function ($scope, $translate, $timeout, $filter, DateTimeService, Rate) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'yyyy-MM-dd HH:mm';
        $scope.rate = {};

        $scope.now = new Date();

        $scope.rate.startDate = DateTimeService.formatDateTime($scope.now);

        $scope.rate.endDate = $scope.rate.startDate;

        $timeout(function (){angular.element('[ng-model="rate.title"]').focus();});

        $scope.ismeridian = true; 
        $scope.hstep = 1;
        $scope.mstep = 5;


        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.openTimeCalendar = function(e) {
            e.preventDefault();
            e.stopPropagation();

            $scope.timeOpen = true;
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
            //$scope.rate['item'] = $scope.rate.item1;
            //delete $scope.rate.item1;

            $scope.rate.startDate = DateTimeService.toUTC($scope.rate.startDate);
            $scope.rate.endDate = DateTimeService.toUTC($scope.rate.endDate);
            debugger
            Rate.post($scope.rate);

        };
    });
