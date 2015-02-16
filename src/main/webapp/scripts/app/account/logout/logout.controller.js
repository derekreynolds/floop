'use strict';

angular.module('floopApp')
    .controller('LogoutController', function (Auth) {
        Auth.logout();
    });
