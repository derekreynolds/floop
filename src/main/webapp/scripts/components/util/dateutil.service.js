/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('DateUtilService', function () {
        var factory = {}; 

        factory.setMinMaxDates = function($scope) {

            $scope.format = 'YYYY-MM-DD';  
            $scope.now = moment();
            $scope.minDate = moment($scope.now).format($scope.format);
            $scope.maxDate = moment($scope.now);
            $scope.maxDate.add(1,'y').format($scope.format);

        };

	    return factory;
	});