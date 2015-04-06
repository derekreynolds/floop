/* globals $ */
'use strict';

angular.module('floopApp')
    .controller('RateInputController', function ($scope) {

        if(!angular.isDefined($scope.starCount)) {
            $scope.starCount = [];
            _.times(10, function(i) {
                $scope.starCount.push(i + 1);
            });
        }

        $scope.rateEnter = function(event, index) {
            var $parent = getParent(event);          
            
            for(var i = 1; i <= 10; i++) {                            
                var $icon = $parent.find('#' + i); 
                                           
                if(i <= index) {
                    if($icon.hasClass('fa-star-o'))
                        $icon.removeClass('fa-star-o').addClass('fa-star'); 
                } else {
                    if($icon.hasClass('fa-star'))
                        $icon.removeClass('fa-star').addClass('fa-star-o'); 
                }
            }                        
            
        };

        $scope.rateClear = function(event) {           
            var $parent = getParent(event);                     

            for(var i = 1; i <= $scope.model[$scope.index].score; i++) {                           
                var $icon = $parent.find('#' + i);
                if($icon.hasClass('fa-star'))
                    $icon.removeClass('fa-star').addClass('fa-star-o');                           
            }

            $scope.model[$scope.index].score = 0; 
        };

        $scope.rateLeave = function(event) {
            var $parent = getParent(event);          
 
            for(var i = 1; i <= 10; i++){
                var $icon = $parent.find('#' + i);
                if(i <= $scope.model[$scope.index].score) {
                    $icon.removeClass('fa-star-o').addClass('fa-star');
                } else {
                    $icon.removeClass('fa-star').addClass('fa-star-o');
                }                           
            };                        
            
        };

        $scope.rateRecord = function(event, index) {            
            $scope.model[$scope.index].score = index;                                   
        };

        function getParent(event) {
            var $target = angular.element(event.target);
            return $target.parent();  
        };

    })
    .controller('AddOptionInputController', function ($scope, $compile) {

        var itemCount = 1;
        var itemIndex = 1;

        $scope.addItem = function ($event) {
       
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
                    $scope.$emit('event:user.info', {text:'A maximum of 20 items can be added.'});
                }
            } else {
                if(itemCount > 1) {
                    itemCount--;
                    $grandParent.remove();
                }
            }

        };

        $scope.enableAddButton = function($event) {
          
            var target = angular.element($event.target);
            var $grandParent = target.closest('span.input-group');
            var $button = $grandParent.find('button');
            
        };
    })
    .controller('GeoLocationController', function($scope, $modal) {

        $scope.showMap = false;

        $scope.distances = [
            {'name': '100m', 'meters':100, "zoom":17},
            {'name': '250m', 'meters':250, "zoom":16},
            {'name': '500m', 'meters': 500, "zoom":15},
            {'name': '750m', 'meters': 750, "zoom":15},
            {'name': '1km', 'meters': 1000, "zoom":14},
            {'name': '3km', 'meters': 3000, "zoom":13},
            {'name': '5km', 'meters': 5000, "zoom":12},
            {'name': '10km', 'meters': 10000, "zoom":11},
            {'name': '20km', 'meters': 20000, "zoom":10},
            {'name': '50km', 'meters': 50000, "zoom":9},
            {'name': '100km', 'meters': 100000, "zoom":8},
            {'name': '250km', 'meters': 250000, "zoom":6}
        ];


        $scope.geo = { 
            center: { 
                latitude: 53.3497, 
                longitude: -6.2603 
            }, 
            zoom: 17,
            distance: 100 
        };
       
        $scope.c = {
            center: $scope.geo.center,
            radius: $scope.geo.distance,
            stroke: {
                color: '#708090',
                weight: 1,
                opacity: 1
            },
            fill: {
                color: '#708090',
                opacity: 0.5
            },
            geodesic: true, // optional: defaults to false
            draggable: true, // optional: defaults to false
            clickable: false, // optional: defaults to true
            editable: false, // optional: defaults to false
            visible: true, // optional: defaults to true
            control: {}
        };


        $scope.changeDistance = function() {
            $scope.geo.distance = parseInt($scope.geo.distance)
            $scope.geo.zoom = _.result(_.findWhere($scope.distances, { 'meters': $scope.geo.distance}), 'zoom');
            $scope.c.radius = $scope.geo.distance;
           
        };

        $scope.showPosition = function (position) {               
            $scope.geo.center.latitude = position.coords.latitude;
            $scope.geo.center.longitude = position.coords.longitude;
            $scope.geo.accuracy = position.coords.accuracy;            
            $scope.showMap = true;
                       
        };
 
        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.error = "User denied the request for Geolocation."
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.error = "Location information is unavailable."
                    break;
                case error.TIMEOUT:
                    $scope.error = "The request to get user location timed out."
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.error = "An unknown error occurred."
                    break;
            }
     
        };

        $scope.getLocation = function () {            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.error = "Geolocation is not supported by this browser.";
            }
        };
 

        $scope.getLocation();
        

    });

