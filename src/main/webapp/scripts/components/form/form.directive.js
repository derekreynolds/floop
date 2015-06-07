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
            scope: {
                model: '='
            }, 
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {                
                formService.extractAttributesFromModel(attr);
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
            scope: {
                model: '='
            },
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {  
                formService.extractAttributesFromModel(attr);              
                if(_.isUndefined(attr.hideLabel)) {
                    element.append(formService.createLabel(attr));
                }
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
            scope: {
                model: '='
            }, 
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                formService.extractAttributesFromModel(attr);
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
    .directive('addOptionInput', function($compile, formService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '='
            }, 
            templateUrl: '/scripts/components/form/add-option-input.html',
            compile: function(element, attr) {
                formService.extractAttributesFromModel(attr);
                return {
                  pre: function($scope, iElem, iAttrs){

                    $scope.item = {
                        text: '',
                        file: ''
                    };

                    $scope.label  = iAttrs.entityName + '.form.' + iAttrs.name + '.label';

                    $scope.addItem = function ($event) {

                        if($scope.model.length <= 20) {                             
                            $scope.model.push({ordinal: $scope.model.length, item: $scope.item.text, image: $scope.item.file});             
                            
                            $scope.item.text = '';
                            $scope.item.file = '';
                            $scope.buttonEnabled = false;
                        } else {
                            $scope.$emit('event:user.info', {text:'A maximum of 20 items can be added.'});
                        }

                    };

                    $scope.enableAddButton = function($event) {          
                        $scope.buttonEnabled = true;            
                    };

                    $scope.updateImageUpload = function() {
                        
                        var $icon = element.find('i.fa-upload');
                        $icon.removeClass('fa-upload');
                        $icon.addClass('fa-file-image-o');       

                    };
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
            scope: {
                name: '@',
                value: '@',
                image: '@',
                index: '@',
                model: '='
            }, 
            templateUrl: '/scripts/components/form/add-option.html',
            compile: function(element, attr) {
                return {
                  pre: function($scope, iElem, iAttrs){                    
                    $scope.removeItem = function () {
                        _.pullAt($scope.model, $scope.index);
                    };
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
                formService.extractAttributesFromModel(attr);                
                element.append(formService.createStartEndDateTimeInput(attr));
                return {
                  pre: function(scope, iElem, iAttrs) {
                    var timeBox = scope[iAttrs.entityName][iAttrs.name]; 
                    scope.startDateDialogOpened = false;

                    scope.openStartDateDialog = function(event) { 
                        event.preventDefault();
                        event.stopPropagation();
                                    
                        scope.startDateDialogOpened = true;
                    }; 

                    scope.endDateDialogOpened = false;

                    scope.openEndDateDialog = function(event) { 
                        event.preventDefault();
                        event.stopPropagation();
                                    
                        scope.endDateDialogOpened = true;
                    };

                    scope.startDateChange = function() {                               
                           
                        var startDate = moment(timeBox.startDate);
                        var startTime = moment(timeBox.startTime);
                        var endDate = moment(timeBox.endDate);
                        var endTime = moment(timeBox.endTime);

                        if(startDate.isAfter(endDate)) {
                            timeBox.endDate = DateTimeService.formatDate(startDate.toDate());
                            timeBox.endTime = startTime.add(1, 'h').toDate();                
                        } else if(startDate.isSame(endDate) && (startTime.isAfter(endTime) 
                            || startTime.isSame(endTime))) {
                            timeBox.endTime = startTime.add(1, 'h').toDate();
                        }         
                    };

                    scope.endDateChange = function() {
            
                        var startDate = moment(timeBox.startDate);
                        var startTime = moment(timeBox.startTime);
                        var endDate = moment(timeBox.endDate);
                        var endTime = moment(timeBox.endTime);

                        if(endDate.isBefore(startDate)) {
                            timeBox.endDate = DateTimeService.formatDate(startDate.toDate());
                            timeBox.endTime = startTime.add(1, 'h').toDate(); 
                        } else if(endDate.isSame(startDate) && (endTime.isAfter(startTime) 
                            || endTime.isSame(startTime))) {                
                            timeBox.endTime = startTime.add(1, 'h').toDate();
                        } 
                    };

                    scope.startTimeChange = function() {
                        
                        var startDate = moment(timeBox.startDate);
                        var startTime = moment(timeBox.startTime);
                        var endDate = moment(timeBox.endDate);
                        var endTime = moment(timeBox.endTime);
                
                        if(endDate.isSame(startDate) && (DateTimeService.isMomentTimeAfter(startTime, endTime))
                            || (DateTimeService.isMomentTimeSame(startTime, endTime))) {
                            timeBox.endTime = startTime.add(1, 'h').toDate();
                        }
                    };

                    scope.endTimeChange = function() {
                        
                        var startDate = moment(timeBox.startDate);
                        var startTime = moment(timeBox.startTime);
                        var endDate = moment(timeBox.endDate);
                        var endTime = moment(timeBox.endTime);

                        if(endDate.isSame(startDate) && (DateTimeService.isMomentTimeAfter(startTime, endTime))
                            || (DateTimeService.isMomentTimeSame(startTime, endTime))) {
                            timeBox.endTime = startTime.add(1, 'h').toDate();
                        }
                    };   
                  },
                  post: function(scope, iElem, iAttrs) {
                    
                  }
                }
            }
        };
    })
    .directive('dateTimeInput', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                dateModel: '=',
                timeModel: '=',
                dateChange: '&',
                timeChange: '&'
            },         
            compile: function(element, attr) {
                formService.extractAttributesFromModel(attr);                
                element.append(formService.createDateTimeInput(attr));               
                return {
                  pre: function(scope, iElem, iAttrs){ 
                    scope.dateDialogOpened = false;
                    scope.openDateDialog = function(event) { 
                        event.preventDefault();
                        event.stopPropagation();
                                    
                        scope.dateDialogOpened = true;
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
            controller: 'DateInputController',            
            compile: function(element, attr) {
                formService.extractAttributesFromModel(attr);
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
    .directive('infoDisplay',function(formService) {
        return {            
            replace: true,
            restrict: 'E',
            //templateUrl: '/views/partials/display-control.html',
            compile: function(element, attr) {                          
                element.append(formService.createInfoDisplay(attr));
                return {
                  pre: function(scope, iElem, iAttrs){
                    
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
                index: '@',
                onRateClick: '&'
            },
            templateUrl: '/scripts/components/form/rating.html',
            controller: 'RateInputController',
            compile: function(element, attr) {                               
                return {
                  pre: function(scope, iElem, iAttrs){
                   
                  },
                  post: function(scope, iElem, iAttrs){
                  
                  }
                }        
            }
        };
    })
    .directive('voteInput', function($compile, formService) {
        return {
            restrict: 'E',
            replace: true,
            require: ['^form'],
            scope: {
                model: '=',
                index: '@'
            },
            templateUrl: '/scripts/components/form/voting.html',
            compile: function(element, attr) {                             
                return {
                  pre: function($scope, iElem, iAttrs){

                    $scope.voteRecord = function(event, index) {
                       _.forEach($scope.model, function(object, n) {                        
                          object.selected = false;
                        });        
                        $scope.model[$scope.index].selected = true;                                   
                    };

                    function getParent(event) {
                        return angular.element(event.target).parent(); 
                    };

                  },
                  post: function(scope, iElem, iAttrs){
                  
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
                formService.extractAttributesFromModel(attr);
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
            scope: {
                model: '='
            },
            templateUrl: '/scripts/components/form/form-group.html',
            controller: 'GeoLocationController',
            compile: function(element, attr) { 
                formService.extractAttributesFromModel(attr);
                element.append(formService.createGeoLocationInput(attr)); 
                return {
                  pre: function(scope, iElem, iAttrs){
                   
                  },
                  post: function(scope, iElem, iAttrs){
                  
                  }
                }    
            }
    
        };
    })
    .directive('participantVisibilityMessage', function(formService) {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                model: '@'
            },
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {                 
                element.append(formService.createInfoDisplay(attr)); 
                return {
                  pre: function(scope, iElem, iAttrs){                    
                    
                  },
                  post: function(scope, iElem, iAttrs){
                  
                  }
                }    
            }
    
        };
    })
    .directive('socializeInput', function($compile, formService) {
        return {
            restrict: 'E',
            replace: true,
            require: ['^form'],
            scope: {
                model: '='
            },
            controller: 'SocializeInputController',
            templateUrl: '/scripts/components/form/form-group.html',
            compile: function(element, attr) {
                formService.extractAttributesFromModel(attr);
                element.append(formService.createLabel(attr));
                element.append(formService.createSocializeInput(attr));
                return {
                  pre: function(scope, iElem, iAttrs){                    

                  },
                  post: function(scope, iElem, iAttrs){
                  
                  }
                }                   
                
            }
    
        };
    })
    .directive("fileread", [function () {
        return {
            scope: {
                fileread: "="
            },
            link: function (scope, element, attributes) {
                element.bind("change", function (changeEvent) {
                    if(changeEvent.target.files[0].size > 1000000) {
                        scope.$emit('event:user.error', {title: 'file.upload.error.title', text:'file.upload.error.message'});
                        return;
                    }
                    var reader = new FileReader();
                    
                    reader.onload = function (loadEvent) {

                        scope.$apply(function () {
                            scope.fileread = loadEvent.target.result;
                        });
                    }

                    reader.readAsDataURL(changeEvent.target.files[0]);
                });
            }
        }
    }]);
