'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngCookies',
  'myApp.version',
  'myApp.services',
  'myApp.profile',
  'myApp.authentication',
  'myApp.questions'
]).
config(['$locationProvider', '$routeProvider','$httpProvider', function($locationProvider, $routeProvider,$httpProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/'});

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

