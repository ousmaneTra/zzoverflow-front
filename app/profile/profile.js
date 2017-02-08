'use strict';

angular.module('myApp.profile', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/profile', {
    templateUrl: 'profile/profile.html',
    controller: 'ProfileCtrl'
  });
}])

.controller('ProfileCtrl', ['authenticationService','$location',function(authenticationService,$location) {
 console.log('ProfileCtrl') ;
 authenticationService.authenticate('/profile') ;
}]);