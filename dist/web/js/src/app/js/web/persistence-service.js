angular.module('phoneListApp.services').factory('Persistence', [function () {
    return {
        set: function(key, string) {
            window.localStorage.setItem(key, string);
        },
        get: function(key) {
            return window.localStorage.getItem(key);
        }
    };
}]);