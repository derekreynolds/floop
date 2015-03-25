'use strict';

angular.module('floopApp')
    .controller('MainController', function ($scope, Principal, ratings) {
    	    	   		
  		$scope.ratings = ratings;  			

        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
    });
