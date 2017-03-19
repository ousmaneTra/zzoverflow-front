'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.version',
  'myApp.services',
  'myApp.profile',
  'myApp.ask',
  'myApp.authentication',
  'myApp.questions'
]).
config(['$locationProvider', '$routeProvider','$httpProvider', function($locationProvider, $routeProvider,$httpProvider) {
  
  $locationProvider.hashPrefix('!');

  // Routing 
  $routeProvider.when('/', {
    templateUrl: 'questions/questions.html',
    controller: 'questionsCtrl'
  });

  $routeProvider.when('/login', {
    templateUrl: 'authentication/login.html',
    controller: 'authenticationCtrl'
  });

  $routeProvider.when('/ask', {
    templateUrl: 'ask/ask.html',
    controller: 'askCtrl'
  });

  $httpProvider.defaults.headers.common['Accept'] = 'application/json, text/javascript;charset=UTF-8';

}])
.constant('apiUrl','http://localhost:8080/api')
.run(function(authenticationService,$cookies){
  var auth = $cookies.get("auth") ;
  if(auth){
    authenticationService.setAuthorizationHeader(auth) ;
  }
  else
  {
    //Do nothing !!!
  }
}) ;

myApp.controller('sideBarController', ['$scope','metaQuestionService', function($scope, metaQuestionService) {

    metaQuestionService.getMeta().then(function successCallback(response) {
       $scope.meta = response.data ;
        console.log($scope.meta.comments[1])
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;
}]);