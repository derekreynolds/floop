/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('DateTimeService', function () {
        var factory = {}; 

        factory.toUTC = function(dateTime) {
            return dateTime.replace(' ', 'T');
        };

        factory.formatDateTime = function(dateTime) {
            if(!_.isDate(dateTime))
                throw new TypeError("Expected a date type")

            var formattedDateTime = dateTime.getFullYear() + '-' + s.lpad((dateTime.getMonth() + 1), 2, '0') + '-';     
                formattedDateTime += s.lpad(dateTime.getDate(), 2, '0') + ' ' + s.lpad(dateTime.getHours(), 2, '0');
                formattedDateTime += ':' + s.lpad(dateTime.getMinutes(), 2, '0');
            return formattedDateTime;
        };

        return factory;
});

