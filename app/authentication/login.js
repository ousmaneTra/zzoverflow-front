'use strict';
var apiUrl = 'http://localhost:8080' ;

angular.module('myApp.authentication', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'authentication/login.html',
    controller: 'authenticationCtrl'
  });
}])

.controller('authenticationCtrl', ['$scope','$http','authenticationService','$routeParams','$location',function($scope,$http,authenticationService,$routeParams,$location) {
  $scope.user = {} ;
  $scope.message = '' ;
  console.log('authenticationCtrl');
  $scope.loginButtonClick = function(){
    $http({method: 'POST', url: apiUrl+'/api/login',data: $scope.user}).then(function successCallback(response) {
      var data = response.data ;
      var redirect_url = $routeParams.redirect_url ;
      authenticationService.isAuthenticated = true ;
      $http.defaults.headers.common.Authorization = data.token_type+' '+data.access_token;
      
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

.factory('authenticationService', function($location) {
  return {
        isAuthenticated : false,
        authenticate: function(redirectUrl) {
            if(!this.isAuthenticated) {
              $location.path('/login').search({redirect_url:redirectUrl}) ;
            }
        }
    };
}) ;