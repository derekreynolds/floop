'use strict';


angular.module('floopApp')
    .controller('PetitionController', function ($scope, $translate, $timeout, Auth) {
        $scope.success = null;
        $scope.error = null;
        $scope.format = 'YYYY-MM-DD';
        $scope.petition = {};
        
        $scope.now = moment();

        $scope.petition.startDate = $scope.now.format($scope.format);

        $scope.petition.endDate = $scope.now.add(1,'d').format($scope.format);

        $scope.petition.startDateTime = new Date();
        $scope.petition.endDateTime = new Date();

        $timeout(function (){angular.element('[ng-model="petition.title"]').focus();});

        $scope.ismeridian = true; 
        $scope.hstep = 1;
        $scope.mstep = 5;


        $scope.toggleMode = function() {
            $scope.ismeridian = ! $scope.ismeridian;
        };

        $scope.openTimeCalendar = function(e) {
            e.preventDefault();
            e.stopPropagation();

            $scope.timeOpen = true;
        };

        $scope.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened = true;
        };

        $scope.select = function () {
            
        };

        $scope.upload = function (files) {
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
                var file = files[i];
                $upload.upload({
                    url: 'upload/url',
                    fields: {'username': $scope.username},
                    file: file
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
                });
            }
        }
    };
    
    })
    .controller('ShowPetitionController', function ($scope, PetitionService, petition) {
          
        $scope.rate = rate;
        _.forEach($scope.rate.items, function(item, index) {
            $scope.rate.items[index] = angular.fromJson(item);                   
        });

        $scope.save = function() {
            PetitionService.post(rate).then(
                function (value, responseHeaders) {
                    $scope.success = 'OK';
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );
        }
    });
