'use strict';

angular.module('myApp.ask', ['ngRoute','myApp.services']).directive('importscripts', importscripts)


.controller('askCtrl', ['apiUrl','authenticationService','$http','$location','$scope',function(apiUrl,authenticationService,$http,$location,$scope) {
 console.log('askCtrl') ;
 $scope.user = {} ;
 if(!authenticationService.isAuthenticated){
   authenticationService.authenticate('/ask') ;
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

    // Form data
    $scope.post = {} ;

    // Submit the form
    $scope.submitClick = function(){
        
        $scope.post.user = $scope.user.id 
        console.log($scope.post)

        $http({method: 'POST', url: apiUrl+'/question/add',data: $scope.post})
        .then(function successCallback(response) {
            var data = response.data ;
            console.log(data)
            if(data != null ){
                console.log("/question/"+data.id);
                $location.path('/question').search({id:data.id}) ;
            }
        }, function errorCallback(response) {
            console.log('Error') ;
        });
    }
  
}]);


function importscripts() {
    var injectScript = function(element) {
        var scriptTag = angular.element(document.createElement('script'));
        scriptTag.attr('charset', 'utf-8');
        scriptTag.attr('src', '../assets/scripts/jquery-2.2.0.min.js');
        scriptTag.attr('src', '../assets/scripts/jquery-ui.min.js');
        scriptTag.attr('src', '../assets/scripts/tag-it.js');
        element.append(scriptTag);
    };

    return {
        link: function(scope, element) {
            injectScript(element);
        }
    };
}
