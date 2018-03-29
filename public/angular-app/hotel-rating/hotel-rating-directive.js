/* global angular hotelRating HotelController */ 

angular.module('meanhotel').directive('hotelRating', hotelRating);
// in HTML, for every capital letter, lowercase the letter & add hyphen  
// hotelRating --> <hotel-rating>

function hotelRating() {
    return {
        restrict: 'E', //restrict to elements
        template: '<span ng-repeat="star in vm.stars track by $index" class="glyphicon glyphicon-star"> {{ star }} </span>',
        bindToController: true,
        controller: HotelController,
        controllerAs: 'vm',
        scope: {
            stars: '@'
        }
    }
}

//this file is a custom directive for making stars