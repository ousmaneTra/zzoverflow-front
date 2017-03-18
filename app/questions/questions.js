'use strict';

angular.module('myApp.questions', ['ngRoute','myApp.services'])

.controller('questionsCtrl', ['questionService','handleStatusService','$scope','$http',function(questionService,handleStatusService,$scope,$http) {
  $scope.questions = [] ;
  console.log('questionsCtrl') ;

  questionService.getAll(10).then(function successCallback(response) {
        $scope.questions = response.data ;
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;

}]);