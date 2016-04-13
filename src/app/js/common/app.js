var app = angular.module('phoneListApp', [
    'ngRoute',
    'phoneListApp.controllers',
    'phoneListApp.services'
]).config([
    '$compileProvider',
    function( $compileProvider) {   
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension):/);
    }
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