'use strict';

var  app_question = angular.module('myApp.questions', ['ngRoute','myApp.services']);

app_question.controller('questionsCtrl', ['questionService','metaQuestionService','handleStatusService','$scope','$http',function(questionService, metaQuestionService, handleStatusService,$scope,$http) {
  $scope.questions = [] ;
  console.log('questionsCtrl') ;

  questionService.getAll(10).then(function successCallback(response) {
      console.log("--")
        $scope.questions = response.data ;
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;

   metaQuestionService.getMeta().then(function successCallback(response) {
       console.log("--")
        $scope.meta = response.data ;
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;

}]);
/*
app_question.controller('sideBarController', ['questionService','metaQuestionService','handleStatusService','$scope','$http',function(questionService, metaQuestionService, handleStatusService,$scope,$http) {
    console.log("cc")
    metaQuestionService.getMeta().then(function successCallback(response) {
        $scope.meta = response.data ;
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;
}]);*/