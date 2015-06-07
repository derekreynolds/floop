/* globals $ */
'use strict';

angular.module('floopApp')
    .controller('RateInputController', function ($scope) {

        if(!angular.isDefined($scope.starCount)) {
            $scope.starCount = _.range(1, 11);     
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
            $scope.onRateClick();            
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
            debugger
            $scope.onRateClick();           
        };

        function getParent(event) {
            var $target = angular.element(event.target);
            return $target.parent();  
        };

    })
    .controller('GeoLocationController', function($scope, uiGmapGoogleMapApi) {
        $scope.distances = [
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
            {'name': '250km', 'meters': 250000, "zoom":6},
            {'name': '500km', 'meters': 500000, "zoom":5},
            {'name': '1000km', 'meters': 1000000, "zoom":4}
        ];

        $scope.model.geo = { 
            center: { 
                latitude: 53.3497, 
                longitude: -6.2603 
            }, 
            zoom: 16,
            distance: 250 
        };
       
        $scope.c = {
            center: $scope.model.geo.center,
            radius: $scope.model.geo.distance,
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

        var cmaps;
        uiGmapGoogleMapApi.then(function(maps) {
            
            cmaps = maps;
        });


        $scope.changeDistance = function() {
            $scope.model.geo.distance = parseInt($scope.model.geo.distance)
            $scope.model.geo.zoom = _.result(_.findWhere($scope.distances, { 'meters': $scope.model.geo.distance}), 'zoom');
            $scope.c.radius = $scope.model.geo.distance;
           
        };

        $scope.showPosition = function (position) {               
            $scope.model.geo.center.latitude = position.coords.latitude;
            $scope.model.geo.center.longitude = position.coords.longitude;
            $scope.model.geo.accuracy = position.coords.accuracy;                    
        };
 
        $scope.showError = function (error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    $scope.$emit('event:resource.error', {text:'geo.error.title', title:'geo.error.permission.text'});                     
                    break;
                case error.POSITION_UNAVAILABLE:
                    $scope.$emit('event:resource.error', {text:'geo.error.title', title:'geo.error.position.text'});
                    break;
                case error.TIMEOUT:
                    $scope.$emit('event:resource.error', {text:'geo.error.title', title:'geo.error.timeout.text'});
                    break;
                case error.UNKNOWN_ERROR:
                    $scope.$emit('event:resource.error', {text:'geo.error.title', title:'geo.error.unkown.text'});
                    break;
            }
     
        };

        $scope.getLocation = function () {            
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition($scope.showPosition, $scope.showError);
            }
            else {
                $scope.$emit('event:resource.error', {text:'geo.error.title', title:'geo.error.unknown.text'}); 
                $scope.error = "Geolocation is not supported by this browser.";
            }
        };
 

        $scope.getLocation();
        

    })
    .controller('SocializeInputController', function ($scope) {
        $scope.count = 0;
        
        $scope.$watch('model.message', function() {
            $scope.count = $scope.model.message.length;
        });
        $scope.characterCount = function(event) {                  
            if($scope.count >= 120) {                
                // allow delete and backspace
                if((event.keyCode !== 8) && (event.keyCode !== 46)) {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }            
        };

    }) 
    .controller('DateTimeInputController', function ($scope) {
       $scope.dateDialogOpened = false;
        $scope.openDateDialog = function(event) { 
            event.preventDefault();
            event.stopPropagation();
                        
            $scope.dateDialogOpened = true;
        };

    });

