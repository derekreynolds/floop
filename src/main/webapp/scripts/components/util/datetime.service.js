/*jshint bitwise: false*/
'use strict';

angular.module('floopApp')    
    .factory('DateTimeService', function () {
        var factory = {}; 

        /**
         * Format the date/time into UTC format
         * @param  String dateTime date/time seperated by a space.
         * @return String date/time with the space replaced by a T e.g. YYYY-MM-DDTHH:MM
         */
        factory.toUTC = function(dateTime) {
            return dateTime.replace(' ', 'T');
        };

        /**
         * Format the date/time into UTC format.
         * @param  String date the date
         * @param  String time the time
         * @return String  String date/time with the space replaced by a T e.g. YYYY-MM-DDTHH:MM
         */
        factory.toDateTimeUTC = function(date, time) {
            return date + ' T' + time;
        };

        /**
         * Format the dateTime to the ISO 8061 format.
         * Throws an execption if it the argument is not a date.
         * @param  Date dateTime the date/time to format.
         * @return String format the date/time to a String e.g. YYYY-MM-DD HH:MM
         */
        factory.formatDateTime = function(dateTime) {
            if(!_.isDate(dateTime))
                throw new TypeError("Expected a date type")

            return this.formatDate(dateTime) + ' ' + this.formatTime(dateTime);
        };

        /**
         * Format the date to the ISO 8061 String
         * @param  Date date the date
         * @return String  the formatted date e.g. YYYY-MM-DD
         */
        factory.formatDate = function(date) {
 
            var formattedDate = date.getFullYear() + '-' + s.lpad((date.getMonth() + 1), 2, '0') + '-';     
                formattedDate += s.lpad(date.getDate(), 2, '0');

            return formattedDate;
        };

        /**
         * Format the time to the ISO 8061 String
         * @param  Date time the time
         * @return String the formatted time e.g. HH:MM
         */
        factory.formatTime = function(time) {   
            return s.lpad(time.getHours(), 2, '0') + ':' + s.lpad(time.getMinutes(), 2, '0');                
        };


        factory.isMomentTimeBefore = function(startTime, endTime) {
            return this.isTimeBefore(startTime.hours(), startTime.minutes(), startTime.seconds(), 
                endTime.hours(), endTime.minutes(), endTime.seconds());
        };

        factory.isMomentTimeSame = function(startTime, endTime) {
            return this.isTimeSame(startTime.hours(), startTime.minutes(), startTime.seconds(), 
                endTime.hours(), endTime.minutes(), endTime.seconds());
        };

        factory.isMomentTimeAfter = function(startTime, endTime) {            
            return this.isTimeAfter(startTime.hours(), startTime.minutes(), startTime.seconds(),
                endTime.hours(), endTime.minutes(), endTime.seconds());
        };

        factory.isTimeBefore = function(startHour, startMinute, startSecond, endHour, endMinute, endSecond) {            
            var startTimeObject = new Date();
            startTimeObject.setHours(startHour, startMinute, startSecond);

            var endTimeObject = new Date(startTimeObject);
            endTimeObject.setHours(endHour, endMinute, endSecond);

            return startTimeObject < endTimeObject;
        };

        factory.isTimeSame = function(startHour, startMinute, startSecond, endHour, endMinute, endSecond) {
            var startTimeObject = new Date();
            startTimeObject.setHours(startHour, startMinute, startSecond);

            var endTimeObject = new Date(startTimeObject);
            endTimeObject.setHours(endHour, endMinute, endSecond);
            return startTimeObject === endTimeObject;
        };

        factory.isTimeAfter = function(startHour, startMinute, startSecond, endHour, endMinute, endSecond) {
            return !(this.isTimeSame(startHour, startMinute, startSecond, endHour, endMinute, endSecond) 
                || (this.isTimeBefore(startHour, startMinute, startSecond, endHour, endMinute, endSecond)));
        };

        return factory;
});

