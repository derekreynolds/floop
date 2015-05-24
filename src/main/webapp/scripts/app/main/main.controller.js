'use strict';

angular.module('floopApp')
    .controller('MainController', function ($scope, Principal, feedbacks) {

    	$scope.feedbacks = feedbacks;
    	
        Principal.identity().then(function(account) {
            $scope.account = account;
            $scope.isAuthenticated = Principal.isAuthenticated;
        });
    });
