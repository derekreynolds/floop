'use strict';

angular.module('floopApp')
    .controller('CreatePetitionController', function ($scope, $translate, $timeout, $filter, $state, $sce, DateTimeService, DateUtilService, PetitionTemplateService) {
        
        if(_.isUndefined($scope.petition)) {
            $scope.petition = {
                'option' : {
                    'private':false,
                    'anonymous': false,
                    'resultViewable':true,
                    'location': {
                        'selected': false,
                        'geo': {
                            'center' : {
                                'latitude': 0,
                                'longitude': 0
                            },
                            'accuracy': 0,
                            'zoom': 0,
                            'distance': 0 
                        }
                    },
                    'socialize': {
                        'selected': true,
                        'message': ''
                    }
                }, 
                'timeBox' : {
                    
                },
                'items': []
            };

            DateUtilService.setMinMaxDates($scope);

            $scope.petition.timeBox.startDate = moment($scope.now).format($scope.format);

            $scope.petition.timeBox.endDate = moment($scope.now).add(1,'w').format($scope.format);

            $scope.petition.timeBox.startTime = new Date();
            $scope.petition.timeBox.endTime = new Date();

            $translate(['petition.form.buttonText.options.sign', 'petition.form.buttonText.options.count', 
                'petition.form.buttonText.options.like']).then(function (options) {
                var sign = options['petition.form.buttonText.options.sign'];
                var count = options['petition.form.buttonText.options.count'];
                var like = options['petition.form.buttonText.options.like'];                
                $scope.buttonText = [];
                $scope.buttonText.push({id: 'petition.form.buttonText.options.sign', text: sign});
                $scope.buttonText.push({id: 'petition.form.buttonText.options.count', text: count});
                $scope.buttonText.push({id: 'petition.form.buttonText.options.like', text: like});

            });

            $state.go('.detail');
        }       

   
        $timeout(function (){angular.element('[ng-model="petition.title"]').focus();});

        $scope.ismeridian = false; 
        $scope.hstep = 1;
        $scope.mstep = 10;

        $scope.create = function() {
            debugger
            var petition = _.clone($scope.petition);
            delete petition['timeBox'];
            delete petition['buttonText'];
            petition['buttonText'] = $scope.petition['buttonText'].id;

            petition.startDate = DateTimeService.toDateTimeUTC($scope.petition.timeBox.startDate, 
                                    DateTimeService.formatTime($scope.petition.timeBox.startTime));
            petition.endDate = DateTimeService.toDateTimeUTC($scope.petition.timeBox.endDate, 
                                    DateTimeService.formatTime($scope.petition.timeBox.endTime));

            PetitionTemplateService.post(petition).then(
                function (value, responseHeaders) {
                    $state.go('home');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );

        };
    })
    .controller('ShowPetitionController', function ($state, $scope, PetitionTemplateService, petition) {
          
        $scope.petition = petition;

        $scope.save = function() {            
            PetitionTemplateService.put().then(
                function (value, responseHeaders) {
                    $state.go('petition');
                },
                function (httpResponse) {                                               
                    $scope.$emit('event:resource.error', {text:'Unknown error', title:'Error'});                   
                }
            );
        }
    })
    .controller('ListPetitionController', function ($scope, petitions) { 
        $scope.petitions = petitions;
    });
