'use strict';

angular.module('floopApp')
    .controller('NavbarController', function ($scope, $location, $interval, $state, Auth, Principal) {
        $scope.isAuthenticated = Principal.isAuthenticated;
        $scope.isInRole = Principal.isInRole;
        $scope.$state = $state;
		$interval(function () {
			var loop = angular.element('.loop');
			if(loop.hasClass('stopLoop')) {
				loop.removeClass('stopLoop');
			}
			else {
				loop.addClass('stopLoop');
			}

		}, 3000);

        $scope.logout = function () {
            Auth.logout();
            $state.go('home');
        };
    });
