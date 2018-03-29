/* global angular HotelsController*/  //this is client side js aka front end

angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    var vm = this; //vm shorthand for view model
    vm.title = 'MEAN Hotel App';
    hotelDataFactory.hotelList().then(function(response) {
        // console.log(response); // in the reponse we want the data portion
        vm.hotels = response.data;
        
    })
}