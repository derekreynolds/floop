/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('DateTimeService', function () {
        var factory = {}; 

        factory.toUTC = function(dateTime) {
            return dateTime.replace(' ', 'T');
        };

        factory.toDateTimeUTC = function(date, time) {
            return date + ' T' + time;
        };

        factory.formatDateTime = function(dateTime) {
            if(!_.isDate(dateTime))
                throw new TypeError("Expected a date type")

            return this.formatDate(dateTime) + ' ' + this.formatTime(dateTime);
        };

        factory.formatDate = function(date) {
 
            var formattedDate = date.getFullYear() + '-' + s.lpad((date.getMonth() + 1), 2, '0') + '-';     
                formattedDate += s.lpad(date.getDate(), 2, '0');

            return formattedDate;
        };

        factory.formatTime = function(time) {   
            return s.lpad(time.getHours(), 2, '0') + ':' + s.lpad(time.getMinutes(), 2, '0');                
        };

        return factory;
});

