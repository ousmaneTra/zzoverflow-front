'use strict';
var apiUrl = 'http://localhost:8080' ;

angular.module('myApp.authentication', ['ngRoute','ngCookies'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'authentication/login.html',
    controller: 'authenticationCtrl'
  });
}])

.controller('authenticationCtrl', ['$scope','$http','authenticationService','$routeParams','$location','$cookies',function($scope,$http,authenticationService,$routeParams,$location,$cookies) {
  $scope.user = {} ;
  $scope.message = '' ;
  console.log('authenticationCtrl');
  $scope.loginButtonClick = function(){
    $http({method: 'POST', url: apiUrl+'/api/login',data: $scope.user}).then(function successCallback(response) {
      var data = response.data ;
      var redirect_url = $routeParams.redirect_url ;
      var auth = data.token_type+' '+data.access_token ;
      authenticationService.setAuthorizationHeader(auth) ;
      $cookies.put('auth',auth) ;
      
      $location.search({}) ; // remove path params
      if(redirect_url){
        
        $location.path(redirect_url) ;
      }
      else{
        $location.path('/') ;
      }
  }, function errorCallback(response) {
      console.log('Error') ;
  });
  }
}])

.factory('authenticationService', function($location,$http) {
  return {
        isAuthenticated : false,
        setAuthorizationHeader: function(value){
            this.isAuthenticated = true ;
            $http.defaults.headers.common.Authorization = value ;
        },
        authenticate: function(redirectUrl) {
            if(!this.isAuthenticated) {
              $location.path('/login').search({redirect_url:redirectUrl}) ;
            }
        }
    };
}) ;