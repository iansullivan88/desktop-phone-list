angular.module('phoneListApp.controllers', [])
.controller('PhoneListCtrl', ['$scope', 'Contact', function($scope, Contact) {
    $scope.contacts = Contact.getContacts();
}])
.controller('ContactCtrl', ['$scope', '$routeParams', '$location', 'Contact', function($scope, $routeParams, $location, Contact) {
    function showList() {
        $location.path('/');
    }
    
    $scope.save = function() {
        Contact.saveContact($scope.contact);
        showList();
    };
    
    $scope.cancel = function() {
        showList();
    };
    
    $scope.delete = function() {
        Contact.deleteContact($scope.contact.id);
        showList();
    };
    
    $scope.onChange = function() {
        $scope.needsSave = true;  
    };
    
    if ($routeParams.contactId) {
        var contact = Contact.getContact($routeParams.contactId);
        if (contact) {
            $scope.contact = contact;
            $scope.canDelete = true;
        } else {
            showList();
        }
    } else {
        $scope.contact = {};
        $scope.onChange();        
    }
}]);