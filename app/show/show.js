'use strict';

angular.module('myApp.show', ['ngRoute','myApp.services'])

.controller('showCtrl', ['apiUrl', 'questionService', 'authenticationService', 'handleStatusService', '$routeParams','$http','$location','$scope',function(apiUrl, questionService, authenticationService, handleStatusService, $routeParams, $http,$location,$scope) {
    
    console.log('showCtrl') ;
    $scope.question = {};
    $scope.user = {} ;

    var id = $routeParams.questionId ; 
    console.log(id)

    questionService.getQuestion(id).then(function successCallback(response) {
        $scope.question = response.data ;
        console.log($scope.question)
    }, function errorCallback(response) {
        handleStatusService.handle(response.status,'/') ;
    }) ;

}])
.controller('replyCtrl', ['currentUser','apiUrl', 'questionService', 'authenticationService', 'handleStatusService', '$routeParams','$http','$location','$route','$scope',function(currentUser, apiUrl, questionService, authenticationService, handleStatusService, $routeParams, $http,$location,$route,$scope) {

    $scope.reply = {} ;

    $scope.user = {};

    // Submit the form
    $scope.replyClick = function(){

            if(!authenticationService.isAuthenticated){
                authenticationService.authenticate('/question/'+$scope.question.id) ;
                return ;
            }
            //From here, a user is authenticated (or token invalid)
            $http({method: 'GET', url: apiUrl+'/user'}).then(function successCallback(response) {
                currentUser = response.data ;
                $scope.reply.user     = currentUser.id
                $scope.reply.question = $scope.question.id;
                createAnswer()
            }, function errorCallback(response) {
                console.log('Error GET /api/user') ;
                if(response.status == 401){
                    //token invalid
                    authenticationService.authenticate('/question/'+$scope.question.id) ;
                }
            });

    }

    function createAnswer(){
        $http({method: 'POST', url: apiUrl+'/answer/add',data: $scope.reply})
            .then(function successCallback(response) {
                var data = response.data ;
                if(data != null ){
                   $route.reload()
                }
            }, function errorCallback(response) {
                console.log('Error') ;
        });
    }

}]);;
