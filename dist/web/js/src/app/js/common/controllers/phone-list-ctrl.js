angular.module('phoneListApp.controllers').controller('PhoneListCtrl', ['$scope', 'Contact', function($scope, Contact) {
    Contact.getContacts(function(contacts) {
        $scope.contacts = contacts;
    });
    
    
}]);