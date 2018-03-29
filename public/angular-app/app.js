/* global angular HotelsController HotelController*/ 

angular.module('meanhotel', ['ngRoute']).config(config)

function config($routeProvider) {
    $routeProvider
    .when('/', { //when someone goes to the route
        templateUrl: 'angular-app/hotel-list/hotels.html', //load our hotels.html
        controller: HotelsController, //controlled by HotelsController
        controllerAs: 'vm' //controllerAs syntax
    })
    .when('/hotel/:id', {
        templateUrl: 'angular-app/hotel-display/hotel.html',
        controller: HotelController,
        controllerAs: 'vm'
    });
}
