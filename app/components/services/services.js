'use strict';

angular.module('myApp.services', [])
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
})
.factory('handleStatusService', function($location) {
   var service = {} ;
   service.handle = function(status,redirectUrl){
     console.log('handleStatusService : handling '+ status + '...');
     switch(status){
       case 401 :
              //Not authenticated, redirect to login page
              $location.path('/login').search({redirect_url:redirectUrl}) ; break;
       default : break;
     }
   }
   return service ;
})
.factory('questionService', function(apiUrl,$http) {
   return { 
      getAll : function(max){
        if(max===undefined){
            max = 100 ;
        }
        return $http({method: 'GET', url: apiUrl+'/questions?max='+max}) ; 
      },
      getQuestion  : function(index){

        return $http({method: 'GET', url: apiUrl+'/question/get?id='+index});
      }
   };
})

.factory('metaQuestionService', function(apiUrl,$http) {
   var service = {} ;
   service.getMeta = function(max){
     if(max===undefined){
        max = 100 ;
     }
     return $http({method: 'GET', url: apiUrl+'/metaQuestions?max='+max}) ; 
   }
   return service ;
});