/* globals $ */
'use strict';

angular.module('floopApp')
    .directive('showValidation', function() {
        return {
            restrict: 'A',
            require: 'form',
            link: function (scope, element) {
                element.find('.form-group').each(function() {
                    var $formGroup = $(this);
                    var $inputs = $formGroup.find('input[ng-model],textarea[ng-model],select[ng-model]');

                    if ($inputs.length > 0) {
                        $inputs.each(function() {
                            var $input = $(this);
                            scope.$watch(function() {
                                return $input.hasClass('ng-invalid') && $input.hasClass('ng-dirty');
                            }, function(isInvalid) {
                                $formGroup.toggleClass('has-error', isInvalid);
                            });
                        });
                    }
                });
            }
        };
    })
    .directive('formView', function() {
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            scope: {
                entityName: '@',
                action:'@'
            },
            templateUrl: '/scripts/components/form/form-view.html'
        };
    })
    .directive('formGroup', function(formService) {           
        return {
            replace: true,
            transclude: true,
            restrict: 'E',
            templateUrl: '/scripts/components/form/form-control.html'
        };
    })
    .directive('textInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form', 
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                element.append(formService.createLabel(attr));
                element.append(formService.createTextInput(attr));
                element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('textAreaInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form', 
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                element.append(formService.createLabel(attr));
                element.append(formService.createTextAreaInput(attr));
                element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('numberInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form', 
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                element.append(formService.createLabel(attr));
                element.append(formService.createNumberInput(attr));
                element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('addOptionInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form',
            controller: 'AddOptionInputController', 
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                element.append(formService.createLabel(attr));
                element.append(formService.createAddOptionInput(attr));
                element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('addOption', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form',
            controller: 'AddOptionInputController',
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                //element.append(formService.createLabel(attr));
                element.append(formService.createAddOptionInput(attr));
                element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('dateTimeInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form',          
            compile: function(element, attr) {
                //element.append(formService.createLabel(attr));
                element.append(formService.createDateTimeInput(attr));
                //element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    var dateDialogFunctionName = 'open' + iAttrs.name + 'Dialog';
                    scope[dateDialogFunctionName] = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        scope[iAttrs.name + 'Opened'] = true;
                    };
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('dateInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form',          
            compile: function(element, attr) {
                element.append(formService.createLabel(attr));
                element.append(formService.createDateInput(attr));
                //element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    var dateDialogFunctionName = 'open' + iAttrs.name + 'DateDialog';
                    scope[dateDialogFunctionName] = function($event) {
                        $event.preventDefault();
                        $event.stopPropagation();

                        scope[iAttrs.name + 'Opened'] = true;
                    };
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('groupDisplay', function(formService) {
        return {            
            replace: true,
            restrict: 'E',
            transclude: true,
            template: '<div class="row" ng-transclude></div>'

        };
    })
    .directive('textDisplay',function(formService) {
        return {            
            replace: true,
            restrict: 'E',
            //templateUrl: '/views/partials/display-control.html',
            compile: function(element, attr) {                          
                element.append(formService.createTextDisplay(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }               
            }          

        };
    })
    .directive('startEndDateTimeInput', function(formService, DateTimeService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form',         
            compile: function(element, attr) {
                //element.append(formService.createLabel(attr));
                element.append(formService.createStartEndDateTimeInput(attr));
                //element.append(formService.createError(attr));
                return {
                  pre: function(scope, iElem, iAttrs){

                    scope.startDateChange = function() { 
                        
                        var startDate = moment(scope[iAttrs.entityName].startDate);
                        var startDateTime = moment(scope[iAttrs.entityName].startDateTime);
                        var endDate = moment(scope[iAttrs.entityName].endDate);
                        var endDateTime = moment(scope[iAttrs.entityName].endDateTime);

                        if(startDate.isAfter(endDate)) {
                            scope[iAttrs.entityName].endDate = DateTimeService.formatDate(scope[iAttrs.entityName].startDate);
                            scope[iAttrs.entityName].endDateTime = startDateTime.add(1, 'h').toDate();                
                        } else if(startDate.isSame(endDate) && (startDateTime.isAfter(endDateTime) 
                            || startDateTime.isSame(endDateTime))) {
                            scope[iAttrs.entityName].endDateTime = startDateTime.add(1, 'h').toDate();
                        }         
                    };

                    scope.endDateChange = function() {

                        var startDate = moment(scope[iAttrs.entityName].startDate);
                        var startDateTime = moment(scope[iAttrs.entityName].startDateTime);
                        var endDate = moment(scope[iAttrs.entityName].endDate);
                        var endDateTime = moment(scope[iAttrs.entityName].endDateTime);

                        if(endDate.isBefore(startDate)) {
                            scope[iAttrs.entityName].endDate = DateTimeService.formatDate(scope[iAttrs.entityName].startDate);
                            scope[iAttrs.entityName].endDateTime = startDateTime.add(1, 'h').toDate(); 
                        } else if(endDate.isSame(startDate) && (endDateTime.isAfter(startDateTime) 
                            || endDateTime.isSame(startDateTime))) {                
                            scope[iAttrs.entityName].endDateTime = startDateTime.add(1, 'h').toDate();
                        }   
                    };

                    scope.startDateTimeChange = function() {
                        var startDate = moment(scope[iAttrs.entityName].startDate);
                        var startDateTime = moment(scope[iAttrs.entityName].startDateTime);
                        var endDate = moment(scope[iAttrs.entityName].endDate);
                        var endDateTime = moment(scope[iAttrs.entityName].endDateTime);
                
                        if(endDate.isSame(startDate) && (DateTimeService.isMomentTimeAfter(startDateTime, endDateTime))
                            || (DateTimeService.isMomentTimeSame(startDateTime, endDateTime))) {
                            scope[iAttrs.entityName].endDateTime = startDateTime.add(1, 'h').toDate();
                        }
                    };

                    scope.endDateTimeChange = function() {
                        var startDate = moment(scope[iAttrs.entityName].startDate);
                        var startDateTime = moment(scope[iAttrs.entityName].startDateTime);
                        var endDate = moment(scope[iAttrs.entityName].endDate);
                        var endDateTime = moment(scope[iAttrs.entityName].endDateTime);

                        if(endDate.isSame(startDate) && (DateTimeService.isMomentTimeAfter(startDateTime, endDateTime))
                            || (DateTimeService.isMomentTimeSame(startDateTime, endDateTime))) {
                            scope[iAttrs.entityName].endDateTime = startDateTime.add(1, 'h').toDate();
                        }
                    };

                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }
        };
    })
    .directive('rateInput', function($compile, formService) {
        return {
            restrict: 'E',
            replace: true,
            require: ['^form'],
            scope: {
                model: '=',
                index: '@'
            },
            templateUrl: '/scripts/components/form/rating.html',
            controller: 'RateInputController',
            compile: function(element, attr) {                               
                return {
                  pre: function(scope, iElem, iAttrs){
                    //iElem.append(formService.createRateInput(iAttrs)); 
                  },
                  post: function(scope, iElem, iAttrs){
                   //iElem.append(formService.createRateInput(iAttrs));
                   //$compile(iElem.contents())(scope);
                  }
                }        
            }
        };
    })
    .directive('switchInput', function($compile, formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form',
            scope: {
                model: '='
            },
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                element.append(formService.createLabel(attr));
                element.append(formService.createSwitchInput(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                   
                  
                  },
                  post: function(scope, iElem, iAttrs){
                   
                  }
                }
            }            
    
        };
    })
    .directive('binaryOptionInput', function($compile, $filter, formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form',
            scope: {
                model: '='
            },
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {  
                element.append(formService.createLabel(attr));
                element.append(formService.createBinaryOptionInput(attr));   
                return {
                  pre: function(scope, iElem, iAttrs){
                    scope.toggle = function() {
                        scope.model = !scope.model;
                        scope.setButtonText();
                    };
                    scope.setButtonText = function() {
                        var $button = iElem.find('button');
                        if(scope.model) {
                            $button.html($filter('translate')('global.form.on'));                            
                        } else {
                            $button.html($filter('translate')('global.form.off'));
                        }
                    };
                    scope.setButtonText();
                  },
                  post: function(scope, iElem, iAttrs){
                        
                  }
                }
            }            
    
        };
    })
    .directive('geoLocationInput', function($compile, formService) {
        return {
            restrict: 'E',
            replace: true,
            require: ['^form'],
            templateUrl: '/scripts/components/form/geo-location.html',
            controller: 'GeoLocationController',
            link: function(scope, element, attrs, ctrls) {
                //element.append(formService.createGeoLocationInput(attrs));
                //$compile(element.contents())(scope);
            }
    
        };
    });
