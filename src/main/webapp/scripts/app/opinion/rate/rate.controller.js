'use strict';

angular.module('floopApp')
    .controller('RateController', function ($scope, $translate, $timeout, $filter, Rate) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'yyyy-MM-dd hh:mm';
        $scope.rate = {};

        $scope.now = new Date();

        $scope.rate.startDate = $scope.now.getFullYear() + '-' + $filter('leftPad')(($scope.now.getMonth() + 1), 2) + '-'; 
        $scope.rate.startDate += $filter('leftPad')($scope.now.getDate(), 2) + ' ' + $filter('leftPad')($scope.now.getHours(), 2);
        $scope.rate.startDate += ':' + $filter('leftPad')($scope.now.getMinutes(), 2);
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

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.addItem = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            var target = angular.element($event.target);
            var $grandParent = target.closest('span.input-group');
            var $button = $grandParent.find('button');
            $grandParent.find('i').removeClass('fa-plus').addClass('fa-minus');
            debugger
            $button.attr("ng-click", null);
            $button.prop("ng-click", null);

        };

        $scope.enableAddButton = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            var target = angular.element($event.target);
            var $grandParent = target.closest('span.input-group');
            var $button = $grandParent.find('button');
            $button.prop("di");
        };

        $scope.create = function() {
            $scope.rate['item'] = $scope.rate.item1;
            delete $scope.rate.item1;

            Rate.post($scope.rate)
            console.log($scope.rate);
        };
    });
