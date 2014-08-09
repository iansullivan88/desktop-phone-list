var app = angular.module('phoneListApp', [
    'ngRoute',
    'phoneListApp.controllers',
    'phoneListApp.services'
]);

app.config(['$routeProvider', '$locationProvider',
    function($routeProvider) {
        $routeProvider.
        when('/contact/:contactId?', {
            templateUrl: 'partials/contact.html',
            controller: 'ContactCtrl'
        }).
        otherwise({
            templateUrl: 'partials/contact-list.html',
            controller: 'PhoneListCtrl'
        });
    }
]);