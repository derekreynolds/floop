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
            templateUrl: '/scripts/components/form/form-group.html'
        };
    })
    .directive('textInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form', 
            template: '<div class="form-group"></div>',
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
    .directive('textArea', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form', 
            template: '<div class="form-group"></div>',
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
    .directive('addOptionInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            require: '^form', 
            template: '<div class="form-group"></div>',
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
    }).directive('dateInput', function(formService) {
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
    });
