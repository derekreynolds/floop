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
         * Creates an text area input.
         * 
         * @param  {Object} attributes - The attributes of the input control.
         * @return {String} A Html text input
         */
        factory.createTextAreaInput = function(attributes) {
            return this.createTextarea(attributes);        
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
         * Creates a textarea for the type.
         *
         * @param {Object} attributes - The attributes of the textarea control.
         * @return {String} A Html <label> text.
        */
        factory.createTextarea = function(attributes) {
            var textarea =  '<textarea class="form-control" ng-model="';
                textarea +=  this.getModelKey(attributes) + '" placeholder="' + this.getPlaceHolder(attributes) + '"';
                angular.forEach(attributes, function(value, key) {
                // skip these
                if((key.lastIndexOf('$', 0) === 0) ) 
                    return true;                
                
                if(typeof attributes.$attr[key] !== 'undefined') 
                  textarea += attributes.$attr[key] + '="' + value + '" ';                   
                });
                textarea += '/textarea>'; 

           return textarea;
        };


        /**
         * Creates a Date Time input.
         *
         * @param {Object} attributes - The attributes of the input control.
         * @return {String} A Html <label> text.
        */
        factory.createDateTimeInput = function(attributes) {
            var dateDialog = 'open' + attributes.name + 'Dialog($event)';
            
            var input =  '<div class="col-md-6">';                
                input += '<div class="row">'; 
                input += '<div class="col-xs-8">';                      
                input += this.createLabel(attributes);
                input += '<span class="input-group voffset2">';
                input += '<input type="text" class="form-control" ng-model="' + this.getModelKey(attributes);
                input += '" is-open="' + attributes.name + 'Opened" datepicker-popup="yyyy-MM-dd"';

                if(angular.isDefined(attributes.dateNgChange))
                    input += ' ng-change="' + attributes.dateNgChange + '" ';
                if(angular.isDefined(attributes.minDate))
                    input += ' min-date="' + attributes.minDate + '" ';
                if(angular.isDefined(attributes.maxDate))
                    input += ' max-date="' + attributes.maxDate + '" ';
                if(angular.isDefined(attributes.datepickerOptions))
                    input += ' datepicker-options="' + attributes.datepickerOptions + '" ';
                if(angular.isDefined(attributes.dateDisabled))
                    input += ' date-disabled="' + attributes.dateDisabled + '" ';
                if(angular.isDefined(attributes.ngRequired))
                    input += ' ng-required="' + attributes.ngRequired + '" ';
                if(angular.isDefined(attributes.datepickerPopup))
                    input += ' datepicker-popup="' + attributes.datepickerPopup + '" ';

                input += 'close-text="Close" ng-readonly="true"/>';
                input += '<span class="input-group-btn">';
                input += '<button type="button" class="btn btn-default" ng-click="' + dateDialog + '"><i class="fa fa-calendar"></i></button>';                     
                input += '</span>';
                input += '</span>';                        
                input += '</div>';
                
                input += '<div class="col-xs-4">';
                input += '<timepicker ng-model="' + this.getModelKey(attributes) + 'Time"';
                if(angular.isDefined(attributes.timeNgChange))
                    input += ' ng-change="' + attributes.timeNgChange + '" ';
                input += ' hour-step="hstep" minute-step="mstep" show-meridian="false"></timepicker>';
                input += '</div>';
                input += '</div>';      
         
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
