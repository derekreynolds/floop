'use strict';

angular.module('floopApp')
    .filter('leftPad', function () {
        return function (value, padding) {
           var zeroes = "0";
    
            for (var i = 0; i < padding; i++) { 
                zeroes += "0"; 
            }
    
            return (zeroes + value).slice(padding * -1);
        };
    })
    .filter('rightPad', function () {
        return function (value, padding) {
           var zeroes = "0";
    
            for (var i = 0; i < padding; i++) { 
                zeroes += "0"; 
            }
    
            return (value + zeroes).slice(padding * -1);
        };
    });