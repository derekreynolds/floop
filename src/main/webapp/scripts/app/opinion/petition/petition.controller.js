'use strict';

angular.module('floopApp')
    .controller('PetitionController', function ($scope, $translate, $timeout, Auth) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'yyyy-MM-dd hh:mm';
        $scope.petition = {};

        $scope.now = new Date();

        $scope.petition.startDate = $scope.now.getFullYear() + '-' + $scope.now.getMonth() + '-' 
        $scope.petition.startDate   += $scope.now.getDate() + ' ' + $scope.now.getHours() + ':' + $scope.now.getMinutes();
        $scope.petition.endDate = $scope.petition.startDate;

        $timeout(function (){angular.element('[ng-model="petition.title"]').focus();});

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