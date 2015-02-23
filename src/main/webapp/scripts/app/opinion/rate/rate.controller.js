'use strict';

angular.module('floopApp')
    .controller('RateController', function ($scope, $translate, $timeout, Auth) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'yyyy-MM-dd hh:mm';
        $scope.rate = {};

        $scope.now = new Date();

        $scope.rate.startDate = $scope.now.getFullYear() + '-' + $scope.now.getMonth() + '-' 
         $scope.rate.startDate   += $scope.now.getDate() + ' ' + $scope.now.getHours() + ':' + $scope.now.getMinutes();
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

        $scope.select = function () {
            
        };
    });
