'use strict';

angular.module('myApp.questions', ['ngRoute','myApp.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'questions/questions.html',
    controller: 'questionsCtrl'
  });
}])

.controller('questionsCtrl', ['questionService','handleStatusService','$scope','$http',function(questionService,handleStatusService,$scope,$http) {
  $scope.questions = [] ;
  console.log('questionsCtrl') ;

  questionService.getAll(10).then(function successCallback(response) {
        $scope.questions = response.data ;
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;

}]);