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
         * Creates an hidden input.
         * 
         * @param  {Object} attributes - The attributes of the input control.
         * @return {String} A Html text input
         */
        factory.createHiddenInput = function(attributes) {   
                 
            var input =  '<input type="text" class="form-control" ng-model="';
                input +=  this.getModelKey(attributes) + '" name="' + attributes.name + '"';
                input += ' style="display: none;"/>';
           return input;
           
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
            var input =  '<textarea class="form-control" ng-model="';
                input +=  this.getModelKey(attributes) + '" placeholder="' + this.getPlaceHolder(attributes) + '"';
                angular.forEach(attributes, function(value, key) {
                // skip these
                if((key.lastIndexOf('$', 0) === 0) ) 
                    return true;                
                
                if(typeof attributes.$attr[key] !== 'undefined') 
                  input += attributes.$attr[key] + '="' + value + '" ';                   
                });
                input += '/textarea>'; 

           return input;
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

        /**
         * Creates a textarea for the type.
         *
         * @param {Object} attributes - The attributes of the textarea control.
         * @return {String} A Html <label> text.
        */
        factory.createStartEndDateTimeInput = function(attributes) {
            var input =  '<div class="row">';               
                input += '<date-time-input entity-name="' + attributes.entityName + '"';

                if(angular.isDefined(attributes.minDate))
                    input += ' min-date="\'' + attributes.minDate + '\'" ';

                if(angular.isDefined(attributes.maxDate))
                    input += ' max-date="\'' + attributes.maxDate + '\'" ';

                input += ' name="startDate" date-ng-change="startDateChange()" time-ng-change="startDateTimeChange()"></date-time-input>';
                input += '<date-time-input entity-name="' + attributes.entityName + '"';

                if(angular.isDefined(attributes.minDate))
                    input += ' min-date="\'' + attributes.minDate + '\'" ';

                if(angular.isDefined(attributes.maxDate))
                    input += ' max-date="\'' + attributes.maxDate + '\'" ';

                input +=  ' name="endDate" date-ng-change="endDateChange()" time-ng-change="endDateTimeChange()"></date-time-input>';
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
                var errorMessage = this.getTranslation(translationKey + '.validate.email');                       
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
         * Creates a switch input.
         *
         * @param Object attributes - The attributes of the input control.
         * @return String a Switch input text.
        */
        factory.createSwitchInput = function(attributes) {
            
            var tooltip = this.getTooltip(attributes);
            var input =  '<div class="switch">';                    
                input += '<i id="switcher" class="fa fa-2x fa-fw" ng-class="model ? \'fa-toggle-on\': \'fa-toggle-off\'"';
                if(tooltip !== '') {
                    input += 'tooltip-placement="right" tooltip="' + tooltip + '"';
                }
                input += 'ng-click="model = !model"></i>';                
                input += '</div>'; 

           return input;
        };

        /**
         * Creates a binary option input.
         *
         * @param Object attributes - The attributes of the input control.
         * @return String a Switch input text.
        */
        factory.createBinaryOptionInput = function(attributes) {
            
            var tooltip = this.getTooltip(attributes);
            var input =  '<div class="binary">';
                input += '<button type="button" class="btn" ng-class="model ? \'btn-primary\' : \'btn-default\'" ng-click="toggle()"' ; 
                if(tooltip !== '') {
                    input += 'tooltip-placement="right" tooltip="' + tooltip + '"';
                }   
                input += '>';
                input += '</button>'               
                input += '</div>'; 

           return input;
        };

        /**
         * Creates a geo location input.
         *
         * @param {Object} attributes - The attributes of the input control.
         * @return {String} A Html <label> text.
        */
        factory.createGeoLocationInput = function(attributes) {

            var tooltip = this.getTooltip(attributes);
            var input =  '<div class="geolocation" ng-click="toggle($event)">';                
                input += '</div>'; 

           return input;
        };

        /**
         * Creates a Html text display.
         * 
         * @param  {Object} attributes - The attributes of the input control.
         * @return {String} A Html text display <p>
         */
        factory.createTextDisplay = function(attributes) { 
            var entityField = attributes.entityName + '.' + attributes.name;
            var textDisplay = '<p class="col-xs-12"><strong>' + this.getTranslation(this.getTranslationKey(attributes) + '.label') + '</strong></p>'            
            textDisplay += '<p class="col-xs-12">{{' + entityField+ '}}</p>';                        
            return textDisplay;            
        };

        /**
         * Translate the key. Sets to the default if the key isn't 
         * found in the translated files.
         * @param  String key                The key to look up.
         * @param  String defaultTranslation The default to use if the key isn't found. Defaults to ''.
         * @return String                   The translated text.
         */
        factory.getTranslation = function(key, defaultTranslation) {
            defaultTranslation = defaultTranslation || '';
            var translation = $filter('translate')(key);

            if(translation === key) {
                translation = defaultTranslation;
            }

            return translation;
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
         * Returns the entity name from the attributes
         * @param  Object attributes associated with the directive.
         * @return String entity name
         */
        factory.getEntityName = function(attributes) {
            return attributes.entityName;
        }

        /**
         * Returns the input name from the attributes
         * @param  Object attributes associated with the directive.
         * @return String input name
         */
        factory.getName = function(attributes) {
            return attributes.name;
        }

        /**
         * Builds the translation key based on the attributes.
         * 
         * @param  {Object} attributes - The attributes to build the key from.
         * @return {String} 
         */
        factory.getModelKey = function(attributes) {
            return this.getEntityName(attributes) + "." + this.getName(attributes);
        };

        /**
         * Builds the placeholder text.
         * 
         * @param  {Object} attributes - The attributes to build the key from.
         * @return {String} 
         */
        factory.getPlaceHolder = function(attributes) {
            return this.getTranslation(this.getTranslationKey(attributes) + '.placeholder');
        };

        /**
         * Builds the tooltip text.
         * 
         * @param  {Object} attributes - The attributes to build the key from.
         * @return {String} 
         */
        factory.getTooltip = function(attributes) {
            return this.getTranslation(this.getTranslationKey(attributes) + '.tooltip');
        };

    return factory;
    })
    .factory('MapInitializer', function($window, $q){

        //Google's url for async maps initialization accepting callback function
        var asyncUrl = 'http://maps.googleapis.com/maps/api/js?sensor=false&callback=',
            mapsDefer = $q.defer();

        //Callback function - resolving promise after maps successfully loaded
        $window.googleMapsInitialized = mapsDefer.resolve; // removed ()

        //Async loader
        var asyncLoad = function(asyncUrl, callbackName) {
          var script = document.createElement('script');
          //script.type = 'text/javascript';
          script.src = asyncUrl + callbackName;
          document.body.appendChild(script);
        };
        //Start loading google maps
        asyncLoad(asyncUrl, 'googleMapsInitialized');

        //Usage: Initializer.mapsInitialized.then(callback)
        return {
            mapsInitialized : mapsDefer.promise
        };
        
    });
