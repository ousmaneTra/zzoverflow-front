'use strict';

angular.module('myApp.show', ['ngRoute','myApp.services'])

.controller('showCtrl', ['apiUrl', 'questionService', 'authenticationService', 'handleStatusService', '$routeParams','$http','$location','$scope',function(apiUrl, questionService, authenticationService, handleStatusService, $routeParams, $http,$location,$scope) {
    
    console.log('showCtrl') ;
    $scope.question = {};
    $scope.user = {} ;

    var id = $routeParams.id ; 
    console.log(id)

    questionService.getQuestion(id).then(function successCallback(response) {
        $scope.question = response.data ;
        console.log($scope.question)
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;
  
}]);
