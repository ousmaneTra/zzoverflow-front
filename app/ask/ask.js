'use strict';

angular.module('myApp.ask', ['ngRoute','myApp.services'])


.controller('askCtrl', ['apiUrl','authenticationService','$http','$location','$scope',function(apiUrl,authenticationService,$http,$location,$scope) {
 console.log('askCtrl') ;
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