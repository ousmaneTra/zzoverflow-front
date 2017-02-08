'use strict';

angular.module('myApp.questions', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'questions/questions.html',
    controller: 'questionsCtrl'
  });
}])

.controller('questionsCtrl', ['apiUrl','$scope','$http',function(apiUrl,$scope,$http) {
  $scope.questions = [] ;
  console.log('questionsCtrl') ;
  $http({method: 'GET', url: apiUrl+'/questions'}).then(function successCallback(response) {
      $scope.questions = response.data ;
  }, function errorCallback(response) {
      console.log('Error GET /api/questions') ;
  });
}]);