'use strict';

angular.module('floopApp')
    .controller('RateController', function ($scope, $translate, $timeout, $filter, $compile, DateTimeService, Rate) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'YYYY-MM-DD';
        $scope.rate = {};

        $scope.now = moment();

        $scope.minDate = $scope.now.format($scope.format);
        $scope.rate.startDate = $scope.now.format($scope.format);

        $scope.rate.endDate = $scope.now.add(1,'d').format($scope.format);

        $scope.rate.startDateTime = new Date();
        $scope.rate.endDateTime = new Date();

        $timeout(function (){angular.element('[ng-model="rate.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;

        var itemCount = 1;
        var itemIndex = 1;

        $scope.addItem = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();

            var target = angular.element($event.target);
            var $grandParent = target.closest('span.input-group');
            var $button = $grandParent.find('button');
            var $icon = $grandParent.find('i');
            if($icon.hasClass('fa-plus')) { 
                itemCount++;               
                if(itemCount <= 20) {                    
                    var addOptionMarkUp = '<add-option entity-name="rate" name="item' + itemIndex++;
                        addOptionMarkUp += '"></add-option>';
                    $icon.removeClass('fa-plus').addClass('fa-minus');            
                    $grandParent.after($compile(addOptionMarkUp)($scope));
                    $grandParent.after('<div class="voffset2"></div>');
                } else {
                    $scope.$emit('event:info', {text:'A maximum of 20 items can be added.'});
                }
            } else {
                if(itemCount > 1) {
                    itemCount--;
                    $grandParent.remove();
                }
            }

        };

        $scope.enableAddButton = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            var target = angular.element($event.target);
            var $grandParent = target.closest('span.input-group');
            var $button = $grandParent.find('button');
            
        };

        $scope.create = function() {

            var items = [];
            var rate = _.clone($scope.rate);

            delete rate['startDateTime'];
            delete rate['endDateTime'];

            rate.startDate = DateTimeService.toDateTimeUTC($scope.rate.startDate, 
                                    DateTimeService.formatTime($scope.rate.startDateTime));
            rate.endDate = DateTimeService.toDateTimeUTC($scope.rate.endDate, 
                                    DateTimeService.formatTime($scope.rate.endDateTime));
            
            _.forEach(rate, function(value, key) {
                if(_.startsWith(key, 'item')) {
                    if(value) {                  
                        items.push(value);   
                    }                 
                    delete rate[key];
                }                
            });

            rate['items'] = items;   

            Rate.post(rate).then(
                function (value, responseHeaders) {
                    $scope.success = 'OK';
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );

        };
    });
