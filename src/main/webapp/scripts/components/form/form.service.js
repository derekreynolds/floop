'use strict';

angular.module('floopApp')
    .factory('formService', function($filter) {
        var factory = {}; 


        /**
         * Creates a Html label.
         *
         * @param {Object} attributes - The attributes of the input control.
         * @return {String} A Html <label> text.
        */
        factory.createLabel = function(attributes) {
           return '<label>' + $filter('translate')(this.getTranslationKey(attributes) + '.label') + '</label>';
        };

        /**
         * Creates an text input.
         * 
         * @param  {Object} attributes - The attributes of the input control.
         * @return {String} A Html text input
         */
        factory.createTextInput = function(attributes) {
            return this.createInput(attributes, 'text');        
        };

        /**
         * Create a password input.
         * 
         * @param  {Object} attributes - The attributes of the input control.
         * @return {String} A Html password input
         */
        factory.createPasswordInput = function(attributes) {
            var decoratedInput = '<div class="input-group">' +
                                '<div class="input-group-addon"><i class="fa fa-lock"></i></div>' +
                                this.createInput(attributes, 'password') +
                                '</div>';
            return decoratedInput;        
        };

        /**
         * Create a number input.
         * 
         * @param  {Object} attributes - The attributes of the input control.
         * @return {String} A Html number input
         */
        factory.createNumberInput = function(attributes) {
            return this.createInput(attributes, 'number');        
        };

        /**
         * Creates a input for the type.
         *
         * @param {Object} attributes - The attributes of the input control.
         * @return {String} A Html <label> text.
        */
        factory.createInput = function(attributes, type) {
            attributes.type = type; 
            var input =  '<input type="' + type + '" class="form-control" ng-model="';
                input +=  this.getModelKey(attributes) + '" placeholder="' + this.getPlaceHolder(attributes) + '"';
                angular.forEach(attributes, function(value, key) {
                // skip these
                if((key.lastIndexOf('$', 0) === 0) ) 
                    return true;                
                
                if(typeof attributes.$attr[key] !== 'undefined') 
                  input += attributes.$attr[key] + '="' + value + '" ';                   
                });
                input += '/>'; 

           return input;
        };

        /**
         * Creates a Date Time input.
         *
         * @param {Object} attributes - The attributes of the input control.
         * @return {String} A Html <label> text.
        */
        factory.createDateTimeInput = function(attributes) {
            var dateDialog = 'open' + attributes.name + 'DateDialog($event)';
            var timeDialog = 'open' + attributes.name + 'TimeDialog($event)';
            var input =   '<span class="input-group">';
                input +=  '<input type="text" class="form-control" datepicker-popup="{{format}}" ng-model="';
                input +=  this.getModelKey(attributes) + '" is-open="' + attributes.name + 'Opened"';
                input +=  'datepicker-options="dateOptions" date-disabled="disabled(date, mode)" ng-required="true" close-text="Close" ng-readonly="true"/>';
                input +=  '<span class="input-group-btn">';
                input +=  '<button type="button" class="btn btn-default" ng-click="' + dateDialog + '"><i class="fa fa-calendar"></i></button>';
                input +=  '<button type="button" class="btn btn-default" ng-click="' + timeDialog + '"><i class="fa fa-clock-o"></i></button>';
                input +=  '</span>';
                input +=  '</span>';        
           return input;
        };



        factory.createAddOptionInput = function(attributes) {
            var model = this.getModelKey(attributes);
            var input = '<span class="input-group">';
                input += this.createTextInput(attributes);
                input += '<span class="input-group-btn">';
                input += '<button type="button" class="btn btn-default" ng-click="addItem($event)"';
                input += 'ng-disabled="' + model +' === undefined ||' + model + '=== \'\'"><i class="fa fa-plus"></i></button>';                               
                input += '</span>';

            return input;           
        }          

        /**
         * Creates an error message output area.
         * 
         * @param  {Object} attributes - The attributes of the input control.
         * @return {String} A Html error div
         */
        factory.createError = function(attributes) { 

            var translationKey =  this.getTranslationKey(attributes); 

            var error = '<div ng-show="form.'; 
            error += attributes.name + '.$dirty && form.';
            error += attributes.name + '.$invalid">'; 

            if(attributes.type === 'email') {
                var errorMessage = $filter('translate')(translationKey + '.validate.email');                       
                error += '<div class="error" ng-message="email">' + errorMessage + '</div>';  
            }          

            angular.forEach(attributes, function(value, key) {
                if((key.lastIndexOf('ng', 0) === 0) && (key.lastIndexOf('ngModel', 0) !== 0)) {
                    var constraint = key.substr(2, key.length).toLowerCase();
                    var errorMessage = $filter('translate')(attributes.entityName + '.messages.validate.' + attributes.name + '.' + constraint);
                    error += '<p class="help-block" ng-show="form.';
                    error += attributes.name + '.$error.' + constraint + '">' + errorMessage + '</p>';
                }                         
            });
            error += '</div>';
            return error;
        };

        /**
         * Builds the translation key based on the attributes.
         * 
         * @param  {Object} attributes - The attributes to build the key from.
         * @return {String} 
         */
        factory.getTranslationKey = function(attributes) {
            return attributes.entityName + ".form." + attributes.name;
        };

        /**
         * Builds the translation key based on the attributes.
         * 
         * @param  {Object} attributes - The attributes to build the key from.
         * @return {String} 
         */
        factory.getModelKey = function(attributes) {
            return attributes.entityName + "." + attributes.name;
        };

        /**
         * Builds the placeholder text.
         * 
         * @param  {Object} attributes - The attributes to build the key from.
         * @return {String} 
         */
        factory.getPlaceHolder = function(attributes) {
            return $filter('translate')(this.getTranslationKey(attributes) + '.placeholder') 
        };

    return factory;
});