'use strict';

angular.module('myApp.profile', ['ngRoute','myApp.services'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['apiUrl','authenticationService','$http','$location','$scope',function(apiUrl,authenticationService,$http,$location,$scope) {
 console.log('ProfileCtrl') ;
 $scope.user = {} ;
 if(!authenticationService.isAuthenticated){
   authenticationService.authenticate('/profile') ;
   return ;
 }
  //From here, a user is authenticated (or token invalid)
  $http({method: 'GET', url: apiUrl+'/user'}).then(function successCallback(response) {
      $scope.user = response.data ;
  }, function errorCallback(response) {
    console.log('Error GET /api/user') ;
      if(response.status == 401){
        //token invalid
        authenticationService.authenticate('/profile') ;
      }
  });
}]);