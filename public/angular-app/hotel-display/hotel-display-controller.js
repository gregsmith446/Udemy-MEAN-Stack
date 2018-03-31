/* global angular HotelController $route */ 

angular.module('meanhotel').controller('HotelController', HotelController);


function HotelController($http, $routeParams, $window, hotelDataFactory, AuthFactory, jwtHelper) {
    var vm = this;
    var id = $routeParams.id;
    hotelDataFactory.hotelDisplay(id).then(function(response) {
        vm.hotel = response.data
        vm.stars = _getStarRating(response.data.stars);
    }); 
    
    function _getStarRating(stars) {
        return new Array(stars);
    }
    
    vm.isLoggedIn = function() {
        if (AuthFactory.isloggedIn) {
            return true;
        } else {
            return false;
        }
    };

    vm.addReview = function() {
        //part of removing the empty name box for logged in users.Reviews now post with the 
        //name of the logged in user.
        var token = jwtHelper.decodeToken($window.sessionStorage.token);
        var username = token.username;
        
        var postData = {
        name: vm.name,
        rating: vm.rating,
        review: vm.review
        };
        if (vm.reviewForm.$valid) {
            hotelDataFactory.postReview(id, postData).then(function(response) {
            if (response.status === 200) {
            $route.reload();
            }
        }).catch(function(error) {
            console.log(error);
        });
        } else {
            vm.isSubmitted = true;
        }
    };
}