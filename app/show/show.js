'use strict';

angular.module('myApp.show', ['ngRoute','myApp.services'])

.controller('showCtrl', ['$rootScope','apiUrl', 'questionService', 'authenticationService', 'handleStatusService', '$routeParams','$http','$location','$scope',function($rootScope, apiUrl, questionService, authenticationService, handleStatusService, $routeParams, $http,$location,$scope) {
    
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


    $scope.upVote = function(state, type, id){

        if(!authenticationService.isAuthenticated){
            authenticationService.authenticate('/question/'+$scope.question.id) ;
            return ;
        }
        //From here, a user is authenticated (or token invalid)
        $http({method: 'GET', url: apiUrl+'/user'}).then(function successCallback(response) {
            $rootScope.currentUser = response.data ;
            console.log(response.data)
            func()
        }, function errorCallback(response) {
            console.log('Error GET /api/user') ;
            if(response.status == 401){
                //token invalid
                authenticationService.authenticate('/question/'+$scope.question.id) ;
            }
        });

        var func = function(){
            $http({ 
                method: 'POST', 
                url: apiUrl+'/vote/save',
                data: {
                    'post' : id,
                    'user' : $rootScope.currentUser.id,
                    'vote'    : state == 'up' ? '1' : '-1'
                }
            })
            .then(function successCallback(response) {
                if(type == 'qst')
                    if(state == 'up')
                        $scope.question.upvote = response.data
                    else
                        $scope.question.downvote = response.data
                else if(type == 'ans')
                    if(state == 'up')
                        $scope.question.answers[id]
                    else
                        $scope.question.downvote = response.data
            }, function errorCallback(response) {
                console.log('Error') ;
        })};
        
    }

    $scope.downVote = function(){
        
    }

}])
.controller('replyCtrl', ['$rootScope','apiUrl', 'questionService', 'authenticationService', 'handleStatusService', '$routeParams','$http','$location','$route','$scope',function($rootScope, apiUrl, questionService, authenticationService, handleStatusService, $routeParams, $http,$location,$route,$scope) {

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
                $rootScope.currentUser = response.data ;
                $scope.reply.user     = $rootScope.currentUser.id
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
